import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'src/App.css';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Account from 'src/pages/Account';
import NotFoundPage from 'src/pages/NotFoundPage';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import Banner from 'src/components/Banner';
import Header from 'src/components/Header';

function App() {
  return (
    <>
      <Banner />
      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
