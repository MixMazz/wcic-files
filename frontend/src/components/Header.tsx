import { useNavigate } from 'react-router-dom';
import 'src/components/Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <h2 id="mainHeader" onClick={() => { navigate('/'); }}>
      <img src="./header.png" id="headerImg" alt="Title: What can I catch?" />
    </h2>
  );
}

export default Header;
