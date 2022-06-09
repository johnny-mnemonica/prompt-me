import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PostFeed = ({id}) => {

    const dataHandler = (data) => {
        console.log(data);
    }
    
    useEffect(() => {
        console.log(id);
        fetch(`/api/getposts/${id}`)
        .then(res => res.json())
        .then(data => dataHandler(data))
        // .then(setHasLoaded(true))
      }, [id]);

    return (
        <>
        postfeed
        </>

    )
}

export default PostFeed;