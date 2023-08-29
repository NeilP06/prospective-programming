import React from "react";

export default function PracticeProblem(props) {
    let result = "";
    let requirements = "Prerequisite: Lesson(s) " + props.prerequisite;
    if (typeof props.problemName === "string" && window.innerWidth < 1160) {
        if (props.problemName.substring(5, 6) === " ") {
            result = props.problemName.substring(0, 5) + "...";
        } else {
            result = props.problemName.substring(0, 6) + "..."; 
        }
        requirements = "Prerequisite: Lesson(s) " + props.prerequisite;
    } else if (props.problemName.length > 13) {
        result = props.problemName.substring(0, 10) + "...";
    } else {
        result = props.problemName;
    }
    if (props.condition === "homepage") {
        return (
            <div className=" h-52 w-72 p-10 mr-6 rounded-lg bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600 hover:cursor-pointer hover:translate-x-2 hover:translate-y-2 duration-700">
                <p className="text-lg font-semibold text-slate-800 dark:text-gray-100">✨ {props.practiceId} "{result}"</p>
                <p className="mt-3 text-xs text-slate-900 dark:text-gray-200">{requirements}</p>
                <p className="mt-10 text-sm font-bold text-slate-900 dark:text-gray-200">{props.status}</p>
            </div>
        );
    } else {
        return (
            <div className="h-66 w-80 p-10 mr-10 rounded-lg bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600 hover:cursor-pointer hover:translate-x-2 hover:translate-y-2 duration-700">
                <p className="text-xl font-semibold text-slate-800 dark:text-gray-100">✨ {props.practiceId} "{props.practiceName}"</p>
                <p className="mt-4 text-sm text-slate-900 dark:text-gray-200">Prerequisite: Lesson(s) {props.prerequisite}</p>
                <p className="sticky mt-10 text-md font-bold text-slate-900 dark:text-gray-200">{props.status}</p>
            </div>
        );
    }
}