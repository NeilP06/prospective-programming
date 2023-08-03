import { ClerkProvider, SignedIn, useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../elements/Footer.element";
import NavigationBar from "../elements/NavigationBar.element";
import React, { useEffect } from "react";
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
    useEffect(() => {
        setTimeout(() => {
            if (!user && window.innerWidth > 800) {
                navigate("/login");
            }
        }, 1000);
    }, [user, navigate]);
    if (user && window.innerWidth > 800) {
        return (
            <SignedIn>
                <NavigationBar/>
                <ul>
                    <Link to="../java-lesson-one">One</Link>
                    <Link to="../java-lesson-two">Two</Link>
                    <Link to="../java-lesson-three">Three</Link>
                </ul>
                <Footer/>
            </SignedIn>
        );
    } else if (window.innerWidth < 800) {
        return (
            <div>
                <Warning/>
            </div>
        );
    } else {
        return (
            <div>
                <Redirect redirection="/login"/>
            </div>
        )
    }
}