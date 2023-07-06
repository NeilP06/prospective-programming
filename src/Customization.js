import React from "react";

export default function Greetings(props) {
    if (props.name !== undefined) {
        return (
            <div class="mt-20">
                <h2 class="ml-20 font-mono text-black dark:text-white font-bold text-6xl">Hello, {props.name}!</h2>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Test!</h2>
            </div>
        )
    }
}