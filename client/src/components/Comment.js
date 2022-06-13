import styled from "styled-components";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import { Confirm } from 'react-st-modal';

const Comment = ({data, postData}) => {

    const {user} = useAuth0();

    const date = moment(data.timestamp).format("MMM Do YYYY, h:mm A");

    const deleteHandler = async () => {
        console.log("my funtion is firing!");
        await fetch(`/api/${user.sub}/${postData._id}/deletecomment/${data._id}`, {
            method: 'DELETE'
        })
        // window.location.reload();
}

    const confirmHandler = async () => {
        const isConfirm = await Confirm(
            'You cannot undo this action.',
            'Are you sure you want to delete this comment?'
        );
        
        if (isConfirm) {
            deleteHandler();
        }
    };

    return (
        <>
        <Wrapper>
        <Div>
        {
            user.sub === data.author ?
            <Link to={`/profile/${user.sub}`}>{data.authorName}</Link>
            :
            <span>{data.authorName}</span>
        }
        <Span2> • {date}</Span2>
        {
                    user.sub === data.author &&
                    // <Div>
                    <Delete onClick={confirmHandler}><FiTrash /></Delete>
                    // </Div>
                }
        </Div>
        <span>{data.body}</span>
        </Wrapper>
        </>
    )
}

const Delete = styled.a`
font-size: 20px;
float: right;
`

const Div = styled.div`
margin-bottom: 5px;
`

const Span2 = styled.span`
font-size: 13px;
color: gray;
`

const Wrapper = styled.div`
margin-top: 10px;
padding-bottom: 10px;
display: flex;
flex-direction: column;
border-bottom: 1px solid var(--color-primary-blue);
/* padding-bottom: 5px; */
`

export default Comment;