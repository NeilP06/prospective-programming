import DarkLogo from "../dark-logo.svg";
import LightLogo from "../light-logo.svg";
import React from "react";

export default function Warning() {
    var logo = "";
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        logo = LightLogo;
    } else {
        logo = DarkLogo;
    }
    return (
        <div class="flex flex-col items-center justify-center mt-32">
            <div class="flex items-center w-4/6 px-6 py-14 rounded bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600">
                <p class="text-center text-lg font-medium text-black dark:text-white">ProspectiveProgramming does not function on mobile phone devices at this current moment. To use our application, please use a mobile tablet device or a computer to proceed. <i>We are sorry for this inconvenience and we will address this soon.</i></p>
            </div>
            <div class="flex flex-row items-center justify-center mt-5">
                <img src={logo} className="h-12" alt="ProspectiveProgramming"/>
                <span className="text-black dark:text-white font-mono mt-1">ProspectiveProgramming</span>
            </div>
        </div>
    );
}