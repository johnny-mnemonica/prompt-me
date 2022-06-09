import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {

    const {isAuthenticated, isLoading, user} = useAuth0();

    


    // console.log(isAuthenticated, "is auth");
    // console.log(isLoading, "is loading")
    
    useEffect(() => {
        if(isAuthenticated){
            fetch("/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify({_id: user.sub, given_name: user.given_name, family_name: user.family_name, name: user.name, nickname: user.nickname, imgSrc: user.picture, email: user.email})
                })
                .then((res) => res.json())
                .then((data) => console.log(data.message))
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])


    return (
        <>
            Welcome, {user.given_name}.
            <Link to="/create-post">
                <button>
                    create new post
                </button>
            </Link>
        </>
    )
}

export default Homepage;