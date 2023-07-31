import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import LessonsExample from "./pages/Lesson.App.js";
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
    element: <LessonsExample/>
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