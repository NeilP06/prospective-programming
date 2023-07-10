'use client';
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import DarkLogo from "./dark-logo.svg";
import LightLogo from "./light-logo.svg";
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
            <nav className="border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="" className="flex items-center">
                        <img src={logo} className="h-12" alt="ProspectiveProgramming"/>
                        <span className="text-black hover:text-slate-800 dark:text-white dark:hover:text-slate-400 font-mono mt-1">ProspectiveProgramming</span>
                    </a>
                    <div id="navigation-bar" className="w-full md:w-auto">
                        <ul className="flex fel-col font-sans text-center md:text-right font-medium p-4 md:p-0 md:flex-row md:mt-0 md:border-0 md:bg-white border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="home.html" className="block text-black bg-blue-700 text-lg p-4 md:p-0 mt-4 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-200 dark:bg-blue-600 md:dark:bg-transparent">Home</a>
                            </li>
                            <li>
                                <a href="lessons.html" className="block text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">Lessons</a>
                            </li>
                            <li>
                                <a href="practice.html" className="block text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">Practice</a>
                            </li>
                            <li>
                                {/* <button id="toggle" data-dropdown-toggle="dropdownElements" className="flex items-center justify-between w-full dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">Account<svg className="w-5 h-5 ml-1" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                                <div id="dropdownElements" className="hidden z-10 border-2 border-slate-100 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 divide-y divide-gray-100 dark:divide-slate-500 rounded-lg shadow w-45">
                                    <ul className="py-2 text-small text-gray-800 dark:text-slate-400" aria-labelledby="toggle">
                                        <li>
                                            <Link to="/auth" className="text-left block px-2 py-1 hover:bg-gray-600 dark:hover:bg-gray-200hover:text-slate-800 dark:hover:text-slate-400">Log-in</Link>
                                        </li>
                                    </ul>
                                </div> */}
                                <div className="block text-black dark:text-white hover:text-slate-800 dark:hover:text-slate-400 text-lg md:p-0 mt-4 p-4">
                                    <Dropdown inline label="Account">
                                        <Dropdown.Item><Link to="/auth" className="text-left block px-2 py-1 hover:bg-gray-600 dark:hover:bg-gray-200hover:text-slate-800 dark:hover:text-slate-400">Log-in</Link></Dropdown.Item>
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