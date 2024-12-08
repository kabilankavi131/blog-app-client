import React from "react";

const HamburgerMenu: React.FC = () => (
    <div className="menu" id="menu">
        <ul>
            <li>Home</li>
            <li onClick={() => console.log("Dark Mode")}>Dark Mode</li>
            <li>Contact</li>
            <li>About</li>
            <li>Careers</li>
        </ul>
    </div>
);

export default HamburgerMenu;
