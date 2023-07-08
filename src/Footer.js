import DarkLogo from "./dark-logo.svg";
import LightLogo from "./light-logo.svg";
import React from "react";

export default function Footer() {
    var logo = "";
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        logo = LightLogo;
    } else {
        logo = DarkLogo;
    }
    return (
        <div class="h-56 w-full mt-44 p-10 border-t-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-gray-950">
            <div class="float-left">
                <div class="flex flex-row">
                    <img src={logo} className="h-12" alt="ProspectiveProgramming"/>
                    <span className="text-black dark:text-white font-mono mt-3.5">ProspectiveProgramming</span>
                </div>
                <ul class="text-lg ml-2 leading-9 text-blue-800 dark:text-blue-200">
                    <li class="hover:underline"><a href="">Lessons</a></li>
                    <li class="hover:underline"><a href="">Practice Problems</a></li>
                </ul>
            </div>
            <div class="w-96 mt-1 float-right">
                <p class="text-lg font-medium text-black dark:text-white">ProspectiveProgramming is a <i>501(c)(3)</i> not-for-profit organization that vows to teach computer science fundamentals to kids throughout the world. Thank you for being a part of the movement!</p>
            </div>
        </div>
    );
}