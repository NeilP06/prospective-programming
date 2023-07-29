import { ClerkProvider, SignIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Footer from "../elements/Footer.element.js";
import NavigationBar from "../elements/NavigationBar.element.js";
import Warning from "../elements/Warning.element.js";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error(" no key ");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function RegistrationApp() {
  document.body.classList.add("bg-slate-300", "dark:bg-gray-900");
  return (
    <ClerkProvider publishableKey={key}>
      <Content/>
    </ClerkProvider>
  )
}

function Content() {
  const { user }  = useUser();
  const navigate = useNavigate();
  if (!user && window.innerWidth > 800) {
    return (
      <div>
        <NavigationBar/>
        <SignedOut>
          <div class="mt-20 flex items-center justify-center">
            <SignIn/>
          </div>
        </SignedOut>
        <Footer/>
      </div>
    );    
  } else if (user && window.innerWidth > 800) {
    navigate("/");
  } else {
    return (
      <Warning/>
    );
  }
}