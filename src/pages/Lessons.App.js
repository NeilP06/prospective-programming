import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../elements/Footer.element";
import NavigationBar from "../elements/NavigationBar.element";
import React from "react";
import Warning from "../elements/Warning.element";
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("An error occured in relation to Clerk: no key found.");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function LessonsApp() {
    // useEffect(() => {
    //     const navigate = useNavigate();
    // }, [navigate]);
    // const redirect = navigate("/login");
    return (
        <ClerkProvider publishableKey={key}>
            <SignedIn>
            <NavigationBar/>
                <ul>
                    <Link to="../java-lesson-one">One</Link>
                    <Link to="../java-lesson-two">Two</Link>
                    <Link to="../java-lesson-three">Three</Link>
                </ul>
                <Footer/>
            </SignedIn>
            <SignedOut>
                {/* {redirect} */}
            </SignedOut>
        </ClerkProvider>
    );
}