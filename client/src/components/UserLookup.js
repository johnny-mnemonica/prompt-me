import { useAuth0 } from "@auth0/auth0-react";

const UserLookup = ({friend}) => {

    const {user} = useAuth0();

    const followFriendHandler = () => {
        console.log("my function is firing!")
        fetch("/api/follow", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({user_id: user.sub, friend_id: friend.id})
            })
            .then((res) => res.json())
            .then((data) => console.log(data.message))
            .catch((err) => {
                console.log(err);
                window.alert("Oops - something went wrong! Please try again.");
            })
    }

    //TODO: setError 400: you are already following this user!

    return (
        <div>
        <span>
            {friend.firstName}
        </span>
        <button onClick={followFriendHandler}>+</button>
        </div>
    )
}

export default UserLookup;