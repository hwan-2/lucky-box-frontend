import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./Home";

const router = () => {
    return (
        <>
            {
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            }
        </>
    )
}

export default router
