import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Header from "../components/Header";
import Expert from "./Expert";

const Router = () => {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/expert" element={<Expert/>}/>
            </Routes>
        </>
    )
}

export default Router
