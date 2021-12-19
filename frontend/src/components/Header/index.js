import React from "react";
import "./style.css";

const Header = ({rolling})=>{



    return(
        <header className={rolling? 'black':''}>
            <div className="header--logo">
                <a href="/" className="logo--text">devflix</a>
            </div>
            <div className="header--user">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
            </div>
        </header>
    );
}
export default Header