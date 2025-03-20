import { useState } from 'react';
import { Link } from 'react-router-dom';

import profilePic from '/images/profilepic.jpg';

import Login from '../../Auth/Login/Login';
import Signup from '../../Auth/Signup/Signup';

import css from './NavigationBar.module.css';

const NavigationBar = () => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('auth') || false);
    const [auth, setAuth] = useState({
        closed: true,
        login: false,
        signup: false
    });

    const logoutHandler = () => {
        setLoggedIn(false);
        localStorage.removeItem("auth");
    };

    return (
        <nav className={css.navbar}>
            <div className={css.navbarInner}>
                {/* 🌟 Brand Name */}
                <Link to="/" className={css.brandName}>Foodie Loverz</Link>

                {/* 📌 Navigation Items */}
                <div className={css.rightSide}>
                    {loggedIn ? (
                        <>
                            <Link to="/add-restaurant" className={css.menuItem}>
                                Add Restaurant
                            </Link>
                            <Link to="/user/profile" className={css.menuItem}>
                                Profile
                            </Link>
                            <Link to="/user/settings" className={css.menuItem}>
                                Settings
                            </Link>
                            <div className={css.menuItem} onClick={logoutHandler}>
                                Logout
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={css.menuItem} onClick={() => setAuth({ closed: false, login: true, signup: false })}>
                                Log in
                            </div>
                            <div className={css.menuItem} onClick={() => setAuth({ closed: false, login: false, signup: true })}>
                                Sign up
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 🔐 Login & Signup Modals */}
            <div className={css.modals}>
                {auth.login && <Login setAuth={setAuth} setLoggedIn={setLoggedIn} />}
                {auth.signup && <Signup setAuth={setAuth} />}
            </div>
        </nav>
    );
};

export default NavigationBar;
