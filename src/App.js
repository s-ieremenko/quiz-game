import React from 'react'
import {
    Link
} from 'react-router-dom'
import './App.css';

function App() {
    return (
        <div className='main-container'>
            <div className='app-container'>
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <Link to='/quiz'>Start quiz</Link>

            </div>
        </div>

    );
}

export default App;
