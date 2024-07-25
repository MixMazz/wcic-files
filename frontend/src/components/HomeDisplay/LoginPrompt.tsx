import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
  const navigate = useNavigate();
  return (
    <div id="loginPromptMissing" className="card shadow">
      <p className="missingLoginTitle">Oops!</p>
      <button onClick={() => navigate('login')} className="shadow-md">Login for free</button>
      <p className="missingLoginDek">{'to keep track of which bugs, fishes, and sea creature you\'re missing!'}</p>
    </div>
  );
}

export default LoginPrompt;
