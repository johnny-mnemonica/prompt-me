import LogInButton from "./LogInButton";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";


const NavBar = () => {

  const {isAuthenticated} = useAuth0();

  return (
    <Wrapper>
      { 
      !isAuthenticated ?
        <>
        <StyledLink to="/">
        <Span>
          prompt.me
        </Span>
        </StyledLink>
        <LogInButton/>
        </>
      :
        <>
        <StyledLink to="/home">
        <Span>
          prompt.me
        </Span>
        </StyledLink>
        <LogOutButton/>
        </>
      }
    </Wrapper>
  );
}


const StyledLink = styled(Link)`
text-decoration: none;
outline: none;
`

const Span = styled.span`
font-family: var(--font-logo);
font-size: 24px;
font-weight: 800;
color: var(--color-primary-orange);
`

const Wrapper = styled.div`
height: 50px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background: rgba(255, 255, 255, 0.45);
padding-left: 10px;
padding-right: 10px;
`

export default NavBar;
