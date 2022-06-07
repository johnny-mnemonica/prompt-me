import LogInButton from "./LogInButton";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import styled from 'styled-components';


const NavBar = () => {
  return (
    <Wrapper>
      <Span>
        prompt.me
      </Span>
      <LogInButton/>
      <LogOutButton/>
      <Link to="/about">
          About
      </Link>
    </Wrapper>
  );
}

const Span = styled.span`
font-family: var(--font-logo);
font-size: 24px;
font-weight: 800;
color: #ed9a34;
`
const Wrapper = styled.div`
width: 100vw;
height: 50px;
background: rgba(255, 255, 255, 0.45);
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px 5px;
`
export default NavBar;
