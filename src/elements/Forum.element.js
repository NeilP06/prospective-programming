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
                    <div className="h-screen flex items-center justify-center">
                        <form className="flex items-center justify-center bg-slate-700 rounded-lg w-1/2 h-1/2">
                            <div className="flex flex-col">
                                <input className="m-3" placeholder="Reason for Inquiry"></input>
                                <input className="m-3" placeholder="Contact Details (E-Mail)"></input>
                                <textarea className="m-3" placeholder="Describe your problem here."></textarea>
                            </div>
                        </form>
                    </div>
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
            <p>No bueno. get outta here kid</p>
        );
    }
}