import React from "react";

export default function Greetings(props) {
    if (props.condition === "registered") {
        return (
            <h2 className="mt-24 ml-20 mr-10 text-5xl lg:text-6xl font-mono text-black dark:text-white font-bold ">Welcome back, {props.name}! 👋</h2>
        );
    } else {
        return (
            <p className="mt-24 ml-20 mr-10 text-4xl lg:text-5xl font-mono text-black dark:text-white font-bold">Welcome to ProspectiveProgramming! 👏</p>
        );
    }
}