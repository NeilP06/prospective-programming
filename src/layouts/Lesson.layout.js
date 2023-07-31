import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import { ClerkProvider } from "@clerk/clerk-react";
import AceEditor from "react-ace";
import Footer from "../elements/Footer.element.js";
import NavigationBar from "../elements/NavigationBar.element.js";
import React, { useState, useEffect} from "react";
const { Configuration, OpenAIApi } = require("openai");

// checks if the API key for Clerk is not null before initializing the key:
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("An error occured in relation to Clerk: Clerk is not connecting to the application.");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

/**
 * @param {expected, lessonContent, lessonId, lessonName, prompt } props 
 * @returns <LessonModule/>
 * --> creates a layout page with all modules necessary for a lesson.
 */
export default function LessonModule(props) {
    // adjusts background theme for system preference:
    document.body.classList.add("bg-slate-300", "dark:bg-gray-900");    
    // initializes a variable for a sticky state to the <IDE/> module & its children:
    const [ isSticky, setStickyness ] = useState(true);  
    // const prompt = `public static void forLoops() {\n  for (int i = 0; i < 10; i++) {\n    // fill code here\n  }\n}`;
    // gives cases for sticky vs. relative positioning for the sitcky-state variable.
    useEffect(() => {
        const handleScroll = () => {
            // sticky offset stops at 5000px:
            const stopStickyOffset = 5000;
            const scroll = window.scrollY;
            setStickyness(scroll <= stopStickyOffset);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);   
    // returns <LessonModule/> page:   
    return (
        <ClerkProvider publishableKey={key}>
            <NavigationBar/>
            <div className="mt-20 flex flex-row">
                <div className="w-1/2">
                    <p className="mb-12 ml-20 mr-5 font-bold text-6xl text-black dark:text-white">✨ {props.lessonId} {props.lessonName}</p>
                    <p className="ml-20 mr-20 font-md text-lg leading-9 text-gray-800 dark:text-slate-200">{props.lessonContent}</p>
                </div>
                <div className="mt-24 mb-40 w-1/2">
                    <div className={`flex justify-center ${isSticky ? "sticky top-24 right-10" : ""}`}>
                        <div>
                            <p className="mb-1 mr-20 font-semibold text-3xl text-gray-700 dark:text-slate-300">🤔 Lesson Problem</p>
                            <p className="mb-5 mr-20 font-md text-md text-gray-600 dark:text-slate-400">Click the "Check" button when done.</p>
                            <IDE expected={props.expected} prompt={props.prompt} className="w-full"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </ClerkProvider>
    );
}

/** 
 * @param {expected, prompt} props 
 * @returns <IDE/>
 * --> creates module with code-editing capabilities. 
 */
function IDE(props) {
    // variable for updated inputted code to export:
    const [editorContent, setEditorContent] = useState(props.prompt);
    // default IDE theme for devices with light-mode set:
    var editorTheme = "github";
    // adjusts IDE theme to account for devices with dark-mode:
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        editorTheme = "twilight";
    }
    // returns <AceEditor/> + <CheckCode/> modules:
    return (
        <div>
            <AceEditor
                className="mr-10 rounded-xl border-2 border-white dark:border-gray-800"
                fontSize={14}
                height="300px"
                highlightActiveLine={true}
                mode="java"
                name="java-editor"
                onChange={(newContent) => setEditorContent(newContent)}
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
                value={editorContent}
            />
            <CheckCode code={editorContent} expected={props.expected}/>
        </div>
    );   
}

/**
 * @param {code, expected} props
 * @returns <CheckCode/>
 * --> creates module with unit test checking capabilities.
 */
function CheckCode(props) {
    // variables for OpenAI feedback to export:
    const [ correct, setCorrect ] = useState(true);
    const [ hint, setHint ] = useState("");
    // sets-up OpenAI configuration:
    const config = new Configuration({ apiKey: "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" });
    const openai = new OpenAIApi(config);
    // deletes "User-Agent" to avoid runtime errors:
    delete config.baseOptions.headers['User-Agent'];
    /**
     * @param {*} f (i.e. function)
     * @param {*} delay 
     * @returns
     * --> gives delay to certain functions.
     */
    const throttle = (f, delay) => {
        let lastCall = 0;
        return function (...args) {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                lastCall = now;
                f.apply(this, args);
            }
        };
    };
    /**
     * @param {*} e 
     * --> sends OpenAI request and fetches GPT feedback (also changes values for `correct` & `hint`).
     */
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const result = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: props.code,
                    },
                    {
                        role: "system",
                        content: `You are a computer science professor who is grading my code, and you grade with strict conditions (even one little syntax error is pointed out). You have this unit test case: ${props.expected} that should come from this code. In addition, please send the feedback in this JSON format: "correct", a true/false value if the code matches the unit test, and "hint" which gives the user a hint if their code is wrong (otherwise initialize this to an empty string). Please do not give any response other than the JSON.`,
                    },
                ],
                temperature: 0.1
            });
            const codeData = JSON.parse(result.data.choices[0].message.content);
            setCorrect(codeData.correct);
            setHint(codeData.hint);
        } catch (e) {
            throw new Error("An error occured in relation to OpenAI's API.", e);
        }
    }
    // gives 2000ms delay to each OpenAI request:
    const throttledSubmit = throttle(handleSubmit, 2000);
    // returns <CheckCode/> + <Feedback/> modules:
    return (
        <div>
            <form onSubmit={throttledSubmit}>
                <button type="submit" className="mt-3 px-4 py-2 rounded-lg font-semibold text-black dark:text-white bg-green-500 hover:bg-green-700 duration-200">Check</button>
            </form>
            <Feedback correct={correct} hint={hint}/>
        </div>
    );
}

/**
 * @param {correct, hint} props 
 * @returns <Feedback/>
 * --> creates module that displays feedback to the user.
 */
function Feedback(props) {
    // checks if user code is incorrect before creating module:
    if (!props.correct) {
        return (
            <div className="px-5 py-2 mt-5 mr-10 w-96 border-2 border-amber-500 rounded-md bg-amber-700">
            <p className="text-amber-500">⚠️ {props.hint}</p>
            </div>
        );
    } else {
        return null;
    }
}