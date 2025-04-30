// import React from 'react';
// import { FaSearch, FaShoppingCart } from 'react-icons/fa';
// import './Header.css';

// const Header: React.FC = () => {
//   return (
//     <div className="header-container">
//       <div className="header">
//         <h2 className="logo">Callie's Kitchen</h2>

//         <ul className="nav-links">
//           <li><a href="#" className="active">Home</a></li>
//           <li><a href="#">Services</a></li>

//           <li className="dropdown">
//             <a href="#">Tags ▾</a>
//             <ul className="dropdown-content">
//               <li><a href="#">Breakfast</a></li>
//               <li><a href="#">Lunch</a></li>
//               <li><a href="#">Dinner</a></li>
//             </ul>
//           </li>

//           <li className="dropdown">
//             <a href="#">Types ▾</a>
//             <ul className="dropdown-content">
//               <li><a href="#">Veg</a></li>
//               <li><a href="#">Non-Veg</a></li>
//               <li><a href="#">Vegan</a></li>
//             </ul>
//           </li>

//           <li className="dropdown">
//             <a href="#">Cuisine ▾</a>
//             <ul className="dropdown-content">
//               <li><a href="#">Indian</a></li>
//               <li><a href="#">Italian</a></li>
//               <li><a href="#">Mexican</a></li>
//             </ul>
//           </li>

//           <li><a href="#">Contact</a></li>
//         </ul>

//         <div className="header-icons">
//           <FaSearch className="icon" />
//           <FaShoppingCart className="icon" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import {FaUser, FaSearch, FaShoppingCart} from "react-icons/fa";
import "./Header.css";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container-navbar">
      <div className="navbar">
        <h3 className="navbar-title">
          <a id="title" href="/" style={{textDecoration: "none"}}>
            Best Receipe
          </a>
        </h3>

        <ul className="navbar-links">
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li className="dropdown">
            <a href="#">Tags </a>
            <ul className="dropdown-menu">
              <li>
                <a href="#">Breakfast</a>
              </li>
              <li>
                <a href="#">Lunch</a>
              </li>
              <li>
                <a href="#">Dinner</a>
              </li>
            </ul>
          </li>

          <li className="dropdown">
            <a href="#">Cuisine </a>
            <ul className="dropdown-menu">
              <li>
                <a href="#">Indian</a>
              </li>
              <li>
                <a href="#">Italian</a>
              </li>
              <li>
                <a href="#">Mexican</a>
              </li>
            </ul>
          </li>

          <li className="mega-dropdown">
            <a href="#">Types </a>
            <div className="mega-menu">
              <div className="mega-column">
                <h4>Category</h4>
                <a href="#">About Us</a>
                <a href="#">Blog Post</a>
                <a href="#">Receipe Post</a>
                <a href="#">Contact</a>
                <a href="#">Elements</a>
              </div>
            </div>
          </li>
        </ul>

        <div className="navbar-user">
          <FaSearch className="icon" />
          <FaShoppingCart className="icon" />
          <FaUser className="icon user-icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
