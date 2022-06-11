import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from './Post'

const PostFeed = ({data}) => {
    


    return (
        <>
        { data.map((post) => {
            return <Post postData={post}/>
        })
        }
        </>

    )
}

export default PostFeed;