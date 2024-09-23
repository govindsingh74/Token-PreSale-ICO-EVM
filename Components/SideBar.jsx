import React from "react";

const SideBar = () => {
  return (
    <aside className="slide-bar">
      <div className="close-mobile-menu">
        <a href="/" className="tx-close"></a>
      </div>
      <nav className="side-mobile-menu">
        <a href="/" className="header__logo mb-30">
          <img src="assets/img/logo/logo.svg" alt="" srcSet="" />
        </a>
        <div className="header-mobile-search">
          <form action="#" role="search">
            <input type="text" placeholder="Search Keywords" />
            <button type="submit">
              <i className="ti-search" />
            </button>
          </form>
        </div>
        <ul id="mobile-menu-active">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about" className="scrollspy-btn">About</a>
          </li>
          <li>
            <a href="#roadmap" className="scrollspy-btn">Roadmap</a>
          </li>
          <li>
            <a href="#team" className="scrollspy-btn">Team</a>
          </li>
          <li>
            <a href="#!" className="">Blog</a>
          </li>
          <li>
            <a href="#!" className="">Connect</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
