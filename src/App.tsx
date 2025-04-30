<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SlidingBanner from "./Components/SlidingBanner";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SlidingBanner />
    </>
=======
// import "./App.css";
import ReciepeDetails from "./Pages/ReciepeDetails";

import Home from "./Pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<ReciepeDetails />} />
      </Routes>
      <Footer />
    </Router>
>>>>>>> e27f97d36af37c05225ae27aaa6af825bda62928
  );
}

export default App;
