import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostFeed from "./PostFeed";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

    const navigate = useNavigate();

    const {id} = useParams();

    const {user} = useAuth0();

    // state variable containing the user's data
    const [profileData, setProfileData] = useState({});

     // state variable containing the user's posts
    const [postData, setPostData] = useState([]);

     // loading state for the page (set to false after profileData has loaded)
    const [pageLoading, setPageLoading] = useState(true);

     // loading state for user's postfeed (set to false after postData has loaded)
    const [loading, setLoading] = useState(false);

    const [currentUserData, setCurrentUserData] = useState(null);

    const [followed, setFollowed] = useState(false);
    const [unfollowed, setUnfollowed] = useState(false);

    // function for fetching the post data (called after profileData promise resolves)
    const getPostFeed = () => {
        setLoading(true);
        fetch(`/api/getposts/${id}`)
        .then(res => res.json())
        .then(data => setPostData(data.data))
        .then(res => {if(postData){setLoading(false)}})
    }

    console.log(user.sub)

    const getLoggedInUser = () => {
        console.log("my function");
        fetch(`/api/getuser/${user.sub}`)
        .then(res => res.json())
        .then(data => setCurrentUserData(data.data))
        .then(res => (setPageLoading(false))
    )}
    
    //useEffect to fetch profile data on mount
    useEffect(() => {
        fetch(`/api/getdummyuser/${id}`)
        .then(res => res.json())
        .then(data => setProfileData(data.data))
        .then(() => getLoggedInUser())
        // .then(res => {if(profileData){setPageLoading(false)}})
        .then(() => getPostFeed())
    }, []);

    const unfollowHandler = () => {
        if(!unfollowed) {
        fetch("/api/unfollow", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({userId: user.sub, friendId: id})
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then(setFollowed(false))
            .then(setUnfollowed(true))
            // .then(window.location.reload())
            // .then(setFollowing(true))
            .catch((err) => {
                console.log(err);
                window.alert("Oops - something went wrong! Please try again.");
            })
        }
    }

    const followHandler = () => {
        if(!followed) {
            fetch("/api/follow", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({userId: user.sub, friendId: id})
            })
            .then(res => res.json())
            .then(data => console.log(data))
            // .then(window.location.reload())
            .then(setFollowed(true))
            .then(setUnfollowed)
            .catch((err) => {
                console.log(err);
                window.alert("Oops - something went wrong! Please try again.");
            })
        }
    }

    console.log(followed, "followed");
    console.log(unfollowed, "unfollowed");

    return (
        <>
        { pageLoading ?
            <LoadingSpinner/>
        :
        <>
        <Wrapper>
            <Container>
                <Button onClick={(() => navigate(-1))}>{"<< go back"}</Button>
                <Container1>
                    <Content>
                        <Container2>
                            <Container5>
                            <Img src={profileData.picture} />
                            <Container3>
                                <Title>{profileData.firstName} {profileData.lastName}</Title>
                                <span>Following: 0</span>
                            </Container3>
                            </Container5>
                            {
                            
                                currentUserData.following.includes(id) ?
                                <Button2 onClick={unfollowHandler} unfollowed={unfollowed}>
                                    {unfollowed?
                                        "unfollowed"
                                    :
                                        "unfollow"
                                    }
                                </Button2>
                                :
                                <Button3 onClick={followHandler} followed={followed}>
                                    {followed?
                                        "followed"
                                    :
                                        "follow"
                                    }
                                </Button3>
                                
                            }
                        </Container2>
                        <Container4>
                            <Title2>Blog posts</Title2>
                            { loading ?
                                <Span>Loading...</Span>
                            : postData.length === 0 ?
                                <Span>{profileData.firstName} hasn't posted anything yet!</Span>
                            :
                                <PostFeed data={postData}/>
                            }
                        </Container4>
                    </Content>
                </Container1>
            </Container>
        </Wrapper>
        </>
        }
        </>
    )
}

const Container5 = styled.div`
display: flex;
flex-direction: row;
align-self: flex-start;

`

const Button3 = styled.button`
cursor: ${(props) => props.followed && "not-allowed"};
background: ${(props) => props.followed && "rgba(252,210,70,.25)"};
align-self: center;
`

const Button2 = styled.button`
cursor: ${(props) => props.unfollowed && "not-allowed"};
background: ${(props) => props.unfollowed && "rgba(252,210,70,.25)"};
align-self: center;
`

const Span = styled.span`
margin-left: 5px;
`

const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
margin-left: 80px;
`

const Button = styled.button`
align-self: flex-start;
margin-left: 3.25%;
`

const Container1 = styled.div`
width: 95%;
background: var(--color-bg-element);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 16px;
padding-top: 25px;
padding-bottom: 25px;
margin-top: 15px;
`

const Container4 = styled.div`
align-self: flex-start;
margin-left: 15px;
margin-top: 25px;
width: 100%;
`

const Img = styled.img`
width: 100px;
border-radius: 50%;
`

const Container3 = styled.div`
display: flex;
flex-direction: column;
margin-left: 15px;
align-self: center;
`

const Title = styled.p`
font-family: var(--font-header);
color: var(--color-primary-blue);
font-size: 22px;
`

const Title2 = styled.p`
margin-bottom: 15px;
font-family: var(--font-body);
font-size: 22px;
margin-left: 5px;
`

const Container2 = styled.div`
display: flex;
flex-direction: row;
align-self: flex-start;
justify-content: space-between;
margin-left: 10px;
margin-bottom: 2%;
width: 91%;
`

const Container = styled.div`
width: 92.5%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
margin-top: 5%;
`

export default Profile;