import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Footer from "../Footer.js";
import NavigationBar from "../navigationBar.js";

export default function LoginApp() {
    return (
        <div>
            <NavigationBar/>
            <div class="flex flex-col items-center justify-center mt-20">
                <form action="" class="flex flex-col w-1/3 px-16 py-10 rounded bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600">
                    <p class="mb-2 text-center text-3xl font-bold text-black dark:text-white">Log-in</p>
                    <p class="mb-3 text-center text-xs text-gray-800 dark:text-slate-300">Continue progress with your account.</p>
                    <div class="relative flex py-5 items-center">
                        <div class="flex-grow border-t border-black dark:border-white"></div>
                        <span class="flex-shrink mx-2 text-xs text-black dark:text-white">Enter Information</span>
                        <div class="flex-grow border-t border-black dark:border-white"></div>
                    </div>
                    <input class="h-10 my-1 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="text" placeholder="Username"/>
                    <input class="h-10 mt-1 mb-5 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="password" placeholder="Password"/>
                    <div class="flex items-center justify-center mb-4">
                        <button class="text-center w-1/2 px-4 py-2 font-medium text-white dark:text-black bg-gray-900 dark:bg-slate-100 hover:bg-gray-700 dark:hover:bg-slate-300 rounded"type="submit">Log-in</button>
                    </div>
                    <p class="text-center text-sm text-black dark:text-white">Do not an account? <Link class="font-bold text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-400" to="/signup">Sign-up here.</Link></p>
                </form>
            </div>
            <Footer/>
        </div>
    );
}