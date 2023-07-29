import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
// import LessonsApp from "./pages/LessonsApp.js";
// import PracticeApp from "./pages/PracticeApp.js";
import RegistrationApp from "./pages/RegistrationApp.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "login",
    element: <RegistrationApp/>
  },
  // {
  //   path: "lessons",
  //   element: <LessonsApp/>
  // },
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