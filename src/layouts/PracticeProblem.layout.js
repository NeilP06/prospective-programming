import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-twilight";
import AceEditor from "react-ace";
import Axios from "axios";
import Footer from "../elements/Footer.element.js";
import NavigationBar from '../elements/NavigationBar.element.js';
import React, { useEffect, useState } from "react";
import Warning from "../elements/Warning.element.js";
const { Configuration, OpenAIApi } = require("openai");

/**
 * @param {*} props 
 * @returns <PracticeModule/>
 * --> creates a layout page with all modules necessary to display practice problems.
 */
export default function PracticeModule(props) {
    // adjusts background theme for system preference:
    document.body.classList.add("bg-slate-300", "dark:bg-gray-900"); 
    /**
     * @param {*} data
     * --> callback function to receive data from child.
     */
    const handleParentData = (data) => {
        if (props.onSendData && typeof props.onSendData === "function") {
            props.onSendData(data);
        }
    }
    // returns <PracticeModule/> page if page width is more than 900 pixels:
    if (window.innerWidth > 900) {
        return (
            <div>
                <NavigationBar/>
                <div className="mt-20">
                    <div className="text-center">
                        <p className="mb-12 mx-20 font-bold text-6xl text-black dark:text-white">{props.practiceId} "{props.practiceName}"</p>
                        <p className="mb-5 font-semibold text-4xl text-gray-700 dark:text-slate-300">🤔 Practice Problem Prompt</p>
                        <p className="mx-10 flex justify-center font-md text-lg leading-9 text-gray-800 dark:text-slate-200"><TextSyntax description={props.practiceContent}/></p>     
                        <p className="mt-16 mb-5 font-semibold text-4xl text-gray-700 dark:text-slate-300">⌨️ Practice Problem Code</p>                   
                    </div>
                    <div className="flex justify-center">
                        <IDE expected={props.expected} prompt={props.prompt} onSendData={handleParentData} className="w-full"/>                        
                    </div>
                </div>
                <Footer/>
            </div>
        );
    } else {
        return (
            <Warning/>
        );
    }
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
    /**
     * @param {*} data 
     * --> callback function to receive data from child.
     */
    const handleParentData = (data) => {
        console.log("Data received by the <IDE/> module:", data);
        if (props.onSendData && typeof props.onSendData === "function") {
            props.onSendData(data);
        }
    };
    // returns <AceEditor/> + <CheckCode/> modules:
    return (
        <div>
            <p className="mb-5 font-md text-center text-md text-gray-600 dark:text-slate-400">Click the "Check" button when done. Wait for results to load.</p>
            <AceEditor
               className="mx-10 rounded-xl border-2 border-white dark:border-gray-800"
               fontSize={14}
               height="300px"
               highlightActiveLine={true}
               mode="java"
               name="java-editor"
               onChange={(newContent) => setEditorContent(newContent)}
               onSendData={handleParentData}
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
            <div className="flex justify-center text-center">
                <CheckCode code={editorContent} expected={props.expected} onSendData={handleParentData}/>
            </div>
        </div>
    );   
}

/**
 * @param {code, expected} props
 * @returns <CheckCode/>
 * --> creates module with unit test checking capabilities.
 */
function CheckCode(props) {
    // variables for GPT-3.5/compiler feedback to export:
    const [ correct, setCorrect ] = useState(null);
    const [ hint, setHint ] = useState("");
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // sends a POST request to the compiler endpoint to check answers:
        Axios.post(`http://localhost:8000/compile`, {
            // sends the code written as a parameter:
            code: props.code,
            // if valid, will also send an input to check the code (TO-DO: make sure that the compiler will accept input next time):
            input: "",
        }).then((res) => {
            if (res.data.output) {
                // checks if code is correct and will give a final assignment as a result:
                console.log(res.data.output === props.expected + "\n");
                const isCorrect = res.data.output === props.expected + "\n";
                setCorrect(isCorrect);
                if (isCorrect === false) {
                    // calls GPT-3.5 feedback function and sets `hint` to the feedback returned:
                    aiFeedback(props.code, props.expected).then((aiHint) => {
                        setHint(aiHint);
                    }).catch((error) => {
                        console.error("An error occurred in relation to compiler endpoint:", error);
                    });
                }
                // prints compiler feedback to the console for potential debugging issues:
                console.log("TASK EXECUTED: ", res.data.output);
            } else {
                // calls GPT-3.5 feedback function and sets `hint` to the feedback returned:
                aiFeedback(props.code, props.expected).then((aiHint) => {
                    setHint(aiHint);
                }).catch((error) => {
                    console.error("An error occurred in relation to compiler endpoint:", error);
                });
                // prints the compiler feedback to the console if there is an error:
                console.log("TASK ERROR: ", res.data.error);
            }
        });
    }
    // gives 2000ms delay to each OpenAI/compiler request:
    const throttledSubmit = throttle(handleSubmit, 2000);
    /**
     * @param {*} data 
     * --> callback function to receive data from child.
     */
    const handleParentData = (data) => {
        console.log("Data received by the <CheckCode/> module:", data);
        if (props.onSendData && typeof props.onSendData === "function") {
            props.onSendData(data);
        }
    };
    // returns <CheckCode/> + <Feedback/> modules:
    return (
        <div>
            <form onSubmit={throttledSubmit}>
                <button type="submit" className="mt-3 px-4 py-2 rounded-lg font-semibold text-black dark:text-white bg-green-500 hover:bg-green-700 duration-200">Check</button>
            </form>
            <Feedback correct={correct} hint={hint} onSendData={handleParentData}/>
        </div>
    );
}

/**
 * @param {*} userCode 
 * @param {*} expected 
 * @returns codeData.hint
 * --> gives GPT-3.5 feedback for an incorrect entry.
 */
async function aiFeedback(userCode, expected) {
    // sets-up OpenAI configuration:
    const config = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    const openai = new OpenAIApi(config);
    // deletes "User-Agent" to avoid runtime errors:
    delete config.baseOptions.headers['User-Agent'];
    // uses GPT-3.5 to give feedback back to the user (only in cases where the user code is wrong):
    try {
        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: userCode,
                },
                {
                    role: "system",
                    content: `You are a computer science professor who is grading my Java code, and you grade with strict conditions (even one little syntax error is pointed out). You have this unit test case: ${expected} that should come from this code. In addition, please send the feedback in this JSON format: "correct", a true/false value if the code matches the unit test, and "hint" which gives the user a hint if their code is wrong (otherwise initialize this to an empty string). Remember to ignore all comments. Please do not give any response other than the JSON.`,
                },
            ],
            // minimizes the variance of GPT-3.5 feedback:
            temperature: 0.1
        });
        // saves feedback as a JSON variable for further manipulation:
        const codeData = JSON.parse(result.data.choices[0].message.content);
        // returns the GPT-3.5 feedback in terms of the hint it provides:
        return codeData.hint;
    } catch (e) {
        throw new Error("An error occured in relation to OpenAI's API.", e);
    }
}

/**
 * @param {correct, hint} props 
 * @returns <Feedback/>
 * --> creates module that displays feedback to the user.
 */
function Feedback(props) {
    /**
     * @param {*} data 
     * --> callback function to receive data from child.
     */
    const handleParentData = (data) => {
        console.log("Data received by the <Feedback/> module:", data);
        if (props.onSendData && typeof props.onSendData === "function") {
            props.onSendData(data);
        }
    };
    // checks if user code is incorrect before creating module:
    // checks if user code is incorrect before creating module:
    if (props.correct === false) {
        if (!props.hint) {
            // returns a loading message when awaiting for GPT feedback:
            return (
                <div className="px-7 py-2 mt-5 w-[500px] border-2 border-neutral-400 rounded-md bg-neutral-700">
                    <p className="text-neutral-400">⏳ AI does not have any feedback for the moment. Please wait or make changes to your code.</p>
                </div>
            );
        } else {
            // returns GPT feedback for the user to learn and make changes:
            return (
                <div className="px-7 py-2 mt-5 w-[500px] border-2 border-amber-500 rounded-md bg-amber-700">
                    <p className="text-amber-500">⚠️ {props.hint}</p>
                </div>
            );
        }
    } else if (props.correct === true) {
        // creates the chain of callbacks to send data back to parent:
        const sendDataToParent = () => {
            const dataToSend = "Successful code submission";
            handleParentData(dataToSend);
        };
        sendDataToParent();
        return (
            <div className="px-7 py-2 mt-5 flex justify-center w-44 border-2 border-emerald-500 rounded-md bg-emerald-700">
                <p className="text-emerald-500">✅ Success!</p>
            </div>
        );
    }
}

/**
 * @param {description} props 
 * @returns <TextSyntax/>
 * --> creates module that formats raw content text.
 */
function TextSyntax(props) {
    // initializes variables that will later be used for formatting purposes:
    const [text, setText] = useState([]);
    // preset IDE theme for devices with light-mode enabled:
    var editorTheme = "github";
    // adjusts IDE theme to account for devices with dark-mode:
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        editorTheme = "twilight";
    }
    // formats inputted text with line breaks and <AceEditor/> modules:
    useEffect(() => {
        if (typeof props.description === "string") {
            // replaces all tildes with a line break:
            const processedDescription = props.description.replace(/~/g, '<br/>');
            // splits all the texts through backticks:
            const segments = processedDescription.split("`");
            /**
             * @param {segment, index}
             * @return 
             * --> processes a special line of code and renders it into a IDE display.
             */
            const processedSegments = segments.map((segment, index) => {
                // if the index is odd, it renders an <AceEditor/> module with the segment code:
                if (index % 2 === 1) {
                    return (
                        <AceEditor
                            className="mt-3 mb-3 mr-10 rounded-sm border-2 border-white dark:border-gray-800"
                            fontSize={14}
                            height={calculateEditorHeight(segment)}
                            highlightActiveLine={false}
                            key={index}
                            mode="java"
                            name="java-editor"
                            readOnly={true}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                            showGutter={true}
                            showPrintMargin={false}
                            theme={editorTheme}
                            width="100%"
                            value={segment}
                        />
                    );
                } else {
                    /**
                     * @note find another line-break-checking method to prevent future problems.
                     * --> returns formatted text excluding the editors.
                     */
                    return (
                        <span key={index} dangerouslySetInnerHTML={{__html: segment}}/>
                    );
                }
            });
            // updates the text with the separated text segments for future use:
            setText(processedSegments);
        }
    }, [editorTheme, props.description]);
    /** 
     * @param {*} content 
     * @returns 
     * --> calculates the height for a particular <AceEditor/> module based upon # of lines.
     */
    const calculateEditorHeight = (content) => {
        // calculates the # of lines inside the IDE content:
        const numLines = content.split("\n").length;
        // preset line height is set at 25:
        const lineHeight = 22;
        // returns the height based on the # of lines + line height:
        return `${numLines * lineHeight}px`;
    };
    // returns the formatted text back to the parent function:
    return (
        <div className="w-[500px]">
            {text}
        </div>
    );
}