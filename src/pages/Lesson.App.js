import { createClient } from "@supabase/supabase-js";
import LessonModule from "../layouts/Lesson.layout.js";
import React, { useEffect, useState } from "react";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

export default function LessonExample() {
    const [ expected, setExpected ] = useState("");
    const [ lessonContent, setLessonContent ] = useState("");
    const [ lessonId, setLessonId ] = useState("");
    const [ lessonName, setLessonName ] = useState("");
    const [ prompt, setPrompt ] = useState("");
    useEffect(() => {
        const loadData = async(e) => {
            const { data, error} = await supabase.from("java-lessons").select().eq("id", 1);
            if (error) {
                throw new Error("An error occured in relation to Supabase fetch.");
            }
            setExpected(data[0].expectedOutput);
            setLessonContent(data[0].content);
            setLessonId(data[0].lessonId);
            setLessonName(data[0].name);
            setPrompt(data[0].lessonProblem);
        }
        loadData();
    }, []);
    if (prompt === "") {
        return (
            <p className="mt-5 ml-5 font-semibold">Content is loading... </p>
        );
    }
    return (
        <div>
            <LessonModule expected={expected} lessonContent={lessonContent} lessonId={lessonId} lessonName={lessonName} prompt={prompt}/>
        </div>
    );
}