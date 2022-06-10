import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const SplashMain = () => {

    const {isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();

    if(isAuthenticated){
        navigate('/home');
    }

    return (
        <>
        {isLoading ?
        <div>
            Loading...
        </div>
        :       
        // <>
        <Span>welcome to prompt.me</Span>
        // </>
        }
        </>
    )
}

const Span = styled.span`
font-family: var(--font-header);
font-size: 60px;
font-weight: 100;
color: #5370a3;
`
export default SplashMain;