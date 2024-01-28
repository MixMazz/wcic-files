import 'src/pages/Account.css';
import AccountNoUser from 'src/components/AccountDisplay/AccountNoUser';
import AccountLoggedIn from 'src/components/AccountDisplay/AccountLoggedIn';
import { useUserContext } from 'src/contexts/UserContext';

const Account = () => {
  const { loggedInUser } = useUserContext();

  return loggedInUser ? <AccountLoggedIn /> : <AccountNoUser />;
}

export default Account;
