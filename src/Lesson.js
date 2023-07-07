import React from "react";

export default function Lesson(props) {
    let result = "";
    if (typeof props.description === "string") {
        if (props.description.substring(99, 100) === " ") {
            result = props.description.substring(0, 99);
        } else {
            result = props.description.substring(0, 100); 
        }
    }
    if (props.condition === "homepage") {
        return (
            <div className=" h-72 w-72 p-10 mr-6 rounded-lg bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600 hover:cursor-pointer hover:translate-x-2 hover:translate-y-2 duration-700">
                <p className="text-lg font-semibold text-slate-800 dark:text-gray-100">{props.lessonName}</p>
                <p className="mt-4 text-slate-900 dark:text-gray-200">{result}...</p>
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