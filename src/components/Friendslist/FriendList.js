import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import ListRequest from "../FriendslistRequest/ListRequest";
import ProfileCircle from "../ProfileCircle/ProfileCircle";
import './FriendList.css';


const FriendList = ({user, chatClick}) => {
    const [friends, setFriends] = useState([]);
    const getFriends = async () => {
        try {
            const response  = await axios.get(`${process.env.REACT_APP_BACKEND}/user/${user.id}/friend`);
            setFriends(response.data.allfriends);
        }
        catch(error) {
            console.log(error);
        }
      

       
        
    }

    useEffect(() => {
        getFriends();
    },[]);

    return (
        <div className="friend-list shadow-lg p-3">
            <div className="title-box">
            <h3 className="mb-2" id="list-title">Friends</h3>
             
            </div>
            {friends.length === 0 ?
            
            <div className="friend-list-place-holder">
                <h3>No friends Yet...</h3>
            </div>
            :
            <div className="friend-list-actual ">
                    {friends.map((friend) => {
                        return <div key={friend.id} className="shadow-sm list-item-friend d-flex align-items-center justify-content-center">
                            <div className="col-3">
                                <ProfileCircle image={friend.image} userId={friend.id} styleName="profile-circle-x-small  " />
                            </div>
                            <div className="col-6 line-clamp">
                                <h3 className="text-center" id="list-item-fr-title">{friend.alias}</h3>
                               
                            </div>
                            <div className="col-3">
                                <FontAwesomeIcon onClick={(e) => chatClick(e,{id:friend.id,alias:friend.alias,image:friend.image})} className=" fa-green-color fa-btn-effect" icon={faEnvelope} size="lg" />
                            </div>
                     </div>
                    })}
            </div>
        }     
       
       <ListRequest getFriends={getFriends} />
        </div>
    )

}

export default FriendList;