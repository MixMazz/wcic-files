import GridCritterSelector from 'components/AccountDisplay/GridCritterSelector';
import { useUserContext } from 'src/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AccountLoggedIn = () => {
  const { loggedInUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/');
    }
  }, [])

  if (!loggedInUser) {
    return null;
  }
  return (
    <>
      <div className='headerCard'>
        <h2>Welcome, <span className='highlightText'>{loggedInUser.name}</span>!</h2>
        <p>Use this page to save your current collections!</p>
        <p>Click on the critters you’ve obtained or donated, then <span className='highlightText'>save</span> your selections.</p>
        <p>Manage your Blathers donations or just track your missing creatures.</p>
      </div>
      <div className="allSelectors">
        <div className="selectorFrame">
          <GridCritterSelector type="bug" />
          <GridCritterSelector type="fish" />
          <GridCritterSelector type="sealife" />
        </div>
      </div>
    </>
  );
}

export default AccountLoggedIn;
