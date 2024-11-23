import * as React from 'react';
import "./Header.css"

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <h1 className="header__link">SmartMed</h1>
            </div>
            <nav className="header__nav">
                <ul className="header__menu">
                    <li><a href="/schedule" className="header__link">Приемы</a></li>
                    <li><a href="/patient-list" className="header__link">Пациенты</a></li>
                    <li><a href="/patient-analysis" className="header__link">Анализы</a></li>
                </ul>
            </nav>
            <div className="header__profile">
                <button className="header__logout-btn" >Выйти</button>
            </div>
        </header>
    );
};

export default Header;