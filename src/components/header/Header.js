import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import "./Header.css";
import {AuthContext} from "../../context/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";


const Header = ({headerCounter}) => {

    const {isAuth, logout} = useContext(AuthContext);


    return (
        <>
            <header className="nav-outer-container">
                <nav className="nav-inner-container">
                        <ul id="menu-pages">
                            <li>
                                <Link to="/" className="link">HOME</Link>
                            </li>
                            <li className="dropdown">
                                <Link to="/seeds" className="link">SEED COLLECTION</Link>
                            </li>
                            <li className="dropdown">
                                <p className="dropdown-option">TIPS & TRICKS</p>
                                <div className="dropdown-content">
                                    <Link to="/grow" className="link">KWEKEN</Link>
                                    <Link to="/nutrition" className="link">VOEDING</Link>
                                </div>
                            </li>
                            <li>
                                <Link to="/merchandising" className="link">
                                    MERCHANDISING
                                </Link>
                            </li>
                            <li>
                                <Link to="/aboutus" className="link">
                                    ABOUT US
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="link">
                                    CONTACT
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="inner container menu-icons-container">
                        {!isAuth ?
                            <>
                                <ul className="menu-icons">
                                    <li className="dropdown">
                                        <button className="dropdown-button"><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/></button>
                                        <div className="dropdown-content">
                                            <input className="search-bar" type="text" placeholder="Search..."/>
                                        </div>
                                    </li>
                                    <li className="dropdown">
                                        <p className="dropdown-option"><FontAwesomeIcon icon={faGlobe} className="icon"/></p>
                                        <div className="dropdown-content">
                                            <Link to="/grow" className="link">🇳🇱</Link>
                                            <Link to="/nutrition" className="link">🇬🇧</Link>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/login" className="link">
                                            <FontAwesomeIcon icon={faUser} className="icon"/>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/order" className="link">
                                            <Badge overlap="rectangular" className="amount" badgeContent={headerCounter}>
                                                <FontAwesomeIcon icon={faShoppingCart} className="icon-cart"/>{" "}
                                            </Badge>
                                        </Link>
                                    </li>
                                </ul>
                            </>
                            :
                            <>
                            <ul className="menu-icons">
                                <li className="dropdown">
                                    <button className="dropdown-button"><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/></button>
                                    <div className="dropdown-content">
                                        <input className="search-bar" type="text" placeholder="Search..."/>
                                    </div>
                                </li>
                                <li className="dropdown">
                                    <p className="dropdown-option"><FontAwesomeIcon icon={faGlobe} className="icon"/></p>
                                    <div className="dropdown-content">
                                        <Link to="/grow" className="link">🇳🇱</Link>
                                        <Link to="/nutrition" className="link">🇬🇧</Link>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/profile" className="link">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">
                                        <span onClick={logout}>Uitloggen</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/order" className="link">
                                        <Badge overlap="rectangular" className="amount" badgeContent={headerCounter}>
                                            <FontAwesomeIcon icon={faShoppingCart} className="icon-cart"/>{" "}
                                        </Badge>
                                    </Link>
                                </li>
                            </ul>
                            </>
                        }
                    </nav>

            </header>
        </>


    );
};

export default Header;