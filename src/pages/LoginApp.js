import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Footer from "../Footer.js";
import NavigationBar from "../NavigationBar.js";

export default function LoginApp() {
    document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
    const [username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let result = await fetch(
                'http://localhost:1000/login', {
                    method: "post",
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            if (!result.ok) {
                console.log("Authentication: there is a problem with user credentials.");
                alert("Log-in failed: your username or password is incorrect.");
                
            } else {
                console.log("Authentication: user logged-in successfully.");
                const data = await result.json();
                alert(data.message);
                setUsername("");
                setPassword("");
                navigate("/");
            }
        } catch (e) {
            throw e;
        }
    };

    return (
        <div>
            <NavigationBar/>
            <div className="flex flex-col items-center justify-center mt-20">
                <form onSubmit={handleSubmit} className="flex flex-col w-1/3 px-16 py-10 rounded bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600">
                    <p className="mb-2 text-center text-3xl font-bold text-black dark:text-white">Log-in</p>
                    <p className="mb-3 text-center text-xs text-gray-800 dark:text-slate-300">Continue progress with your account.</p>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-black dark:border-white"></div>
                        <span className="flex-shrink mx-2 text-xs text-black dark:text-white">Enter Information</span>
                        <div className="flex-grow border-t border-black dark:border-white"></div>
                    </div>
                    <input className="h-10 my-1 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                    <input className="h-10 mt-1 mb-5 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    <div className="flex items-center justify-center mb-4">
                        <button className="text-center w-1/2 px-4 py-2 font-medium text-white dark:text-black bg-gray-900 dark:bg-slate-100 hover:bg-gray-700 dark:hover:bg-slate-300 rounded" type="submit">Log-in</button>
                    </div>
                    <p className="text-center text-sm text-black dark:text-white">Do not an account? <Link className="font-bold text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-400" to="/signup">Sign-up here.</Link></p>
                </form>
            </div>
            <Footer className="mt-10"/>
        </div>
    );
}