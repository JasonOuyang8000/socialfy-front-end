import { faCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { checkFriend, checkRequested } from "../../functions/helpers";



const FriendRequest = ({profileId, userId, friends}) => {
    const [isFriends, setIsFriends] = useState(false);

    const [requested, setRequested] = useState(false);


    const handleClick = async(e, cancel) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND}/user/${profileId}/request`,{
               cancel
            },{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            }); 
          
            if (response.data.friends) {
                setIsFriends(true);
                return;
            }

            setRequested(checkRequested(response.data.requests.requested,userId,profileId));
            
        
           
        }
        catch(error) {
            console.log(error);
        }
    }

    const getUserRequest = async () => {
        try {
            console.log('test');
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/request`,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            });

          
           
        
            setRequested(checkRequested(response.data.requests.requested,userId,profileId));
          
        }
        catch(error) {
            console.log(error);
        }
       
    }

    useEffect(() => {
    
        setIsFriends(checkFriend(friends, userId));
       
    }, [friends])

    useEffect(() => {
        getUserRequest();
    }, [ ])

    console.log(friends.length);


    return (
        <div className="col-12 d-flex align-items-center mb-4 justify-content-center col-md-4">
        {isFriends ? 
            <div className="friend-btn">
            <FontAwesomeIcon icon={faCheck} /> Friends
            </div>
        :
            (requested ? 
                <button onClick={(e) => handleClick(e,true)} className="friend-btn">
                Cancel Request
                </button>
                :
                <button onClick={(e) => handleClick(e,false)} className="friend-btn">
                <FontAwesomeIcon icon={faUserPlus} /> Add Friend 
                </button>
           )
        }
        </div>
    )
}

export default FriendRequest;