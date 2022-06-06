import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {

    const {isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();

    console.log(isAuthenticated, "is auth");
    console.log(isLoading, "is loading")
    
    // if(isLoading){
    //     return (
    //         <div>
    //             Loading....
    //         </div>

    //     )
    // }

    // if(!isAuthenticated){
    //     navigate('/');
    // }
    // useEffect(() => {
    //     if(!isAuthenticated){
    //         navigate('/');
    //     }
    // }, []) 

    return (
        <>
            You are logged in!
        </>
    )
}

export default Homepage;