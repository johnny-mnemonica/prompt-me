import styled from "styled-components";
import moment from "moment";

const Comment = ({data}) => {

    const date = moment(data.timestamp).format("MMM Do YYYY, h:mm A");

    return (
        <>
        <span>{data.authorName}</span>
        <span>{date}</span>
        <span>{data.body}</span>
        </>
    )
}

export default Comment;