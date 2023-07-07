import React from "react";

export default function PracticeProblem(props) {
    if (props.condition === "homepage") {
        return (
            <div className=" h-52 w-72 p-10 mr-6 rounded-lg bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600 hover:cursor-pointer hover:translate-x-2 hover:translate-y-2 duration-700">
                <p className="text-lg font-semibold text-slate-800 dark:text-gray-100">"{props.problemName}"</p>
                <p className="mt-3 text-xs text-slate-900 dark:text-gray-200">Pre-Req: Lesson(s) {props.prerequisite}</p>
                <p className="mt-10 text-sm font-bold text-slate-900 dark:text-gray-200">{props.status}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h2>not on homepage</h2>
            </div>
        );
    }
}