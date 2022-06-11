import styled from "styled-components";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
    const {user} = useAuth0();

    const [postTitle, setPostTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [mood, setMood] = useState(null);
    const [prompt, setPrompt] = useState(null);

    const getRandomPrompt = () => {
        fetch('/api/getprompt')
        .then(res => res.json())
        .then(data => setPrompt(data.data))
    }

    console.log(prompt);
    
    const submitHandler = (e) => {
        const timestamp = new Date().toISOString();
        const _id = uuidv4();

        e.preventDefault();

        fetch("/api/createpost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({_id, postAuthorId: user.sub, postAuthor: user.nickname, timestamp, postTitle, body, mood})
            })
            .then((res) => res.json())
            .then((data) => console.log(data.message))
            .then(() => navigate('/create-post/success'))
            .catch((err) => {
                console.log(err);
                window.alert("Oops - something went wrong! Please try again.");
            })
    }

    return (
        <>
        <Wrapper>
                    <Button onClick={(() => navigate(-1))}>{"<< go back"}</Button>
            <Container>
                <Content>
        <Form onSubmit={e => submitHandler(e)}>
            <input type="text" placeholder="title" onChange={(e) => setPostTitle(e.target.value)} required/>
            <input type="text" placeholder="how are you feeling?" onChange={(e) => setMood(e.target.value)} required/>
            <span>
                not sure what to write about? click <A onClick={getRandomPrompt}>here</A> to generate a journalling prompt
            </span>
        {
            prompt &&
            <span>{prompt}</span>
        }
            <TextArea type="text" placeholder="your blog post here!" onChange={(e) => setBody(e.target.value)} required/>
            <button type="submit">submit</button>
        </Form>
            </Content>
        </Container>
    </Wrapper>
    </>
    )

}

const Button = styled.button`
align-self: flex-start;
margin-left: 3.75%;
`

const TextArea = styled.textarea`
resize: none;
height: 200px;
`

const A = styled.a`
color: var(--color-primary-orange);
text-decoration: underline;
cursor: pointer;
`

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
`

const Content = styled.div`
width: 95%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 20px;
`

const Container = styled.div`
width: 92.5%;
height: 500px;
display: flex;
flex-direction: column;
align-items: center;
background: rgba(255, 255, 255, 0.45);
border-radius: 16px;
margin-top:15px;
/* padding: 20px;x */
/* margin-top: auto; */
/* align-self: center; */
`

const Wrapper = styled.div`
margin-top: 25px;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export default CreatePost;