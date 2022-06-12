import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostFeed from "./PostFeed";
import { motion } from 'framer-motion';

const Homepage = () => {

    const {isAuthenticated, isLoading, user} = useAuth0();
    const [postFeed, setPostFeed] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPostFeed = () => {
        fetch(`/api/gethomefeed/${user.sub}`)
        .then(res => res.json())
        .then(data => setPostFeed(data.data))
        .then(setLoading(false))
    }

    console.log(postFeed);

    
    useEffect(() => {
        if(isAuthenticated){
            setLoading(true);
            fetch("/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify({_id: user.sub, given_name: user.given_name, family_name: user.family_name, name: user.name, nickname: user.nickname, imgSrc: user.picture, email: user.email})
                })
                .then(() => getPostFeed())
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])


    return (
        <>
        <Wrapper>
            <Container>
            <Link to="/create-post">
                <Button>
                    create new post
                </Button>
            </Link>
            <Link to={`/profile/${user.sub}`}>
                <Button>
                    my profile
                </Button>
            </Link>
            <Link to={`/search`}>
                <Button>
                    find friends
                </Button>
            </Link>
            </Container>
            <Container2>
            <Span
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{ duration: 1.5 }}>
                Welcome, {user.nickname}.
            </Span>
            <Container3>
            {
                loading ?
                <Span2>Loading...</Span2>
                : postFeed.length === 0 ?
                <Span2>there's nothing to see here (yet)! create a new post or follow a friend to get started.</Span2>
                :
                <PostFeed data={postFeed} />
            }
            </Container3>
            </Container2>
            </Wrapper>
        </>
    )
}
const Container3 = styled.div`
margin-top: 2%;
margin-left: 1%;
width: 100%;
`

const Container2 = styled.div`
display: flex;
flex-direction: column;
margin-left: 5%;
max-width: 75%;
`

const Wrapper = styled.div`
display: flex;
flex-direction: row;
margin-top: 5%;
/* width: 100%; */
`

const Span2 = styled.span`
font-family: var(--font-body);
color: gray;
font-size: 14px;
`

const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 50px;
`

const Button = styled.button`
font-family: var(--font-header);
font-weight: 400;
font-size: 14px;
width: 200px;
height: 50px;
color: var(--color-primary-orange);
background: var(--color-bg-element);
border: none;
margin-bottom: 5px;
text-align: right;
position: relative;
left: -60px;
transition: left 500ms;
transition-timing-function: ease;
border-radius: 16px;
cursor: pointer;

&:hover {
    left: -10px;
    transition: left 500ms ease;
}
`

const Span = styled(motion.div)`
font-family: var(--font-header);
font-size: 60px;
font-weight: 100;
color: var(--color-primary-blue);
`

export default Homepage;