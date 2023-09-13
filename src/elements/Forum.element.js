import { ClerkProvider, SignedIn, useUser } from "@clerk/clerk-react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error(" no key ");
  }
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function Forum(props) {
    return (
        <ClerkProvider publishableKey={key}>
            <Content size={props.size}/>
        </ClerkProvider>
    );
}

/**
 * REMEMBER TO ADD SOME FUNCTIONS TO DETECT INPUT AND SEND OVER TO MASTER COMPONENT.
 */

function Content(props) {
    const { user } = useUser();
    if (user) {
        if (props.size !== "big") {
            return (
                <SignedIn>
                    <form>
                        <input placeholder="big"></input>
                    </form>
                </SignedIn>
            );
        } else {
            return (
                <SignedIn>
                    <form>
                        <input placeholder="small"></input>
                    </form>
                </SignedIn>
            );
        }
    } else {
        return (
            <p>No bueno.</p>
        );
    }
}