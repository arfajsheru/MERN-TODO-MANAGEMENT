import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-white">404</h1>
                <p className="text-2xl md:text-3xl text-white mt-4">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <p className="text-md md:text-lg text-white mt-2">
                    It seems like you've lost your way.
                </p>
                <Link to="/" className="mt-6 inline-block px-6 py-3 bg-white text-purple-600 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
