import 'src/pages/Account.css';
import AccountLoggedIn from 'components/AccountDisplay/AccountLoggedIn';
import AccountNoUser from 'components/AccountDisplay/AccountNoUser';
import { useUserContext } from 'src/contexts/UserContext';

const Account = () => {
  const { loggedInUser } = useUserContext();

  return loggedInUser ? <AccountLoggedIn /> : <AccountNoUser />;
}

export default Account;
