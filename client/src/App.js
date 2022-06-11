import styled from 'styled-components'
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import SplashMain from './components/SplashMain';
import Homepage from './components/HomePage';
import NotFound from './components/NotFound';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './components/Loading';
import Unauthorized from './components/Unauthorized';
import CreatePost from './components/CreatePost';
import Confirmation from './components/Confirmation';
import Profile from './components/Profile';
import Search from './components/Search';

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
          <Route path="/home" element={<Loading/>} />
          <Route path="/create-post" element={<Loading/>} />
          <Route path="/create-post/success" element={<Loading/>} />
          <Route path="/profile/:id" element={<Loading/>} />
          <Route path="/search" element={<Loading/>} />
          </>
        : !isAuthenticated ? 
          <>
          <Route path="/home" element={<Unauthorized/>}/>
          <Route path="/create-post" element={<Unauthorized/>}/>
          <Route path="/create-post/success" element={<Unauthorized/>}/>
          <Route path="/profile/:id" element={<Unauthorized/>}/>
          <Route path="/search" element={<Unauthorized/>} />
          </>
        :
          <>
          <Route path="/home" element={<Homepage/>} /> 
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/create-post/success" element={<Confirmation/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/search" element={<Search/>} />
          </> 
      }
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>  
    </Container>
    </>
  );
}

const Container = styled.div`
max-width: 100vw;
min-height: 100vh;
background: rgb(227,196,159);
background: radial-gradient(circle, rgba(227,196,159,1) 8%, rgba(186,241,244,1) 65%, rgba(252,210,70,1) 100%);
`

export default App;
