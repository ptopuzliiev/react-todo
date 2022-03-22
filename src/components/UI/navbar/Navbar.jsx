import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { useContext } from 'react';
import { AuthContext } from '../../../context';

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <MyButton onClick={() => setIsAuth(false)}>Log out</MyButton>
      <Link className="navbar__links" to="/about">
        About
      </Link>
      <Link className="navbar__links" to="/posts">
        Posts
      </Link>
    </nav>
  );
};

export default Navbar;
