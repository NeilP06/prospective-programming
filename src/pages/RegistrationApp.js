import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Footer from "../Footer.js";
import NavigationBar from "../NavigationBar.js";
import Warning from "../Warning.js";

export default function RegistrationApp() {
  document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch(
      'http://localhost:1000/register', {
        method: "post",
        body: JSON.stringify({ name, username, email, password }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    result = await result.json();
    if (result) {
      console.log("Authentication: request sent to backend successfully.");
      alert("You registered successfully, you may now log-in. Redirecting...");
      setEmail("");
      setUsername("");
      setName("");
      setPassword("");
      navigate("/login");
    } else {
      alert("You have already registered an account, try to log-in.");
    }
  }
  if (window.innerWidth > 800) {
    return (
      <div>
        <NavigationBar/>
        <div className="flex flex-col items-center justify-center mt-20">
          <form action="" className="flex flex-col w-1/3 px-16 py-10 rounded bg-slate-200 dark:bg-gray-800 border-2 border-white dark:border-gray-600">
            <p className="mb-2 text-center text-3xl font-bold text-black dark:text-white">Sign Up</p>
            <p className="mb-3 text-center text-xs text-gray-800 dark:text-slate-300">Get started with ProspectiveProgramming today!</p>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-black dark:border-white"></div>
                <span className="flex-shrink mx-2 text-xs text-black dark:text-white">Enter Information</span>
              <div className="flex-grow border-t border-black dark:border-white"></div>
            </div>
            <input className="h-10 my-1 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="h-10 my-1 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className="h-10 my-1 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className="h-10 mt-1 mb-5 text-sm placeholder-black dark:placeholder-gray-200 text-white bg-slate-100 dark:bg-slate-600 rounded border-2 border-white dark:border-slate-400" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className="flex items-center justify-center mb-4">
              <button className="text-center w-1/2 px-4 py-2 font-medium text-white dark:text-black bg-gray-900 dark:bg-slate-100 hover:bg-gray-700 dark:hover:bg-slate-300 rounded"type="submit" onClick={handleOnSubmit}>Register Account</button>
            </div>
            <p className="text-center text-sm text-black dark:text-white">Already have an account? <Link className="font-bold text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-400" to="/login">Log-in here.</Link></p>
          </form>
        </div>
        <Footer/>
      </div>
    );
  } else {
    return (
      <div>
        <Warning/>
      </div>
    );
  }
}