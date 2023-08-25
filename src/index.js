import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {
  RouterProvider
} from "react-router-dom";
import { router } from './routes';
import { app } from './firebaseConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
