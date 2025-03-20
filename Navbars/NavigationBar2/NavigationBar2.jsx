import { useState } from 'react';
import { Link } from 'react-router-dom';

import menuBar from '/icons/menu.png';
import profilePic from '/images/profilepic.jpg';

import SearchBar from '../../../utils/SearchBar/SearchBar';

import css from './NavigationBar2.module.css';

const NavigationBar = ({ toogleMenu, setToggleMenu }) => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('auth') || false);

    const logoutHandler = () => {
        setLoggedIn(false);
        localStorage.removeItem("auth");
    };

    return (
        <nav className={css.navbar}>
            {/* Mobile Menu Toggle */}
            <img
                className={css.menuBar}
                src={menuBar}
                alt="Menu"
                onClick={() => setToggleMenu(prev => !prev)}
                aria-label="Toggle menu"
            />
            <div className={css.navbarInner}>
                {/* Left Side: Brand Name */}
                <div className={css.leftSide}>
                    <Link to="/" className={css.appTxt}>FoodieLoverz</Link>
                </div>

                {/* Search Bar (Hidden on small screens) */}
                <div className={css.searchBar}>
                    <SearchBar />
                </div>

                {/* Right Side: Navigation Items */}
                <div className={css.rightSide}>
                    <Link to="/restaurant/add" className={css.navItem}>Add Restaurant</Link>
                    {loggedIn ? (
                        <>
                            <Link to="/user/profile" className={css.navItem}>Profile</Link>
                            <Link to="/user/settings" className={css.navItem}>Settings</Link>
                            <div className={css.navItem} onClick={logoutHandler}>Logout</div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={css.navItem}>Log in</Link>
                            <Link to="/signup" className={css.navItem}>Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
