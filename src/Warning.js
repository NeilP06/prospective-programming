import React from "react";

export default function Warning() {
    console.log(window.innerWidth);
    if (window.innerWidth < 760) {
        return (
            <div class="">
                <h2>hi</h2>
            </div>
        );
    } else {
        return null;
    }
}