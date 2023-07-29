import { Analytics } from "@vercel/analytics/react";
import { ArrowUpRight } from "lucide-react";
import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Footer from "./elements/Footer.element.js";
import Greetings from "./elements/Customization.element.js";
import Lesson from "./layouts/Lesson.button.js";
import NavigationBar from "./elements/NavigationBar.element.js";
import PracticeProblem from "./layouts/PracticeProblem.button.js";
import Warning from "./elements/Warning.element.js";
import React from "react";

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
  const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  if (user) {
    return (
      <SignedIn>
        <NavigationBar/>
          <Greetings name={user.firstName}/>
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
        <Footer/>
      </SignedIn>
    );
  } else {
    return (
      <SignedOut>
        <NavigationBar/>
        <p className="mt-24 ml-20 font-mono text-black dark:text-white font-bold text-5xl">Welcome to ProspectiveProgramming! 👏</p>
        <p className="mt-4 ml-20 flex text-gray-800 dark:text-slate-200"><Link to="/login" class="flex justify-center text-blue-600">Log-in<ArrowUpRight class="mr-1 hover:text-blue-800" color="#1B64F1"/></Link>to get started or continue progress.</p>
        <div className=" mt-20 ml-20 m-4 flex flex-row">
          <h2>hi</h2>
          <h3>hey</h3>
        </div>
        <Footer/>
      </SignedOut>
    );
  }
}