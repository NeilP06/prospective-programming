import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/constants";

const app = new App(APP_ID);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const Login = async(email, password) => {
        const credentials = Credentials.emailPassword(email, password);
        const authUser = await app.logIn(credentials);
        setUser(authUser);
        return authUser;
    }

    const Signup = async(email, password) => {
        try {
            await app.emailPasswordAuth.registerUser(email, password);
            return Login(email, password);
        } catch (error) {
            throw error;
        }
    }

    const fetchUser = async() => {
        // prevents default users...
        if (!app.currentUser) {
            return false;
        }
        try {
            await app.currentUser.refreshCustomData();
            setUser(app.currentUser);
            return app.currentUser;
        } catch (error) {
            throw error;
        }
    }

    const Logout = async() => {
        if (!app.currentUser) {
            return false;
        }
        try {
            await app.currentUser.logOut();
            setUser(null);
            return true;
        } catch (error) {
            throw error;
        }
    }
    return <UserContext.Provider value={{ user, setUser, fetchUser, Login, Signup, Logout }}>{children}</UserContext.Provider>;
}

