import DarkLogo from "../dark-logo.svg";
import LightLogo from "../light-logo.svg";
import React from "react";

export default function Footer() {
    var logo = "";
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        logo = LightLogo;
    } else {
        logo = DarkLogo;
    }
    return (
        <div className="h-64 w-full mt-44 p-10 border-t-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-gray-950">
            <div className="float-left">
                <div className="flex flex-row">
                    <img src={logo} className="h-12" alt="ProspectiveProgramming"/>
                    <span className="text-black dark:text-white font-mono mt-3.5">ProspectiveProgramming</span>
                </div>
                <ul className="text-lg ml-2 leading-9 text-blue-800 dark:text-blue-200">
                    <li className="text-black dark:text-white"><b>Language:</b> English</li>
                    <li className="hover:underline"><a href="mailto:me@neilpuroh.it">Report a Problem</a></li>
                    <li className="hover:underline">Contribute to ProspectiveProgramming</li>
                    <li className="hover:underline"><a href="https://forms.gle/48dx7rJdbGMJQMKb9">Contribute to ProspectiveProgramming</a></li>
                </ul>
            </div>
            <div className="w-96 mt-1 float-right">
                <p className="text-lg font-medium text-black dark:text-white">ProspectiveProgramming is a <i>501(c)(3)</i> not-for-profit organization that vows to teach computer science fundamentals to kids throughout the world. Thank you for being a part of the movement!</p>
            </div>
        </div>
    );
}