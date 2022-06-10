import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Homepage = () => {

    const {isAuthenticated, isLoading, user} = useAuth0();
    const [postFeed, setPostFeed] = useState([]);

    const getPostFeed = () => {
        fetch(`/api/gethomefeed/${user.sub}`)
        .then(res => res.json())
        .then(data => setPostFeed(data.data))
    }

    console.log(postFeed);

    
    useEffect(() => {
        if(isAuthenticated){
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
            <Span>Welcome, {user.given_name}.</Span>
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
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
`

const Button = styled.button`
font-family: var(--font-header);
font-weight: 400;
font-size: 14px;
width: 200px;
height: 50px;
color: var(--color-primary-orange);
background: rgba(255, 255, 255, 0.45);
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

const Span = styled.span`
font-family: var(--font-header);
font-size: 60px;
font-weight: 100;
color: #5370a3;
`

export default Homepage;