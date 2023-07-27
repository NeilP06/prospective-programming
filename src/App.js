import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Footer from "./Footer.js";
import Greetings from "./Customization.js";
import Lesson from "./Lesson.js";
import NavigationBar from "./NavigationBar.js";
import PracticeProblem from "./PracticeProblem.js";
import Warning from "./Warning.js";
import React from "react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error(" no key ");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function App() {
  const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  var username = "Neil";
  document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
  if (window.innerWidth > 800) {
    return (
      <ClerkProvider publishableKey={key}>
        <Analytics/>
        <div>
          <NavigationBar/>
          <Greetings name={username}/>
          <SignedIn>
            <div className="mt-24">
              <p className="mt-2 ml-20 font-semibold text-gray-800 dark:text-slate-200">Recommended Lessons for You</p>
              <div className="ml-20 m-4 flex flex-row">
                <Lesson href="https://neilp06.net" condition="homepage" lessonName="1.0 Intro to Java" description={desc} status="Not Started"/>
                <Lesson condition="homepage" lessonName="1.1 Java Syntax" description={desc} status="In Progress..."/>
                <Lesson condition="homepage" lessonName="1.2 Java Objects I" description={desc} status="Not Started"/>
                <Lesson condition="homepage" lessonName="1.3 Java Objects II" description={desc} status="Not Started"/>
              </div>
            </div>
            <div className="mt-20">
              <p className="mt-2 ml-20 font-semibold text-gray-800 dark:text-slate-200">Practice Problems for You</p>
              <div className="ml-20 m-4 flex flex-row">
                <PracticeProblem condition="homepage" problemName="Printing Madness!" prerequisite="1.0, 1.1" status="In Progress..."/>
                <PracticeProblem condition="homepage" problemName="Printing Madness!" prerequisite="1.0, 1.1" status="Not Started"/>
                <PracticeProblem condition="homepage" problemName="Printing Madness!" prerequisite="1.0, 1.1" status="Not Started"/>
                <PracticeProblem condition="homepage" problemName="Printing Madness!" prerequisite="1.0, 1.1" status="Not Started"/>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <h2>test</h2>
          </SignedOut>
          <Footer/>
        </div>
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