import Greetings from "./Customization.js";
import NavigationBar from "./navigationBar.js";
import React from "react";

export default function App() {
  var username = "Neil";
  document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
  return (
    <div>
      <NavigationBar/>
      <Greetings name={username}/>
    </div>
  );
}