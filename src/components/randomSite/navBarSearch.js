import React from "react";
import "../navBar/navBar.scss";

const NavBarSearch = ({ getFilterList, input }) => {
  return (
    <div className="fade-in products-search">
      <div className="dropdown-container">
        <ul className="dropdown-list" id="nav-list">
          <div className="textfeild-wrapper">
            <input
              type="text"
              value={input}
              className={input ? "focused textfeild-box" : "textfeild-box"}
              onChange={(e) => getFilterList(e)}
            />
            <label className="textfeild-label">Search products</label>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBarSearch;
