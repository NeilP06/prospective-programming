import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import LessonsApp from "./pages/Lessons.App.js";
// imports Java practice-problem pages:
import JavaProblemOne from './pages/java-problems/1.java.js';
import JavaProblemTwo from './pages/java-problems/2.java.js';
import JavaProblemThree from './pages/java-problems/3.java.js';
import JavaProblemFour from './pages/java-problems/4.java.js';
import JavaProblemFive from './pages/java-problems/5.java.js';
import JavaProblemSix from './pages/java-problems/6.java.js';
import JavaProblemSeven from './pages/java-problems/7.java.js';
import JavaProblemEight from "./pages/java-problems/8.java.js";
import JavaProblemNine from "./pages/java-problems/9.java.js";
// imports Java lesson pages:
import JavaOne from "./pages/java/1.java.js";
import JavaTwo from "./pages/java/2.java.js";
import JavaThree from "./pages/java/3.java.js";
import JavaFour from "./pages/java/4.java.js";
import JavaFive from "./pages/java/5.java.js";
import JavaSix from "./pages/java/6.java.js";
import JavaSeven from "./pages/java/7.java.js";
// import ProspectiveProgramming learning hubs:
import PracticeApp from "./pages/Practice.App.js";
import RegistrationApp from "./pages/Registration.App.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "login",
    element: <RegistrationApp/>
  },
  {
    path: "lessons",
    element: <LessonsApp/>
  },
  {
    path: "practice",
    element: <PracticeApp/>
  },
  {
    path: "java-lesson-one",
    element: <JavaOne/>
  }, 
  {
    path: "java-lesson-two",
    element: <JavaTwo/>
  }, 
  {
    path: "java-lesson-three",
    element: <JavaThree/>
  }, 
  {
    path: "java-lesson-four",
    element: <JavaFour/>
  }, 
  {
    path: "java-lesson-five",
    element: <JavaFive/>
  },
  {
    path: "java-lesson-six",
    element: <JavaSix/>
  },
  {
    path: "java-lesson-seven",
    element: <JavaSeven/>
  },
  {
    path: "java-practice-one",
    element: <JavaProblemOne/>
  }, 
  {
    path: "java-practice-two",
    element: <JavaProblemTwo/>
  }, 
  {
    path: "java-practice-three",
    element: <JavaProblemThree/>
  }, 
  {
    path: "java-practice-four",
    element: <JavaProblemFour/>
  }, 
  {
    path: "java-practice-five",
    element: <JavaProblemFive/>
  }, 
  {
    path: "java-practice-six",
    element: <JavaProblemSix/>
  }, 
  {
    path: "java-practice-seven",
    element: <JavaProblemSeven/>
  }, 
  {
    path: "java-practice-eight",
    element: <JavaProblemEight/>
  },
  {
    path: "java-practice-nine",
    element: <JavaProblemNine/>    
  }
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);