import { useState } from "react";
import React from "react";

export default function AuthApp() {
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
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if (result) {
          console.log("Authentication: request sent to backend successfully.");
            alert("Registered successfully! Now log-in!");
            setEmail("");
            setUsername("");
            setName("");
            setPassword("");
        }
    }
  return (
    <div>
      <div>
        <form action="">
          <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleOnSubmit}>submit</button>
        </form>
      </div>
    </div>
  );
}