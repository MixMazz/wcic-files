import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Navbar from 'components/Navbar';
import Account from 'pages/Account';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFoundPage from 'pages/NotFoundPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

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
