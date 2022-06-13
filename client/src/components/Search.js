import styled from 'styled-components';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import UserLookup from './UserLookup';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from './LoadingSpinner';

const Search = () => {

    //NOTE - for develeopment purposes only, I am using the getDummyUserById endpoint to look up users. In a real-world application, we would store all user info in the database, which we could then access using the getUserById endpoint. 

    const [input, setInput] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);

    const {user} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        setPageLoading(true);
        fetch(`/api/getuser/${user.sub}`)
        .then(res => res.json())
        .then(data => setCurrentUserData(data.data))
        .then(setPageLoading(false))
    }, [])

    const dataHandler = (data) => {
        if(data.status === 404){
            setLoading(false);
            setUserData([]);
            setErrMessage("We can't seem to find the user you're looking for!");
        } else {
            setLoading(false);
            setErrMessage(null);
            setUserData(data.data);
        }
    }

    const submitHandler = (e) => {
        setLoading(true);
        e.preventDefault();
        fetch(`/api/getdummyuser/${input}`)
        .then(res => res.json())
        .then(data => dataHandler(data))
    }

    return (
        <>
        { pageLoading ? 
            <LoadingSpinner/>
        :   
        <Wrapper>
            <Content>
                <Button onClick={(() => navigate(-1))}>{"<< go back"}</Button>
                <Container>
                    <Form onSubmit={((e) => submitHandler(e))}>
                        <Title>Find a friend</Title>
                        <span>you can follow a friend by searching for their user ID.</span>
                        <Span>your user ID is: {user.sub}.</Span>
                        <Input type="text" placeholder="search by user ID" onChange={(e) => setInput(e.target.value)} required/>
                        <button type="submit">search</button>
                    </Form>
                    <Container2>
                        {   loading ?
                            <span>Loading...</span>
                            : userData.length === 0 ?
                                <span>{errMessage}</span>
                            :
                                <UserLookup friend={userData} userFollowing={currentUserData.following}/>
                        }
                    </Container2>
                </Container>
            </Content>
        </Wrapper>
        }
        </>
    )
}

const Button = styled.button`
margin-left: 3px;
`

const Content = styled.div`
margin-top: 5%;
`

const Input = styled.input`
border: 1px solid var(--color-primary-blue);
margin-bottom: 25px;
width: 50%;
height: 25px;
font-family: var(--font-body);
`

const Container2 = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 25px;
flex-basis: 35%;
`

const Span = styled.span`
font-style: italic;
margin-top: 5px;
margin-bottom: 25px;
`

const Title = styled.p`
font-family: var(--font-header);
color: var(--color-primary-blue);
font-size: 22px;
margin-bottom: 20px;
`

const Form = styled.form`
display: flex;
flex-direction: column;
flex-basis: 65%;
/* justify-content: space-between; */
`

const Container = styled.div`
background: var(--color-bg-element);
width: 600px;
height: 300px;
border-radius: 16px;
padding: 25px;
margin-top: 15px;
display: flex;
flex-direction: column;
`

const Wrapper = styled.div`
width: 100%;
min-height: calc(100vh - 50px);
display: flex;
flex-direction: column;
align-items: center;
/* justify-content: center; */
`

export default Search;