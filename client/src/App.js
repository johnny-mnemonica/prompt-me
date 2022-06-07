import styled from 'styled-components'
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import NavBar from './components/NavBar';
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
    <GlobalStyles/>
    <Container>
    <Router>
        <NavBar/>
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
    </Container>
    </>
  );
}

const Container = styled.div`
width: 100vw;
height: 100vh;
background: rgb(227,196,159);
background: radial-gradient(circle, rgba(227,196,159,1) 8%, rgba(186,241,244,1) 65%, rgba(252,210,70,1) 100%);
`

export default App;
