import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="card" style={{ textAlign: 'center', padding: '2em' }}>
      Whoops!
      <br />
      {'Page not found.'}
      <br />
      <br />
      <button
        onClick={() => navigate('/')}
        className="highlightText"
        style={{ cursor: 'pointer' }}
      >
        Click here to return to the homepage
      </button>
    </div>
  );
}

export default NotFoundPage