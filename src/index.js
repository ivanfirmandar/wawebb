import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css';
import Manual from './Container/Manual/Manual'
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {path:"/", element: <Manual />}
])

root.render(
    <RouterProvider router={router}/>
);

reportWebVitals();
