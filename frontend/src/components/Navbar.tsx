import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import 'src/components/Navbar.css';
import { useUserContext } from 'src/contexts/UserContext';
import * as UserApi from 'src/network/user_api';

const UserButtons: React.FC<{
  gotoAccount: () => void,
  logout: () => void
}> = ({ gotoAccount, logout }) => (
  <>
    <span onClick={logout} className="logoutText">Log Out</span>
    <button onClick={gotoAccount} className="primaryButtonAlt shadow">My Account</button>
  </>
);

const SignUpButtons: React.FC<{ navigate: NavigateFunction }> = ({ navigate }) => (
  <>
    <span onClick={() => navigate('/login', { state: { isSigningUp: false } })} className="loginText">Log In</span>
    <button onClick={() => navigate('/login', { state: { isSigningUp: true } })} className="primaryButtonAlt shadow">Sign Up</button>
  </>
);

const Navbar = () => {
  const { loggedInUser, onLogoutSuccessful } = useUserContext();
  const navigate = useNavigate();

  const gotoAccount = () => {
    navigate('/account');
  };

  const logout = async () => {
    await UserApi.logout();
    onLogoutSuccessful();
    navigate('/');
  };

  return (
    <div id="Navbar">
      <div className="navbarContainer">
        <div className="accountContainer">
          {
            loggedInUser
              ? <UserButtons gotoAccount={gotoAccount} logout={logout} />
              : <SignUpButtons navigate={navigate} />
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
