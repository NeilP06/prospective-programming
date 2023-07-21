import React from "react";

export default function Greetings(props) {
    if (props.name !== undefined) {
        return (
            <div className="mt-24">
                <h2 className="ml-20 font-mono text-black dark:text-white font-bold text-6xl">Hello, {props.name}! 👋</h2>
            </div>
        );
    } else {
        return (
            <div className="mt-24">
                <h2 className="ml-20 font-mono text-black dark:text-white font-bold text-6xl">Hello, user!</h2>
            </div>
        )
    }
}