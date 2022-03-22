import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
  };
  return (
    <div>
      <h1 style={{ marginBottom: 30, marginTop: 15 }}>Login page</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Enter name" />
        <MyInput type="password" placeholder="Enter password" />
        <MyButton>Login</MyButton>
      </form>
    </div>
  );
};

export default Login;
