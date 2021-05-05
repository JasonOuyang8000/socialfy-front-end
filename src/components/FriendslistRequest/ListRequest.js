import { faBan, faCheck, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileCircle from "../ProfileCircle/ProfileCircle";

const ListRequest = ({getFriends}) => {
    const [requests, setRequests] = useState({
        received: [],
        requested: []
    });
    
    const getRequests = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/request`,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            });

            setRequests(response.data.requests);
        }
        catch(error) {
            console.log(error);
        }
    }

    const handleClick = async(e, cancel,profileId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND}/user/${profileId}/request`,{
               cancel
            },{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            }); 
          
            setRequests(response.data.requests);
        
           
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

    useEffect(() => {
        getFriends();
    }, [requests])

    const syncFriends = () => {
        getRequests();
    }

    return (
        <div className="list-request">
            <h3>Receieved</h3>
            <FontAwesomeIcon onClick={syncFriends} className="fa-btn-effect sync-color sync-btn-friends" size="lg" icon={faSync}/>

            {requests.received.length === 0 ?
            <div className="request-placeholder">
                <h3>None Received Yet...</h3>
            </div>
            :
            <div className="requested-box p-3">
            {
            requests.received.map(r => (
                <div className="list-item-friend shadow-sm d-flex align-items-center" key={r.id}>
                    <div className="col-3">
                        <ProfileCircle image={r.sentRequests.image} userId={r.sentRequests.id} styleName="profile-circle-x-small" />
                    </div>
                    <div className="col-6 line-clamp">
                       <h3 className="">{r.sentRequests.alias}</h3> 
                    </div>
                    <div className="col-3 d-flex flex-column">
                       <FontAwesomeIcon onClick={(e) => handleClick(e,false,r.sentRequests.id)} className="fa-green-color fa-btn-effect" icon={faCheck} />
                       <FontAwesomeIcon onClick={(e) => handleClick(e,true,r.sentRequests.id)} className="fa-red-color mt-2 fa-btn-effect" icon={faBan} />
                    </div>
                </div>
            ))
            }
            </div>
            }

   
        <h3>Requested</h3>
      
            {requests.requested.length === 0 ?
                <div className="request-placeholder">
                    <h3>No Requests Yet...</h3>
                </div>
          
            :
            <div className="requested-box p-3">
            {requests.requested.map(r => (
                <div className="list-item-friend shadow-sm d-flex align-items-center" key={r.id}>
                    <div className="col-3">
                        <ProfileCircle image={r.receivedRequests.image} userId={r.receivedRequests.id} styleName="profile-circle-x-small  " />
                    </div>
                    <div className="col-6 line-clamp">
                       <h3 >{r.receivedRequests.alias}</h3> 
                    </div>
                    <div className="col-3">
                       <FontAwesomeIcon onClick={(e) => handleClick(e,true,r.receivedRequests.id)} className="fa-red-color fa-btn-effect" icon={faBan} />
                    </div>
                </div>
          
            ))}
            </div>
            }
  
        

      

     </div>
       
    );
}

export default ListRequest;