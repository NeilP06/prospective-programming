import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import LessonsApp from "./pages/Lessons.App.js";
import JavaOne from "./pages/java/1.java.js";
import JavaProblemOne from './pages/java-problems/1.java';
import JavaProblemTwo from './pages/java-problems/2.java';
import JavaProblemThree from './pages/java-problems/3.java';
// import JavaProblemTwo from './pages/java-problems/2.java';
// import JavaProblemTwo from './pages/java-problems/2.java';

import JavaTwo from "./pages/java/2.java.js";
import JavaThree from "./pages/java/3.java.js";
import JavaFour from "./pages/java/4.java.js";
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
  // {
  //   path: "java-practice-four",
  //   element: <JavaProblemFour/>
  // }, {
  //   path: "java-practice-five",
  //   element: <JavaProblemFive/>
  // }
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);