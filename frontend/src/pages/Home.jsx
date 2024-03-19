import React from "react";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
const Home = () => {
  return (
    <div className="containerHome">
      <Header />
      <Navigation />
      <Calendar />
      <h1>page accueil</h1>

      <Footer />
    </div>
  );
};

export default Home;
