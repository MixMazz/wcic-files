import * as UserApi from 'src/network/user_api';
import GridCritterSelector from 'src/components/AccountDisplay/GridCritterSelector';
import { useUserContext } from 'src/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const AccountLoggedIn = () => {
  const { loggedInUser } = useUserContext();
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate('/');
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
          <GridCritterSelector
            type="bug"
            changeCritterData={UserApi.changeCritterData}
          />
          <GridCritterSelector
            type="fish"
            changeCritterData={UserApi.changeCritterData}
          />
          <GridCritterSelector
            type="sealife"
            changeCritterData={UserApi.changeCritterData}
          />
        </div>
      </div>
    </>
  );
}

export default AccountLoggedIn;
