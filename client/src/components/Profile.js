import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostFeed from "./PostFeed";

const Profile = () => {

    const {id} = useParams();

    const [profileData, setProfileData] = useState(null);
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);


    const getPostFeed = () => {
        fetch(`/api/getposts/${id}`)
        .then(res => res.json())
        .then(data => setPostData(data.data))
        .then(setLoading(false))
    }

    useEffect(() => {
        setLoading(true);
        fetch(`/api/getuser/${id}`)
        .then(res => res.json())
        .then(data => setProfileData(data.data))
        .then(() => getPostFeed())
        // .then(setHasLoaded(true))
    }, [id]);
    

    return (
        <>
        { loading ?
            <span> Loading...</span>
        :
            <div>
                <PostFeed data={postData}/>
            </div>
        }
        </>
    )
}

export default Profile;