import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import './index.css';
import App from './App';
import QuizPage from "./components/QuizPage/QuizPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<App/>}>
                </Route>
                <Route path='/quiz' element={<QuizPage/>}>
                </Route>

            </Routes>

        </BrowserRouter>

    </React.StrictMode>
);

