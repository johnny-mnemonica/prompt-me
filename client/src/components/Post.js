import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { FiTrash } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { Confirm } from 'react-st-modal';
import styled from "styled-components";
import moment from 'moment';
import PulseLoader from "react-spinners/PulseLoader";
import Comment from "./Comment";

const Post = ({postData}) => {
    
    const date = moment(postData.timestamp).format("MMM Do YYYY, h:mm A");
    
    // state variable for capturing the comment body input. this is what gets submited in our post request. 
    const [comment, setComment] = useState(null);

    // state variable for the "show comments" button
    const [showComments, setShowComments] = useState(false);

    // state variable that triggers the useffect to re-render component - set to true after use submits or deletes comment
    const [addedNewComment, setAddedNewComment] = useState(false);

    // loading state for post
    const [loading, setLoading] = useState(false);

    // state variable to capture comments array after it's been fetched from the database
    const [commentData, setCommentData] = useState([]);

    // loading state for comments 
    const [commentLoading, setCommentLoading] = useState(false);
    
    const {user} = useAuth0();

    // fetch comments on mount - called within useEffect
    const getCommentHandler = () => {
        if(postData){
            setCommentLoading(true);
            fetch(`/api/getcomments/${postData._id}`)
            .then(res => res.json())
            .then(data => setCommentData(data.data))
            .then(res => {if(commentData){setCommentLoading(false)}})
            .then(setLoading(false))
        }
    }
    
    // setAddedNewComment triggers a re-render, gets set back to false on mount
    useEffect(() => {
        setAddedNewComment(false);
        getCommentHandler();
    }, [addedNewComment])

    // handler to delete post
    const deleteHandler = async () => {
        await fetch(`/api/${user.sub}/deletepost/${postData._id}`, {
            method: 'DELETE'
        })
        window.location.reload();
    }

    //handler to confirm delete post
    const confirmHandler = async () => {
        const isConfirm = await Confirm(
            'You cannot undo this action.',
            'Are you sure you want to delete this post?'
        );
        
        if (isConfirm) {
            deleteHandler();
        }
    };

    // submit comment handler
    const submitHandler = (e) => {
        setLoading(true);
        const timestamp = new Date().toISOString();
        const _id = uuidv4();

        e.preventDefault();

        fetch(`/api/${postData._id}/addcomment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                _id, 
                author: user.sub, 
                authorName: user.nickname, 
                timestamp, 
                body: comment})
        })
        .then(() => setAddedNewComment(true))
        .catch((err) => {
            console.log(err);
            window.alert("Oops - something went wrong! Please try again.");
        })    
    }

    return (
        <Container>
            <Content>
                <>
                <Div2>
                    <div>
                        { user.sub === postData.postAuthorId ?
                            <Link to={`/profile/${user.sub}`}>{postData.postAuthor}</Link>
                        :
                            <Link to={`/dummyprofile/${postData.postAuthorId}`}>{postData.postAuthor}</Link>
                        }
                        <Span2> • {date}</Span2>
                    </div>
                    { user.sub === postData.postAuthorId &&
                        <Delete onClick={confirmHandler}><FiTrash /></Delete>
                    }
                </Div2>
                <Title>{postData.postTitle}</Title>
                <P>mood: {postData.mood}</P>
                <P2>{postData.body}</P2>
                <CommentTitle>Leave a comment</CommentTitle>
                    <Form onSubmit={submitHandler} >
                        <Textarea type="text" placeholder="say something nice!" onChange={(e) => setComment(e.target.value)}/>
                        <button type="submit">
                            { !loading ?
                                "submit" 
                            :
                                <PulseLoader size={8} color={"#ed9a34"} />
                            }
                        </button>
                    </Form>
                    { commentLoading ?
                        <P3>Loading comments...</P3>
                    :
                    <>
                    { commentData?.length > 0 &&
                        <>
                        <CommentTitle>Comments</CommentTitle>
                        { !showComments &&
                            <A onClick={() => setShowComments(true)}>
                                show comments {">>"}
                            </A>
                        }
                        </>
                    }

                    { showComments && commentData?.length > 0 &&
                        <A onClick={() => setShowComments(false)}>
                            {"<<"} hide comments
                        </A>
                    }

                    {showComments &&
                        commentData?.map((comment) => {
                            return <Comment key={Math.floor(Math.random() * 14000000)} 
                            data={comment} 
                            postData={postData} 
                            setAddedNewComment={setAddedNewComment}
                            setCommentLoading={setCommentLoading} />
                        })
                    }
                    </>
                    }
                </>
            </Content>
        </Container>
    )
}

const Delete = styled.a`
font-size: 20px;
`

const Div2 = styled.div`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
`

const A = styled.a`
font-size: 12px;
`

const Textarea = styled.textarea`
resize: none;
width: 600px;
height: 75px;
margin-bottom: 20px;
border: 1px solid var(--color-primary-blue);
`

const Form = styled.form`
display: flex; 
flex-direction: column;

`
const P = styled.p`
margin-bottom: 5px;
`

const P2 = styled(P)`
margin-top: 15px;
`

const P3 = styled(P2)`
margin-top: 25px;
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
display: flex;
flex-direction: column;
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
`

export default Post;