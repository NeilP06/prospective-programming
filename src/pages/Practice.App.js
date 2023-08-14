import { ClerkProvider, SignedIn, useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../elements/Footer.element.js";
import NavigationBar from "../elements/NavigationBar.element.js";
import React, { useEffect, useState } from "react";
import Redirect from "../elements/Redirect.element.js";
import Warning from "../elements/Warning.element.js";
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
    // initializes variables to fetch raw database data:
    const [ fetchData, setFetchData ] = useState("");
    // initializes variables used to fetch raw completed practice problems data:
    const [ fetchCompletedData, setCompletedData ] = useState("");
    // initializes variables used to track the mounted state of data fetching:
    const [ isMounted, setIsMounted ] = useState(false);
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
        // const { data, error } = await supa
    }, [user]);
    if (user && window.innerWidth > 800) {
    return (
        <SignedIn>
            <NavigationBar/>
            <Footer/>
        </SignedIn>
    );
    } else if (window.innerWidth < 800) {
        return (
            <Warning/>
        );
    } else {
        return (
            // returns a <Redirect/> module if the user is not signed in:
            <Redirect redirection={<Link className="text-blue-600 hover:text-blue-800" to="/login">https://prospectiveprogramming.org/login</Link>}/>
        )
    }
}