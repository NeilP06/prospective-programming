import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

/**
 * @returns <Initialization/>
 * --> creates a module that appends new users into the system database.
 */
export default function Initialization() {
    // fetches user from active session:
    const { user } = useUser();
    // initializes boolean for future use:
    const [ userDataResult, setUserDataResult ] = useState(false);
    // converts `isUserData(user.id)` input into a boolean:
    window.onload = isUserData(user.id).then((result) => {
            setUserDataResult(result);
        }).catch((error) => {
            console.error("An error occurred in relation to extracting isUserData.", error);
        }
    );
    // inserts data into database if user is not found:
    useEffect(() => {
        if (user && !userDataResult) {
            // writes user's ID & full name into database:
            insertUserData(user.id, user.fullName);
        }
    }, [user, userDataResult]);
    /** 
     * @param {*} userId 
     * @returns boolean
     * --> returns true/false boolean depending on if `userId` is found inside database.
     */
    async function isUserData(userId) {
        try {
            // variable to fetch user data:
            const { data, error } = await supabase.from("users").select("userId").eq("userId", userId);
            if (error) {
                console.error("An error occurred in relation to fetching data from Supabase.", error);
                return false;
            }
            return data.length > 0;
        } catch (error) {
            console.error("An error occured in relation to fetching data from Supabase.", error);
        }
    };
    /**
     * @param {userId, fullName}
     * @returns data
     * --> inserts user data into the database.
     */
    const insertUserData = async (userId, fullName) => {
        try {
            /**
             * @note will return a 409 error in the browser if the user is already added.
             * --> appends user to the database.
             */
            const { data } = await supabase.from('users').insert([{ userId: userId, fullName: fullName }]).select();
            // returns variable for potential purposes:
            return data;
        } catch (error) {
            console.error("An error occured in relation to inserting data into Supabase.", error);
        }
    };
}