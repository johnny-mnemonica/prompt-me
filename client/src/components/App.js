import styled from 'styled-components'
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import SplashMain from './SplashMain';
import Homepage from './HomePage';
import NotFound from './NotFound';
import { useAuth0 } from "@auth0/auth0-react";
import Unauthorized from './Unauthorized';
import CreatePost from './CreatePost';
import Confirmation from './Confirmation';
import Profile from './Profile';
import Search from './Search';
import LoadingSpinner from './LoadingSpinner';
import DummyProfile from './DummyProfile';

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
        {isLoading ?
          <>
          <Route path="/home" element={<LoadingSpinner/>} />
          <Route path="/create-post" element={<LoadingSpinner/>} />
          <Route path="/create-post/success" element={<LoadingSpinner/>} />
          <Route path="/profile/:id" element={<LoadingSpinner/>} />
          <Route path="/search" element={<LoadingSpinner/>} />
          <Route path="/dummyprofile/:id" element={<LoadingSpinner/>} />
          </>
        : !isAuthenticated ? 
          <>
          <Route path="/home" element={<Unauthorized/>}/>
          <Route path="/create-post" element={<Unauthorized/>}/>
          <Route path="/create-post/success" element={<Unauthorized/>}/>
          <Route path="/profile/:id" element={<Unauthorized/>}/>
          <Route path="/search" element={<Unauthorized/>} />
          <Route path="/dummyprofile/:id" element={<Unauthorized/>} />
          </>
        :
          <>
          <Route path="/home" element={<Homepage/>} /> 
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/create-post/success" element={<Confirmation/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/search" element={<Search/>} />
          <Route path="/dummyprofile/:id" element={<DummyProfile/>} />
          </> 
      }
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
    </Router>  
    </Container>
    </>
  );
}

const Footer = styled.footer`
height: 50px;
`

const Container = styled.div`
max-width: 100vw;
min-height: 100vh;
background: rgb(227,196,159);
background: radial-gradient(circle, rgba(227,196,159,1) 8%, rgba(186,241,244,1) 65%, rgba(252,210,70,1) 100%);
`

export default App;
