import { Analytics } from "@vercel/analytics/react";
import { ArrowUpRight } from "lucide-react";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import Footer from "./elements/Footer.element.js";
import Greetings from "./elements/Greetings.element.js";
import Initialization from "./db/Initialization.db.js";
import LargeButton from "./layouts/LargeButton.button.js";
import Lesson from "./layouts/Lesson.button.js";
import NavigationBar from "./elements/NavigationBar.element.js";
import PracticeProblem from "./layouts/PracticeProblem.button.js";
import Warning from "./elements/Warning.element.js";
import React, { useEffect, useState } from "react";
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error(" no key ");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function App() {
  document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
  if (window.innerWidth > 800) {
    return (
      <ClerkProvider publishableKey={key}>
        <Analytics/>
        <Content/>
      </ClerkProvider>
    );
  } else {
    return (
      <div>
        <Warning/>
      </div>
    );
  }
}

function Content() {
  const { user } = useUser(); 
  const login = <Link to="/login" class="flex justify-center text-blue-600">Log-in<ArrowUpRight class="mr-1 hover:text-blue-800" color="#1B64F1"/></Link>;
  // intializes variables used to fetch raw lessons database data:
  const [ fetchData, setFetchData ] = useState("");
  // initializes variables used to track the mounted state of lessons data fetching:
  const [ isMounted, setIsMounted ] = useState(false);
  // initializes variables used to fetch formatted lessons progress data:
  const [ javaData, setJavaData ] = useState([]);
  // initializes variables used to fetch raw practice problem data:
  const [ fetchPracticeData, setFetchPracticeData ] = useState("");
  // initializes variables used to track the mounted state of practice problem data fetching:
  const [ isPracticeMounted, setIsPracticeMounted ] = useState(false);
  // initializes variables used to fetch formatted practice problem progress data:
  const [ javaPracticeData, setJavaPracticeData ] = useState([]);
  // fetches lessons progress from the database:
  useEffect(() => {
    /**
     * @param {*} userId 
     * @returns data
     * --> fetches unformatted data from the database.
     */
    async function fetchData(userId) {
      const { data, error } = await supabase.from("users").select("java_one, java_two, java_three, java_four, java_five, java_six, java_seven, java_eight, java_nine, java_ten").eq("userId", userId);
      // checks if data is null before returning it:
      if (error) {
        throw new Error("An error occured in relation to Supabase fetch: Java data is not loading in App.js.");
      }
      return data;
    }
    // combines unformatted data into an array:
    if (user) {
      fetchData(user.id).then((data) => {
        if (data && data.length > 0) {
          // REMEMBER TO MAKE THIS DYNAMIC (TO-DO):
          const combinedData = data.reduce((result, item) => {
            result.push(item["java_one"], item["java_two"], item["java_three"], item["java_four"], item["java_five"], item["java_six"], item["java_seven"], item["java_eight"], item["java_nine"], item["java_ten"]);
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
  // fetches lessons data from database and converts it to <Lesson/> components:
  useEffect(() => {
    // variable is used to avoid state updates on unmounted components:
    let isSubscribed = true;
    // variable is used to create rows to organize lesson modules:
    let lessonRows = [];
    // fetches lessons from the database:
    const fetchLessons = async() => {
      let fetchedLessons = [];
      const { data, error } = await supabase.from("java-lessons").select().order("id", { ascending: false});
      // throws an error in case if the data is corrupted or missing:
      if (error || data === null) {
        throw new Error("An error occured in relation to Supabase fetch: Java lessons data is not loading at App.js.");
      }
      // fetches data from a for-loop
      for (let i = 0; i < data.length; i++) {
        // first checks if data isn't completed before rendering:
        if (javaData[i] === "Not Started" || javaData[i] === "In Progress") {
          // fetches id from data:
          const id = parseInt(data[i].id - 1);
          // saves data to a <Lesson/> component:
          const lessonComponent = (
            <Link key={data[id].lessonId} to={data[id].link}>
              <Lesson condition="homepage" lessonId={data[id].lessonId} lessonName={data[id].name} description={data[id].shortDescription} status={javaData[i]}/>    
            </Link>
          );
          // appends variable into the array:
          lessonRows.push(lessonComponent);
          // every four lessons is a row, otherwise a new row is created:
          if (lessonRows.length === 4) {
            // saves row as a temporary variable:
            const row = (
              <div key={`row-${lessonRows.length}`} className="ml-20 m-4 flex flex-row">
                {lessonRows}
              </div>
            );
            // clears row to be re-used:
            lessonRows = [];
            // pushes the variable into the main 2D-array:
            fetchedLessons.push(row);
            // prevents for-loop errors:
            break;
          } else if (i === (data.length - 1)) {
            // saves row as a <div> element:
            const row = (
              <div key={`row-${lessonRows.length}`} className="ml-20 m-4 flex flex-row">
                {lessonRows}
              </div>
            );
            // clears row to ensure no re-renders:
            lessonRows = [];
            // pushes the variable into the main 2D-array:
            fetchedLessons.push(row);
          }
        }
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
      // unsubscribes to avoid state updates after unmounting:
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
  // fetches practice problem data from the database:
  useEffect(() => {
    /**
     * @param {*} userId 
     * @returns data
     * --> fetches unfromatted data from the database.
     */
    async function fetchData(userId) {
      const { data, error } = await supabase.from("users").select("java_p_one, java_p_two, java_p_three, java_p_four, java_p_five, java_p_six, java_p_seven, java_p_eight, java_p_nine").eq("userId", userId);
      // checks if data is null before returning it:
      if (error) {
        throw new Error("An error occured in relation to Supabase fetch: Java data is not loading at App.js");
      }
      return data;
    }
    // combines unformatted data into an array:
    if (user) {
      fetchData(user.id).then((data) => {
        if (data && data.length > 0) {
          // REMEMBER TO MAKE THIS DYNAMIC!
          const combinedData = data.reduce((result, item) => {
            result.push(item["java_p_one"], item["java_p_two"], item["java_p_three"], item["java_p_four"], item["java_p_five"], item["java_p_six"], item["java_p_seven"], item["java_p_eight"], item["java_p_nine"]);
            return result;
          }, []);
          setJavaPracticeData(combinedData);
        } else {
          // handles the case where no data is found for the user:
          setJavaPracticeData([]);
        }
      });
    }
  }, [user]);
  // fetches practice data from the database and converts it into <PracticeProblem/> modules:
  useEffect(() => {
    // variable is used to avoid state updates on unmounted components:
    let isSubscribed = true;
    // variable is used to create rows to organize modules:
    let practiceRows = [];
    // fetches practice from the database:
    const fetchPracticeContent = async() => {
      let fetchedPracticeContent = [];
      const { data, error } = await supabase.from("java-practice").select().order("id", { ascending: false});
      // throws an error in case if the data is corrupted or missing:
      if (error || data === null) {
        throw new Error("An error occured in relation to Supabase fetch: Java practice problem data is not loading at App.js.");
      }
      // fetches data from a for-loop:
      for (let i = 0; i < data.length; i++) {
        if (javaPracticeData[i] === "Not Started" || javaPracticeData[i] === "In Progress") {
          // fetches id from data:
          const id = parseInt(data[i].id - 1);
          // saves data to temporary variable:
          const practiceProblemComponent = (
            <Link key={data[id].practiceId} to={data[id].link}>
              <PracticeProblem condition="homepage" practiceId={data[id].practiceId} problemName={data[id].name} prerequisite={data[id].prerequisite} status={javaPracticeData[i]}/>
            </Link>
          );
          // appends variable into the array:
          practiceRows.push(practiceProblemComponent);
          // only adds the first four modules:
          if (practiceRows.length === 4) {
            // saves row as a temporary variable:
            const row = (
              <div key={`row-${practiceRows.length}`} className="ml-20 m-4 flex flex-row">
                {practiceRows}
              </div>
            );
            // ensures no other modules are re-rendered and added:
            practiceRows = [];
            // pushes the variable into the main 2D-array:
            fetchedPracticeContent.push(row);
            // breaks the for-loop to prevent future errors:
            break;
          } else if (i === (data.length - 1)) {
            // saves row as a temporary variable:
            const row = (
              <div key={`row-${practiceRows.length}`} className="ml-20 m-4 flex flex-row">
                {practiceRows}
              </div>
            );
            // clears row to prevent future errors:
            practiceRows = [];
            // pushes the variable into the main 2D-array:
            fetchedPracticeContent.push(row);
          }
        }
      }
      // updates state only if the component is mounted:
      if (isSubscribed) {
        setFetchPracticeData(fetchedPracticeContent);
      }
    };
    // fetches practice data only if the state is mounted:
    if (isPracticeMounted) {
      fetchPracticeContent();
    }
    // cleanup function to handle unmounting:
    return () => {
      // unsubscribes to avoid state updates after unmounting:
      isSubscribed = false;
    };
  }, [javaPracticeData, isPracticeMounted]);
  // sets `isMounted` to true on component mount:
  useEffect(() => {
    setIsPracticeMounted(true);
    return () => {
      // sets `isMounted` to false on component unmount:
      setIsPracticeMounted(false);
    }
  }, []);
  // placeholder text when the data is being fetched and rendered:
  if (user && (fetchData.length) <= 0) {
    return (
      <div>
        <Initialization/>
        <p className="mt-5 ml-5 font-semibold text-black dark:text-white">User progress is loading...</p>
      </div>
    );
  }
  if (user) {
    return (
      <SignedIn>
        <NavigationBar/>
          <Greetings condition="registered" name={user.firstName}/>
          <div className="mt-24">
            <p className="mt-2 ml-20 font-semibold text-gray-800 dark:text-slate-200">Recommended Lessons for You</p>
            {fetchData}
          </div>
          <div className="mt-20">
            <p className="mt-2 ml-20 font-semibold text-gray-800 dark:text-slate-200">Practice Problems for You</p>
            {fetchPracticeData}
          </div>
        <Footer/>
      </SignedIn>
    );
  } else {
    return (
      <SignedOut>
        <NavigationBar/>
        <Greetings/>
        <p className="mt-4 ml-20 flex text-gray-800 dark:text-slate-200">{login} to get started or continue progress.</p>
        <div className=" mt-20 ml-20 m-4 flex flex-row">
          <LargeButton name="✨ Learn important C.S. concepts for free." description="You can learn fundamental computer science concepts easily through our lessons. Anytime, anywhere." margin={70}/>
          <LargeButton name="✨ Test your knowledge with practice." description="Strengthen your newfound skills with our practice problems. Remember, practice makes perfect!" margin={70}/>
          <LargeButton name="✨ Save and continue your progress." description="Do not worry about losing progress, we make sure it's there. All progress is saved to keep you on track." margin={50}/>
        </div>
        <Footer/>
      </SignedOut>
    );
  }
}