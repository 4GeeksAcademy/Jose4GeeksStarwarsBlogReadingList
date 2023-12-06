// layout.js
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";


import Home from "./views/home";
import Demo from "./views/demo"; // Assuming Demo is exported as default from its file
import Single from "./views/single";
import Details from "./views/Details";
import Favorites from "./views/favorites";
import injectContext from "./store/appContext";

import Navbar from "./component/navbar";

const Layout = injectContext(() => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="/details/:category/:id" element={<Details />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                
            </BrowserRouter>
        </div>
    );
});

export default Layout;
