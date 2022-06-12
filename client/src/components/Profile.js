import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostFeed from "./PostFeed";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {

    const navigate = useNavigate();

    const {id} = useParams();

    const [profileData, setProfileData] = useState(null);
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);


    const getPostFeed = () => {
        fetch(`/api/getposts/${id}`)
        .then(res => res.json())
        .then(data => setPostData(data.data))
        .then(setLoading(false))
    }

    useEffect(() => {
        setLoading(true);
        fetch(`/api/getuser/${id}`)
        .then(res => res.json())
        .then(data => setProfileData(data.data))
        .then(() => getPostFeed())
    }, [id]);

    return (
        <>
        { loading ?
            <LoadingSpinner/>
        :
        <>
        <Wrapper>
            <Container>
        <Button onClick={(() => navigate(-1))}>{"<< go back"}</Button>
            <Container1>
            <Content>
            <Container2>
            <Img src={profileData?.imgSrc} />
            <Container3>
            <Title>{profileData?.nickname}</Title>
            <span>Following: {profileData?.following.length}</span>
            </Container3>
            </Container2>
                <Container4>
                <Title2>Posts</Title2>
                {
                    postData.length === 0 ?
                        <span>You haven't posted anything yet! <Link to="/create-post">Click here</Link> to create a new post.</span>
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

const Title2 = styled(Title)`
margin-bottom: 15px;
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
margin-top: 5%;
`

export default Profile;