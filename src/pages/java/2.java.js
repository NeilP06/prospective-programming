import { createClient } from "@supabase/supabase-js";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import LessonModule from "../../layouts/Lesson.layout.js";
import React, { useEffect, useState } from "react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("An error occured in relation to Clerk: no key found.");
}
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

export default function JavaOne() {
    const [ expected, setExpected ] = useState("");
    const [ lessonContent, setLessonContent ] = useState("");
    const [ lessonId, setLessonId ] = useState("");
    const [ lessonName, setLessonName ] = useState("");
    const [ prompt, setPrompt ] = useState("");

    useEffect(() => {
        const loadData = async(e) => {
            const { data, error} = await supabase.from("java-lessons").select().eq("id", 2);
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
        <ClerkProvider publishableKey={key}>
            <ChangeStatus/>
            <LessonModule expected={expected} lessonContent={lessonContent} lessonId={lessonId} lessonName={lessonName} prompt={prompt}/>
        </ClerkProvider>
    );
}

function ChangeStatus() {
    const { user } = useUser();
    useEffect(() => {
      if (user) {
        const loadData = async () => {
          const { error } = await supabase.from("users").update({ java_two: "In Progress" }).eq("userId", user.id);
          if (error) {
            throw new Error("An error occurred in relation to Supabase fetch.");
          }
        };
        loadData();
      }
    }, [user]);
}