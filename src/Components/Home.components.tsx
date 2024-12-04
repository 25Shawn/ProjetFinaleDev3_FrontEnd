//import React from "react";
import Navbar from "./NavBar.components";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-20 max-w-4xl mx-auto p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Bienvenue sur votre application de suivi de fitness
        </h1>
        <p className="text-center text-gray-600 text-sm md:text-base lg:text-lg">
          Suivez vos séances, atteignez vos objectifs et restez motivé !
        </p>
      </div>
    </div>
  );
};

export default Home;
