import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import LessonsApp from "./pages/Lessons.App.js";
import JavaOne from "./pages/java/1.java.js";
import JavaTwo from "./pages/java/2.java.js";
import JavaThree from "./pages/java/3.java.js";
// import PracticeApp from "./pages/Practice.App.js";
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
    path: "java-lesson-one",
    element: <JavaOne/>
  }, {
    path: "java-lesson-two",
    element: <JavaTwo/>
  }, {
    path: "java-lesson-three",
    element: <JavaThree/>
  },
  // {
  //   path: "practice",
  //   element: <PracticeApp/>
  // },
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);