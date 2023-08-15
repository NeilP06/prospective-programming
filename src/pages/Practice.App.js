import { ClerkProvider, SignedIn, useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../elements/Footer.element";
import NavigationBar from "../elements/NavigationBar.element";
import PracticeProblem from "../layouts/PracticeProblem.button.js";
import React, { useEffect, useState } from "react";
import Redirect from "../elements/Redirect.element.js";
import Warning from "../elements/Warning.element";
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("An error occured in relation to Clerk: no key found.");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function PracticeApp() {
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
    // initializes variables to determine if a completed section is needed later:       **********
    // const [ hasCompleted, setHasCompleted ] = useState("");                          **********
    // initializes variables used to fetch raw database data:
    const [ fetchData, setFetchData] = useState("");
    // initializes variables used to fetch raw completed practice data:
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
            const { data, error } = await supabase.from("users").select("java_p_one").eq("userId", userId);
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
                        result.push(item["java_p_one"]);
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
    // fetches practice data from database and converts it to components:
    useEffect(() => {
        // variable is used to avoid state updates on unmounted components:
        let isSubscribed = true;
        // variable is used to create rows to organize practice modules:
        let practiceRows = [];
        // fetches practice from the database:
        const fetchPracticeContent = async () => {
            let fetchedPracticeContent = [];
            const { data, error } = await supabase.from("java-practice").select().order("id", { ascending: false });
            // throws an error in case if the data is corrupted or missing:
            if (error || data === null) {
                throw new Error("An error occurred in relation to Supabase fetch: Java practice problem data is not loading.");
            }
            // fetches data from a for loop:
            console.log(javaData);
            for (let i = 0; i < data.length; i++) {
                if (javaData[i] === "Not Started" || javaData[i] === "In Progress") {
                    // fetches id from data:
                    const id = parseInt(data[i].id - 1);
                    // saves data to temporary variable:
                    console.log(javaData[i] + " " + i);

                    const practiceComponent = (
                        <Link key={data[id].practiceId} to={data[id].link}>
                            <PracticeProblem practiceId={data[id].practiceId} practiceName={data[id].name} prerequisite={data[id].prerequisite} status={javaData[i]}/>
                        </Link>
                    );
                    // appends variable into the array/row:
                    practiceRows.push(practiceComponent);
                    // checks if window's width is 1200px to ensure no margin issues:
                    if (window.innerWidth > 1200) {
                        // every three practice problems is a row, otherwise a new row is created:
                        if (practiceRows.length % 3 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${practiceRows.length}`} className="mt-10 flex flex-row">
                                    {practiceRows}
                                </div>
                            );
                            // clears row to be re-used:
                            practiceRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedPracticeContent.push(row);
                        }
                    } else {
                        // if <1200px, only two practice problems will be in a row:
                        if (practiceRows.length % 2 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${practiceRows.length}`} className="mt-10 flex flex-row">
                                    {practiceRows}
                                </div>
                            );
                            // clears row to be re-used:
                            practiceRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedPracticeContent.push(row);    
                        }                    
                    }
                }
            }
            // appends any remaining practice problems that did not fill a complete row:
            if (practiceRows.length > 0) {
                // saves data as a temporary variable:
                const row = (
                    <div key={`row-${practiceRows.length}`} className="mt-10 flex flex-row">
                        {practiceRows}
                    </div>
                );
                // pushes the temporary variable:
                fetchedPracticeContent.push(row);
            }
            // updates state only if the component is mounted:
            if (isSubscribed) {
                setFetchData(fetchedPracticeContent);
            }
        };
        // fetches practice only if the state is mounted:
        if (isMounted) {
            fetchPracticeContent();
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
    // fetches completed practice data and converts it into components:
    useEffect(() => {
        // variable is used to avoid state updates on unmounted components:
        let isSubscribed = true;
        // variable is used to create rows to organize practice modules:
        let practiceRows = [];
        // fetches practice from the database:
        const fetchPracticeContent = async () => {
            let fetchedPracticeContent = [];
            const { data, error } = await supabase.from("java-practice").select().order("id", { ascending: false });
            // throws an error in case if the data is corrupted or missing:
            if (error || data === null) {
                throw new Error("An error occurred in relation to Supabase fetch: Java practice problems data is not loading.");
            }
            // fetches data from a for loop:
            for (let i = 0; i < data.length; i++) {
                if (javaData[i] === "Completed") {
                    // fetches id from data:
                    const id = parseInt(data[i].id - 1);
                    // saves data to temporary variable:
                    const practiceComponent = (
                        <Link key={data[id].practiceId} to={data[id].link}>
                            <PracticeProblem practiceId={data[id].practiceId} practiceName={data[id].name} prerequisite={data[id].prerequisite} status={javaData[i]}/>
                        </Link>
                    );
                    // appends variable into the array/row:
                    practiceRows.push(practiceComponent);
                    // checks if window's width is 1200px to ensure no margin issues:
                    if (window.innerWidth > 1200) {
                        // every three practice problems is a row, otherwise a new row is created:
                        if (practiceRows.length % 3 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${practiceRows.length}`} className="mt-10 flex flex-row">
                                    {practiceRows}
                                </div>
                            );
                            // clears row to be re-used:
                            practiceRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedPracticeContent.push(row);
                        }
                    } else {
                        // if <1200px, only two practice problems will be in a row:
                        if (practiceRows.length % 2 === 0) {
                            // saves row as a temporary variable:
                            const row = (
                                <div key={`row-${practiceRows.length}`} className="mt-10 flex flex-row">
                                    {practiceRows}
                                </div>
                            );
                            // clears row to be re-used:
                            practiceRows = [];
                            // pushes the variable into the main 2D-array:
                            fetchedPracticeContent.push(row);    
                        }                    
                    }
                }
            }
            // appends any remaining practice problems that did not fill a complete row:
            if (practiceRows.length > 0) {
                // saves data as a temporary variable:
                const row = (
                    <div key={`row-${practiceRows.length}`} className="mt-10 flex flex-row">
                        {practiceRows}
                    </div>
                );
                // pushes the temporary variable:
                fetchedPracticeContent.push(row);
            }
            // updates state only if the component is mounted:
            if (isSubscribed) {
                setCompletedData(fetchedPracticeContent);
            }
        };
        // fetches practice only if the state is mounted:
        if (isCompletedMounted) {
            fetchPracticeContent();
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
                <p className="mt-20 ml-20 font-semibold text-3xl lg:text-4xl text-black dark:text-white">🖥️ Uncompleted Practice Problems</p>
                <div class="ml-20 flex flex-col">
                    {fetchData}
                </div>
                <p className="mt-24 ml-20 font-semibold text-3xl lg:text-4xl text-black dark:text-white">🖥️ Completed Practice Problems</p>
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