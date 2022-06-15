import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostFeed from "./PostFeed";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {

    // NOTE: I am using a sepearte "DummyProfile" component for my other users, since I am fetching user information from dummyapi.io. The Profile component is ONLY for the currently logged in user.

    const navigate = useNavigate();

    const {id} = useParams();

    // state variable containing the user's data
    const [profileData, setProfileData] = useState({});

     // state variable containing the user's posts
    const [postData, setPostData] = useState([]);

     // loading state for the page (set to false after profileData has loaded)
    const [pageLoading, setPageLoading] = useState(true);

     // loading state for user's postfeed (set to false after postData has loaded)
    const [loading, setLoading] = useState(false);

    // function for fetching the post data (called after profileData promise resolves)
    const getPostFeed = () => {
        setLoading(true);
        fetch(`/api/getposts/${id}`)
        .then(res => res.json())
        .then(data => setPostData(data.data))
        .then(res => {if(postData){setLoading(false)}})
    }

    //useEffect to fetch profile data on mount
    useEffect(() => {
        fetch(`/api/getuser/${id}`)
        .then(res => res.json())
        .then(data => setProfileData(data.data))
        .then(res => {if(profileData){setPageLoading(false)}})
        .then(() => getPostFeed())
    }, [id]);

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
                            <Img src={profileData.imgSrc} />
                            <Container3>
                                <Title>{profileData.nickname}</Title>
                                <span>Following: {profileData.following.length}</span>
                            </Container3>
                        </Container2>
                        <Container4>
                            <Title2>Blog posts</Title2>
                            { loading ?
                                <Span>Loading...</Span>
                            : postData.length === 0 ?
                                <Span>You haven't posted anything yet! <Link to="/create-post">Click here</Link> to create a new post.</Span>
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
margin-left: 10px;
margin-bottom: 2%;
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
margin-top: 2%;
`

export default Profile;