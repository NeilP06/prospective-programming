'use client';
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import DarkLogo from "./dark-logo.svg";
import LightLogo from "./light-logo.svg";
import React from "react";

export default function NavigationBar() {
    var logo = "";
    // test
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        logo = LightLogo;
    } else {
        logo = DarkLogo;
    }
    return (
        <div>
            <nav className="border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="h-12" alt="ProspectiveProgramming"/>
                        <span className="text-black hover:text-slate-800 dark:text-white dark:hover:text-slate-400 font-mono mt-1">ProspectiveProgramming</span>
                    </Link>
                    <div id="navigation-bar" className="w-full md:w-auto">
                        <ul className="flex fel-col font-sans text-center md:text-right font-medium p-4 md:p-0 md:flex-row md:mt-0 md:border-0 md:bg-white border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
                                <div className="block text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">
                                    <Dropdown inline label="Account">
                                        <Dropdown.Item><Link to="/signup" className="text-left block px-2 py-1 hover:text-slate-800 dark:hover:text-slate-400">Log-in</Link></Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
