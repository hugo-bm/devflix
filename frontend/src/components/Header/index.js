import React from "react";
import "./style.css";
import logo from '../../assets/avatar-devflix.png';

const Header = ({rolling})=>{



    return(
        <header className={rolling? 'black':''}>
            <div className="header--logo">
                <a href="/" className="logo--text">devflix</a>
            </div>
            <div className="header--user">
                <img src={logo} alt="avatar logo"/>
            </div>
        </header>
    );
}
export default Header