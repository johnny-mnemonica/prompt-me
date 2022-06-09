import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostFeed from "./PostFeed";

const Profile = () => {

    const {id} = useParams();

    
    const dataHandler = (data) => {
        console.log(data);
    }
    
    useEffect(() => {
        console.log(id);
        fetch(`/api/getuser/${id}`)
        .then(res => res.json())
        .then(data => dataHandler(data))
        // .then(setHasLoaded(true))
      }, [id]);
    

    return (
        <div>
            <PostFeed id={id}/>
        </div>
    )
}

export default Profile;