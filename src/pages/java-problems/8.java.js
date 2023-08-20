import { createClient } from "@supabase/supabase-js";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import PracticeModule from "../../layouts/PracticeProblem.layout.js";
import React, { useEffect, useState } from "react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("An error occured in relation to Clerk: no key found.");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

export default function JavaProblemEight() {
    document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
    // following keys are initialized to fetch lesson data:
    const [ expected, setExpected ] = useState("");
    const [ practiceContent, setPracticeContent ] = useState("");
    const [ practiceId, setPracticeId ] = useState("");
    const [ practiceName, setPracticeName ] = useState("");
    const [ prompt, setPrompt ] = useState("");
    // loads lesson data from the database with a hook:
    useEffect(() => {
        const loadData = async(e) => {
            // sets data array to a variable:
            const { data, error } = await supabase.from("java-practice").select().eq("id", 8);
            // throws an error if the data is corrupted:
            if (error) {
                throw new Error("An error occured in relation to Supabase fetch.");
            }
            // sets data to the following variables for later use:
            setExpected(data[0].expectedOutput);
            setPracticeContent(data[0].content);
            setPracticeId(data[0].practiceId);
            setPracticeName(data[0].name);
            setPrompt(data[0].lessonProblem);
        }
        loadData();
    }, []);
    /**
     * @param {*} data 
     * --> when data is received, it calls a specific function:
     */
    const handleParentData = (data) => {
        // checks to see if data arrives to console:
        console.log("Data received to the parent module:", data);
        ChangeToCompletedStatus();
    };
    // loading function when content is being fetched:
    if (prompt === "") {
        return (
            <p className="mt-5 ml-5 font-semibold text-white">Content is loading... </p>
        );
    }
    // returns parent module:
    return (
        <ClerkProvider publishableKey={key}>
            <ChangeStatus/>
            <PracticeModule expected={expected} practiceContent={practiceContent} practiceId={practiceId} practiceName={practiceName} prompt={prompt}  onSendData={handleParentData}/>
        </ClerkProvider>
    );
}

/**
 * @returns <ChangeStatus/>
 * --> creates a module that changes status when the user enters a lesson page.
 */
function ChangeStatus() {
    // fetches user information:
    const { user } = useUser();
    // initializes a variable that will be used to fetch user status:
    const [ userStatus, setUserStatus ] = useState("");
    // updates lesson status with a hook:
    useEffect(() => {
        // checks if the user is logged on to prevent database errors:
        if (user) {
            // fetches current status data to ensure no interference with completed lessons:
            const fetchData = async () => {
                // fetches data:
                const { data, error } = await supabase.from("users").select("java_p_eight").eq("userId", user.id);
                // throws an error if a database error occurs:
                if (error) {
                    throw new Error("An error occured in relation to Supabase fetch.", error);
                }
                // sets data to the `userStatus` variable:
                setUserStatus(data[0].java_p_eight);
            }
            // calls the function:
            fetchData();
            // gives the loadData callback a 2000ms (2s) timeout to ensure no latency bugs: 
            setTimeout(() => {
                // prevents initialized variables to change status data & prevents completed status collisions:
                if (userStatus !== "Completed" && userStatus) {
                    const loadData = async () => {
                        // updates data and exports it as an error:
                        const { error } = await supabase.from("users").update({ java_p_eight: "In Progress" }).eq("userId", user.id);
                        // throws an error if a database error occurs:
                        if (error) {
                            throw new Error("An error occurred in relation to Supabase update.", error);
                        }
                    };
                    loadData();
                }
            }, 2000);
        }
    }, [user, userStatus]);
}

/**
 * @returns ChangeToCompletedStatus()
 * --> creates a function that changes status when the user successfully completes the practice problem.
 */
function ChangeToCompletedStatus() {
    // fetches user information:
    const { user } = useUser();
    // updates lesosn status with a hook:
    useEffect(() => {
        // checks if the user is logged on to prevent database errors:
        if (user) {
            const changeData = async () => {
                // updates data and exports it as an error:
                const { error } = await supabase.from("users").update({ java_p_eight: "Completed" }).eq("userId", user.id);
                // throws an error if a database error occurs:
                if (error) {
                    throw new Error("An error occured in relation to Supabase update.", error);
                }
            };
            changeData();
        }  
    }, [user]);  
}