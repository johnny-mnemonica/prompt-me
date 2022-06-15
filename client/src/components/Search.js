import styled from 'styled-components';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import UserLookup from './UserLookup';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from './LoadingSpinner';

const Search = () => {

    //NOTE - for develeopment purposes only, I am using the getDummyUserById endpoint to look up users. In a real-world application, we would store all user info in the database, which we could then access using the getUserById endpoint. 

    // state variable for search input
    const [input, setInput] = useState(null);

    // state variable for 404 error message
    const [errMessage, setErrMessage] = useState(null);

    //  state varible to store user's data once it's been fetched
    const [userData, setUserData] = useState([]);

    // loading state while fetch is running
    const [loading, setLoading] = useState(false);

    // state variable to store data about the current user (used to determine whether the user is following their friend)
    const [currentUserData, setCurrentUserData] = useState(null);

    // loading state for page
    const [pageLoading, setPageLoading] = useState(true);

    const {user} = useAuth0();
    const navigate = useNavigate();

    // first thing's first, we fetch our current user data
    useEffect(() => {
        fetch(`/api/getuser/${user.sub}`)
        .then(res => res.json())
        .then(data => setCurrentUserData(data.data))
        .then(setPageLoading(false))
    }, [])

    // handler for dealing with search data, called within submitHandler
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

    // submit handler for search button
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
                        { loading ?
                            <span>Loading...</span>
                        : userData.length === 0 ?
                                <span>{errMessage}</span>
                        :
                                <UserLookup friend={userData} userFollowing={currentUserData?.following}/>
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
`

export default Search;