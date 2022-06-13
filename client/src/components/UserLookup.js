import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";


const UserLookup = ({friend, userFollowing}) => {

    const {user} = useAuth0();

    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState(false);

    const followFriendHandler = () => {
        setLoading(true);
        fetch("/api/follow", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({user_id: user.sub, friend_id: friend.id})
            })
            .then(setLoading(false))
            .then(setFollowing(true))
            .catch((err) => {
                console.log(err);
                window.alert("Oops - something went wrong! Please try again.");
            })
    }

    //TODO: setError 400: you are already following this user!
    console.log(friend);
    return (
        <>
        <Container>
            <Container2>
                <Img src={friend.picture} />
                <span>
                    {friend.firstName} {friend.lastName}
                </span>
            </Container2>
        {
            userFollowing.includes(friend.id) || following ?
            <Button disabled>following</Button>
            :
            <button onClick={followFriendHandler}>
                {!loading ?
                    "+"
                :
                    <PulseLoader size={8} color={"#ed9a34"} />
                }
            </button>
        }
        </Container>
        </>
    )
}

const Container2 = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

const Container = styled.div`
width: 95%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
border: 1px solid var(--color-primary-blue);
border-radius: 16px;
padding: 8px;
`

const Img = styled.img`
width: 50px;
border-radius: 50%;
margin-right: 10px;
`

const Button = styled.button`
&:disabled {
    cursor: not-allowed;
    background: rgba(252,210,70,.35);
    /* color: rgba(255, 255, 255, 0.75); */
}
`

export default UserLookup;