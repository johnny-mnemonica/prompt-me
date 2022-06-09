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
            body: JSON.stringify({_id, postAuthorId: user.sub, postAuthor: user.name, timestamp, postTitle, body, mood})
            })
            .then((res) => res.json())
            .then((data) => console.log(data.message))
            .then(() => navigate('/create-post/success'))
            // .then((data) => {
            // flightDataHandler(data.data)
            // })
            .catch((err) => {
                console.log(err);
                window.alert("Oops - something went wrong! Please try again.");
            })
    }

    return (
        <form onSubmit={e => submitHandler(e)}>
            <input type="text" placeholder="title" onChange={(e) => setPostTitle(e.target.value)} required/>
            <input type="text" placeholder="how are you feeling?" onChange={(e) => setMood(e.target.value)} required/>
            <input type="text" placeholder="your blog post here!" onChange={(e) => setBody(e.target.value)} required/>
            <button type="submit">submit</button>
        </form>
    )

}

export default CreatePost;