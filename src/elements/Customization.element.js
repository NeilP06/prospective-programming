import React from "react";

export default function Greetings(props) {
        return (
        <div className="mt-24">
            <h2 className="ml-20 font-mono text-black dark:text-white font-bold text-6xl">Welcome back, {props.name}! 👋</h2>
        </div>
    );
}