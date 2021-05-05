
import { convertTime } from '../../functions/helpers';
import ProfileCircle from '../ProfileCircle/ProfileCircle';
import './Comment.css';



const Comment = ({userId,description,user,updatedAt,postOwner}) => {

    return (
     
            <div className="mb-3 comment-section d-flex ">
                <div className="col-2">
                <ProfileCircle image={user.image} userId={userId} styleName="profile-circle-x-small  ml-auto" />
               
                </div>
                <div className="col-10">
                    <h3 className="comment-alias mr-4">{user.alias} {postOwner.alias === user.alias && "👑"} <span className="time-text">  {convertTime(updatedAt)}</span></h3>
                    <p className="w-75">{description}</p>
                    
                </div>
            </div>
      

     
    );
  
}


export default Comment;