import { ClerkProvider, SignedIn, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("An error occured in relation to Clerk: no key found.");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function Form(props) {

    return (
        <ClerkProvider publishableKey={key}>
            <form>
                <p>Hello</p>
            </form>
        </ClerkProvider>
    )
}

function Content() {
    <div>
        <SignedIn>

        </SignedIn>
        <SignedOut>

        </SignedOut>
    </div>
}
