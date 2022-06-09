import {useState} from 'react';
import UserLookup from './UserLookup';

const Search = () => {

    //NOTE - for develeopment purposes only, I am using the getDummyUserById endpoint to look up users. In a real-world application, we would store all user info in the database, which we could then access using the getUserById endpoint. 

    const [input, setInput] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const [userData, setUserData] = useState([]);

    const dataHandler = (data) => {
        if(data.status === 404){
            setErrMessage("We can't seem to find the user you're looking for!");
        } else {
            setErrMessage(null);
            setUserData(data.data);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`/api/getdummyuser/${input}`)
        .then(res => res.json())
        .then(data => dataHandler(data))
    }

    return (
        <>
        <form onSubmit={((e) => submitHandler(e))}>
            <input type="text" placeholder="search by user ID" onChange={(e) => setInput(e.target.value)} required/>
            <button type="submit">search</button>
        </form>
        {
            errMessage ?
                <span>{errMessage}</span>
            :
                <UserLookup user={userData}/>
        }
        </>
    )
}

export default Search;