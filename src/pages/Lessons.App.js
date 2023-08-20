import { ClerkProvider, SignedIn, useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../elements/Footer.element";
import Lesson from "../layouts/Lesson.button.js";
import NavigationBar from "../elements/NavigationBar.element";
import React, { useEffect, useState } from "react";
import Redirect from "../elements/Redirect.element.js";
import Warning from "../elements/Warning.element";
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("An error occured in relation to Clerk: no key found.");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function LessonsApp() {
    document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
    return (
        <ClerkProvider publishableKey={key}>
            <Content/>
        </ClerkProvider>
    );
}

function Content() {
    const { user } = useUser();   
    const navigate = useNavigate();
    // initializes variables to determine if a completed section is needed later:
    // const [ hasCompleted, setHasCompleted ] = useState("");                          **********
    // initializes variables used to fetch raw database data:
    const [ fetchData, setFetchData] = useState("");
    // initializes variables used to fetch raw completed lessons data:
    const [ fetchCompletedData, setCompletedData ] = useState("");
    // initializes variables used to track the mounted state of data fetching:
    const [isMounted, setIsMounted] = useState(false);
    // initializes variables used to track the mounted state of completed data fetching:
    const [ isCompletedMounted, setIsCompletedMounted ] = useState(false);
    // initializes variables used to fetch formatted progress data:
    const [ javaData, setJavaData ] = useState([]);
    // redirects elgible users to the login page if they are not logged in:
    useEffect(() => {
        // checks if the user has been redirected before by using local storage:
        const hasBeenRedirected = sessionStorage.getItem("hasBeenRedirected");
        if ((!user && window.innerWidth > 800 && !hasBeenRedirected) || (!user && window.innerWidth > 800)) {
            // sets the flag to indicate redirection in local storage:
            sessionStorage.setItem("hasBeenRedirected", "true");
            navigate("/login");
        }
    }, [user, navigate]);
    // resets the session storage on unmounted state:
    useEffect(() => {
        return () => {
            sessionStorage.removeItem("hasBeenRedirected");
        }
    }, []);
    // fetches progress from the database:
    useEffect(() => {
        /** 
         * @param {*} userId 
         * @returns data
         * --> fetches unformatted data from the database.
         */
        async function fetchData(userId) {
            const { data, error } = await supabase.from("users").select("java_one, java_two, java_three, java_four, java_five, java_six, java_seven").eq("userId", userId);
            // checks if data is null before returning it:
            if (error) {
                throw new Error("An error occurred in relation to Supabase fetch: Java data is not loading.");
            }
            return data;
        }
        // combines unformmated data into an array:
        if (user) {
            fetchData(user.id).then((data) => {
                if (data && data.length > 0) {
                    // TODO: make this dynamic...
                    const combinedData = data.reduce((result, item) => {
                        result.push(item["java_one"], item["java_two"], item["java_three"], item["java_four"], item["java_five"], item["java_six"], item["java_seven"]);
                        return result;
                    }, []);
                    setJavaData(combinedData);
                } else {
                    // handles the case where no data is found for the user:
                    setJavaData([]);
                }
            });
        }
    }, [user]);
    // fetches lessons data from database and converts it to components:
    useEffect(() => {
        // variable is used to avoid state updates on unmounted components:
        let isSubscribed = true;
        // variable is used to create rows to organize lesson modules:
        let lessonRows = [];
        // fetches lessons from the database:
        const fetchLessons = async () => {
            let fetchedLessons = [];
            const { data, error } = await supabase.from("java-lessons").select().order("id", { ascending: false });
            // throws an error in case if the data is corrupted or missing:
            if (error || data === null) {
                throw new Error("An error occurred in relation to Supabase fetch: Java lessons data is not loading.");
            }
            // fetches data from a for loop:
            console.log(javaData);
            for (let i = 0; i < data.length; i++) {
                if (javaData[i] === "Not Started" || javaData[i] === "In Progress") {
                    // fetches id from data:
                    const id = parseInt(data[i].id - 1);
                    // saves data to temporary variable:
                    console.log(javaData[i] + " " + i);

                    const lessonComponent = (
                        <Link key={data[id].lessonId} to={data[id].link}>
                            <Lesson lessonId={data[id].lessonId} lessonName={data[id].name} shortDescription={data[id].shortDescription} status={javaData[i]}/>
                        </Link>
                    );
                    // appends variable into the array/row:
                    lessonRows.push(lessonComponent);
                    // checks if window's width is 1200px to ensure no margin issues:
                    if (window.innerWidth > 1200) {
                        // every three lessons is a row, otherwise a new row is created:
                        if (lessonRows.length % 3 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${lessonRows.length}`} className="mt-10 flex flex-row">
                                    {lessonRows}
                                </div>
                            );
                            // clears row to be re-used:
                            lessonRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedLessons.push(row);
                        }
                    } else {
                        // if <1200px, only two lessons will be in a row:
                        if (lessonRows.length % 2 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${lessonRows.length}`} className="mt-10 flex flex-row">
                                    {lessonRows}
                                </div>
                            );
                            // clears row to be re-used:
                            lessonRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedLessons.push(row);    
                        }                    
                    }
                }
            }
            // appends any remaining lessons that did not fill a complete row:
            if (lessonRows.length > 0) {
                // saves data as a temporary variable:
                const row = (
                    <div key={`row-${lessonRows.length}`} className="mt-10 flex flex-row">
                        {lessonRows}
                    </div>
                );
                // pushes the temporary variable:
                fetchedLessons.push(row);
            }
            // updates state only if the component is mounted:
            if (isSubscribed) {
                setFetchData(fetchedLessons);
            }
        };
        // fetches lessons only if the state is mounted:
        if (isMounted) {
            fetchLessons();
        }
        // cleanup function to handle unmounting:
        return () => {
            // unscribes to avoid state updates after unmounting:
            isSubscribed = false;
        };
    }, [javaData, isMounted]);
    // sets `isMounted` to true on component mount:
    useEffect(() => {
      setIsMounted(true);
      return () => {
        // sets `isMounted` to false on component unmount:
        setIsMounted(false);
      };
    }, []);    
    // fetches completed lessons data and converts it into components:
    useEffect(() => {
        // variable is used to avoid state updates on unmounted components:
        let isSubscribed = true;
        // variable is used to create rows to organize lesson modules:
        let lessonRows = [];
        // fetches lessons from the database:
        const fetchLessons = async () => {
            let fetchedLessons = [];
            const { data, error } = await supabase.from("java-lessons").select().order("id", { ascending: false });
            // throws an error in case if the data is corrupted or missing:
            if (error || data === null) {
                throw new Error("An error occurred in relation to Supabase fetch: Java lessons data is not loading.");
            }
            // fetches data from a for loop:
            for (let i = 0; i < data.length; i++) {
                if (javaData[i] === "Completed") {
                    // fetches id from data:
                    const id = parseInt(data[i].id - 1);
                    // saves data to temporary variable:
                    const lessonComponent = (
                        <Link key={data[id].lessonId} to={data[id].link}>
                            <Lesson lessonId={data[id].lessonId} lessonName={data[id].name} shortDescription={data[id].shortDescription} status={javaData[i]}/>
                        </Link>
                    );
                    // appends variable into the array/row:
                    lessonRows.push(lessonComponent);
                    // checks if window's width is 1200px to ensure no margin issues:
                    if (window.innerWidth > 1200) {
                        // every three lessons is a row, otherwise a new row is created:
                        if (lessonRows.length % 3 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${lessonRows.length}`} className="mt-10 flex flex-row">
                                    {lessonRows}
                                </div>
                            );
                            // clears row to be re-used:
                            lessonRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedLessons.push(row);
                        }
                    } else {
                        // if <1200px, only two lessons will be in a row:
                        if (lessonRows.length % 2 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${lessonRows.length}`} className="mt-10 flex flex-row">
                                    {lessonRows}
                                </div>
                            );
                            // clears row to be re-used:
                            lessonRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedLessons.push(row);    
                        }                    
                    }
                }
            }
            // appends any remaining lessons that did not fill a complete row:
            if (lessonRows.length > 0) {
                // saves data as a temporary variable:
                const row = (
                    <div key={`row-${lessonRows.length}`} className="mt-10 flex flex-row">
                        {lessonRows}
                    </div>
                );
                // pushes the temporary variable:
                fetchedLessons.push(row);
            }
            // updates state only if the component is mounted:
            if (isSubscribed) {
                setCompletedData(fetchedLessons);
            }
        };
        // fetches lessons only if the state is mounted:
        if (isCompletedMounted) {
            fetchLessons();
        }
        // cleanup function to handle unmounting:
        return () => {
            // unscribes to avoid state updates after unmounting:
            isSubscribed = false;
        };
    }, [javaData, isCompletedMounted]);
    // sets `isCompletedMounted` to true on component mount:
    useEffect(() => {
        setIsCompletedMounted(true);
        return () => {
          // sets `isCompletedMounted` to false on component unmount:
          setIsCompletedMounted(false);
        };
    }, []); 
    // temporarily returns a indication element when user data is loading:
    if (user && (fetchData.length + fetchCompletedData.length) <= 0) {
        return <p className="mt-5 ml-5 font-semibold text-black dark:text-white">User progress is loading...</p>;
    }
    if (user && window.innerWidth > 800) {
        return (
            <SignedIn>
                <NavigationBar/>
                <p className="mt-20 ml-20 font-semibold text-3xl lg:text-4xl text-black dark:text-white">📝 Uncompleted Lessons</p>
                <div class="ml-20 flex flex-col">
                    {fetchData}
                </div>
                <p className="mt-24 ml-20 font-semibold text-3xl lg:text-4xl text-black dark:text-white">📝 Completed Lessons</p>
                <div class="ml-20 flex flex-col">
                    {fetchCompletedData}
                </div>
                <Footer/>
            </SignedIn>
        );
    } else if (window.innerWidth < 800) {
        return (
            // returns a <Warning/> module if the user is on a small-screen device:
            <Warning/>
        );
    } else {
        return (
            // returns a <Redirect/> module if the user is not signed in:
            <Redirect redirection={<Link className="text-blue-600 hover:text-blue-800" to="/login">https://prospectiveprogramming.org/login</Link>}/>
        )
    }
}