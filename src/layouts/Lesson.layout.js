import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import { ClerkProvider } from "@clerk/clerk-react";
import AceEditor from "react-ace";
import Footer from "../elements/Footer.element.js";
import NavigationBar from "../elements/NavigationBar.element.js";
import React from "react";



if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Clerk is not connecting to the application.");
  }
  const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function LessonModule(props) {
    document.body.classList.add("bg-slate-300", "dark:bg-gray-900");            
    return (
        <ClerkProvider publishableKey={key}>
            <NavigationBar/>
            <div className="mt-20 flex flex-row">
                <div className="w-1/2">
                    <p className="text-6xl">Hello</p>
                    <p className="text-md">text</p>
                </div>
                <div>
                    <IDE className="w-full"/>
                </div>
            </div>
            <Footer/>
        </ClerkProvider>
    );
}

function IDE() {
    var editorTheme = "github";
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        editorTheme = "twilight";
    }
    return (
        <AceEditor
            className={ "rounded-xl border-2 border-white dark:border-gray-800" }
            fontSize={14}
            highlightActiveLine={true}
            mode="java"
            name="java-editor"
            // onChange={this.onChange}
            // onLoad={this.onLoad}
            placeholder="Type your code here."
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }}
            showGutter={true}
            showPrintMargin={true}
            theme={editorTheme}
            value={`public static void hello() {\n  // put your code here.\n}`}
        />
    );   
}