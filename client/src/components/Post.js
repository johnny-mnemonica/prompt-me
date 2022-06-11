import styled from "styled-components";
import moment from 'moment';
import {useState, useEffect} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from 'uuid';

import Comment from "./Comment";

const Post = ({postData}) => {

    
    const date = moment(postData.timestamp).format("MMM Do YYYY, h:mm A");
    
    const [comment, setComment] = useState(null);
    const [addComment, setAddComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [addedNewComment, setAddedNewComment] = useState(false);
    
    const {user} = useAuth0();
    
    useEffect(() => {}, [addedNewComment])
    
    const submitHandler = (e) => {
        const timestamp = new Date().toISOString();
        const _id = uuidv4();

        e.preventDefault();

        fetch(`/api/${postData._id}/addcomment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({_id, author: user.sub, authorName: user.nickname, timestamp, body: comment})
            })
            .then((res) => res.json())
            .then((data) => console.log(data.message))
            .then(() => setAddedNewComment(true))
            .catch((err) => {
                console.log(err);
                window.alert("Oops - something went wrong! Please try again.");
            })
        
    }

    return (
        <Container>
            <Content>
                <Span>{postData.postAuthor}</Span>
                <Span2> • {date}</Span2>
                <Title>{postData.postTitle}</Title>
                <P>mood: {postData.mood}</P>
                <P2>{postData.body}</P2>
                {postData.comments.length > 0 &&
                    <>
                    <CommentTitle>Comments</CommentTitle>
                    <button onClick={() => setShowComments(true)}>show comments {">>"} </button>
                    </>
                }

                {showComments &&
                        postData.comments.map((comment) => {
                            return <Comment data={comment}/>
                        })
                }

                {showComments &&
                        <button onClick={() => setShowComments(false)}>hide comments</button>
                }   

                <button onClick={() => setAddComment(true)}>add comment</button>
                {
                    addComment &&
                    <form onSubmit={e => submitHandler(e)} >
                    <textarea type="text" placeholder="your comment here" onChange={(e) => setComment(e.target.value)}/>
                    <button type="submit">submit</button>
                    </form>
                }
                </Content>
        </Container>
    )
}

const P = styled.p`
margin-bottom: 5px;
`

const P2 = styled(P)`
margin-top: 15px;
`

const Span = styled.span`
`

const Span2 = styled.span`
font-size: 13px;
color: gray;
`


const Title = styled(P)`
font-family: var(--font-header);
color: var(--color-primary-blue);
font-size: 22px;
margin-top: 12px;
`

const CommentTitle = styled(Title)`
font-size: 18px;
margin-top: 25px;
`

const Content = styled.div`
width: 95%;
margin-top: 15px;
margin-bottom: 15px;
`

const Container = styled.div`
background: var(--color-bg-element);
border: 1px solid var(--color-primary-blue);
width: 90%;
height: fit-content;
margin-bottom: 15px;
border-radius: 16px;
display: flex;
justify-content: center;
/* padding-left: 15px;
padding-right: 15px; */
`

export default Post;