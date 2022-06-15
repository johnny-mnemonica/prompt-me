import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';

const SplashMain = () => {

    const {isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();

    // we want to push our user away from the splash page if they're already logged in...
    if(isAuthenticated){
        navigate('/home');
    }

    return (
        <>
        {isLoading ?
            <LoadingSpinner/>
        :
            <Wrapper>     
                <Div>
                    <Span
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{ duration: 1.5 }}>
                        welcome to prompt.me
                    </Span>
                    <span>
                        prompt.me is an intuitive journaling platform that allows you to create and share blog posts with your friends.
                    </span>
                    
                    <Span2>
                        click sign in to get started.
                    </Span2>
                </Div>
            </Wrapper>  
        }
        </>
    )
}

const Wrapper = styled.div`
height: calc(100vh - 50px);
width: 100%;
display: flex;
justify-content: center;
`

const Div = styled.div`
display: flex;
flex-direction: column;
height: 20%;
justify-content: space-between;
margin-top: 175px;
`

const Span2 = styled.span`
font-style: italic;
`

const Span = styled(motion.div)`
font-family: var(--font-header);
font-size: 60px;
font-weight: 100;
color: var(--color-primary-blue);
`

export default SplashMain;