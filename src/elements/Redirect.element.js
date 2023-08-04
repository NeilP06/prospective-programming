import DarkLogo from "../dark-logo.svg";
import LightLogo from "../light-logo.svg";
import React from "react";

/** 
 * @param {redirection} props 
 * @returns <Redirect/> 
 * --> creates a redirect module for whenever it is needed.
 */
export default function Redirect(props) {
    var logo = "";
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        logo = LightLogo;
    } else {
        logo = DarkLogo;
    }
    return (
        <div class="flex flex-col items-center justify-center mt-32">
            <div class="flex items-center w-1/2 px-3 py-7 rounded bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600">
                <p class="text-center text-lg font-medium text-black dark:text-white">Redirecting to {props.redirection}...</p>
            </div>
            <div class="flex flex-row items-center justify-center mt-5">
                <img src={logo} className="h-12" alt="ProspectiveProgramming"/>
                <span className="text-black dark:text-white font-mono mt-1">ProspectiveProgramming</span>
            </div>
        </div>
    );
}