import React from "react";

export default function LargeButton(props) {
    const buttonStyle = { marginRight: props.margin || 0 };
    var status = "";
    if (!props.status) {
        status = <p className="mt-10 text-sm font-bold text-slate-900 dark:text-gray-200">{props.status}</p>;
    }
    if (!props.name || !props.description) {
        throw new Error("Please add a name or description to a LargeButton element");
    }
    return (
        <div className="md:h-88 lg:h-72 w-72 p-10 rounded-lg bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600 hover:cursor-pointer hover:translate-x-2 hover:translate-y-2 duration-700" style={buttonStyle}>
            <p className="text-md lg:text-lg font-semibold text-slate-800 dark:text-gray-100">{props.name}</p>
            <p className="mt-4 text-slate-900 dark:text-gray-200">{props.description}</p>
            {status}
        </div>
    );
}