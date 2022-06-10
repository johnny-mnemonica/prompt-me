import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogInButton = () => {
    const {loginWithRedirect} = useAuth0();

    return(
        <>
        <Button onClick={loginWithRedirect}>
            sign in
        </Button>
        </>
    )
}

const Button = styled.button`
font-family: var(--font-header);
font-weight: 400;
font-size: 14px;
width: 100px;
height: 37.5px;
border: 1px solid var(--color-primary-orange);
color: var(--color-primary-orange);
background: none;
transition: background-color 500ms;
transition-timing-function: ease;
border-radius: 16px;
cursor: pointer;

&:hover {
    background-color: rgba(252,210,70,.35);
    transition: background-color 500ms;
    transition-timing-function: ease;
}
`

export default LogInButton;