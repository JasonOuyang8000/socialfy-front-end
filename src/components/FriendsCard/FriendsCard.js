import { faStickyNote, faUserFriends, faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import FriendRequest from "../FriendRequest.js/FriendRequest";
import './FriendsCard.css';

const FriendsCard = ({posts,user,profileId}) => {
   

    const [friends, setFriends] = useState([]);

    const newProfileId = parseInt(profileId);
   
    
    const getFriends = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/${profileId}/friend`);
           

            
            setFriends(response.data.allfriends);
        }
        catch(error) {
            console.log(error);
        }
       
    }


    useEffect(() => {
        getFriends();
    },[ profileId ]);




    return (
        <div className="friends-card p-4 row no-gutters shadow mb-5 mt-4">
                <div className={`col-12 ${user.id === newProfileId  ? 'col-md-6' : 'col-md-4'}  d-flex  flex-column mb-4 align-items-center justify-content-center`}>
                    <p className="mb-2 friends-total-text">Friends</p>
                    <span className="">

                        <FontAwesomeIcon className="mr-2 friends-card-selected" icon={faUserFriends} size="lg"/>
                        {friends.length}
                    </span>
                    
                </div>
                <div className={`col-12 ${user.id === newProfileId  ? 'col-md-6' : 'col-md-4'}  d-flex   flex-column mb-4 align-items-center justify-content-center`}>
                        <p className="mb-2 friends-total-text">Posts</p>
                        <span className=""><FontAwesomeIcon  className="mr-1 friends-card-selected" icon={faStickyNote} size="lg"/> {posts.length}</span>
                       
                </div>
                {
                    user.id !== newProfileId &&
                    <FriendRequest friends={friends} profileId={newProfileId} userId={user.id} />
                }
         
        </div>
    )
}

export default FriendsCard;