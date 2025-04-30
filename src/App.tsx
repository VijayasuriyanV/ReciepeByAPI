// import "./App.css";
import ReciepeDetails from "./Pages/ReciepeDetails";

import Home from "./Pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SlidingBanner from "./Components/SlidingBanner";

function App() {
  return (
    <Router>
      <Header />
      {/* <SlidingBanner /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<ReciepeDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
