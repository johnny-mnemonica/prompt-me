import styled from "styled-components";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Comment = ({data}) => {

    const {user} = useAuth0();

    const date = moment(data.timestamp).format("MMM Do YYYY, h:mm A");

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
        </Div>
        <span>{data.body}</span>
        </Wrapper>
        </>
    )
}

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