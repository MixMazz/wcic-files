import { useNavigate } from 'react-router-dom';

const AccountNoUser = () => {
  const navigate = useNavigate();

  return (
    <div id='noUserContainer'>
      Whoops!<br />
      You need to be logged in to access this page.<br /><br />
      <span onClick={() => navigate('/')} className='goToHome'>Go back </span>
      to the home page or
      <span onClick={() => navigate('../login')} className='clickToLogin'> click here to login</span>.
    </div>
  );
}

export default AccountNoUser;
