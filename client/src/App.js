import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import SplashNav from './components/SplashNav';
import SplashMain from './components/SplashMain';
import Homepage from './components/HomePage';
import NotFound from './components/NotFound';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './components/Loading';
import Unauthorized from './components/Unauthorized';

const App = () => {

  const {isAuthenticated, isLoading} = useAuth0();

  return (
    <>
    <Router>
        <SplashNav/>
        <Routes>
            <Route path="/" element={<SplashMain/>} />
            <Route path="/about" element={<About/>} /> 
        {isLoading ?
          <Route path="/home" element={<Loading/>} />
        : !isAuthenticated ? 
          <Route path="/home" element={<Unauthorized/>}/>
        :
          <Route path="/home" element={<Homepage/>} /> 
          }
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
