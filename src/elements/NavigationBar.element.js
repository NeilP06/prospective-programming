'use client';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import DarkLogo from "../dark-logo.svg";
import LightLogo from "../light-logo.svg";
import React from "react";

export default function NavigationBar() {
    var logo = "";
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        logo = LightLogo;
    } else {
        logo = DarkLogo;
    }
    return (
        <div>
            <nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="h-12" alt="ProspectiveProgramming"/>
                        <span className="text-black hover:text-slate-800 dark:text-white dark:hover:text-slate-400 font-mono mt-1">ProspectiveProgramming</span>
                    </Link>
                    <div id="navigation-bar" className="w-full md:w-auto">
                        <ul className="flex fel-col font-sans text-center md:text-right font-medium p-4 md:p-0 md:flex-row md:mt-0 md:border-0 border border-gray-100 rounded-lg md:space-x-8 md:dark:bg-gray-900">
                            <li>
                                <Link to="/" className="block text-black bg-blue-700 text-lg p-4 md:p-0 mt-4 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-200 dark:bg-blue-600 md:dark:bg-transparent">Home</Link>
                            </li>
                            <li>
                                <a href="lessons.html" className="block text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">Lessons</a>
                            </li>
                            <li>
                                <a href="practice.html" className="block text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">Practice</a>
                            </li>
                            <li>
                                <SignedIn>
                                    <div className="mt-3.5 md:p-0 p-4">
                                        <UserButton/>
                                    </div>
                                </SignedIn>
                                <SignedOut>
                                    <div className="block text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">
                                        <Link to="/login">Log-in</Link> 
                                    </div>
                                </SignedOut>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
