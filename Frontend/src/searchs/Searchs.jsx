import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";

const Searchs = () => {
    return (
    <div>
        <Navbar />
        <div className=" min-h-screen">
            <Search/>
        </div>
        <Footer />
    </div>
    )
}

export default Searchs;
