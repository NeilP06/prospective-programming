import { ClerkProvider, SignedIn, SignIn, SignedOut } from "@clerk/clerk-react";
import React from "react";
import Footer from "../Footer.js";
import NavigationBar from "../NavigationBar.js";
import Warning from "../Warning.js";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error(" no key ");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function RegistrationApp() {
  document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
  if (window.innerWidth > 800) {
    return (
      <ClerkProvider publishableKey={key}>
        <NavigationBar/>
        <SignedIn>
          <p>Looks like a confusion on our part. You are already signed-in!</p>
        </SignedIn>
        <SignedOut>
          <SignIn/>
        </SignedOut>
        <Footer/>
      </ClerkProvider>
    );
  } else {
    return (
      <div>
        <Warning/>
      </div>
    );
  }
}