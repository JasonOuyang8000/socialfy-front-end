import './PostCard.css';
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import ProfileCircle from '../ProfileCircle/ProfileCircle';
import { checkLiked, convertTime, getLikes } from '../../functions/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Comments from '../Comments/Comments';
import axios from 'axios';



const PostCard = ({user, description, updatedAt, id, postLikes, setPosts, posts, handleDelete, comments, postImage}) => {  

    const [showComments, setShowComments] = useState(false);
    const [likeSelected, setLikeSelected] = useState(false);
    const {user: currentUser} = useContext(UserContext);

    const updateLike = async() => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND}/post/${id}/like`,{

            },{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            });

            const {post} = response.data;

            const postsCopy = [...posts];

            for (let i = 0; i < postsCopy.length; i++) {
                if (post.id === postsCopy[i].id) {
                    postsCopy[i] = post;
                }
            }
            setPosts(postsCopy);
        }
        catch(error) {

        }
      
    }

    const handleLike = () => {
        setLikeSelected(!likeSelected);
        updateLike();
    }

   
 

    
    return (
        <div className="mb-5">
            <div className="post-card row no-gutters position-relative flex-lg-row p-4 shadow">
                <div className="col-3 d-flex justify-content-end">
                    <ProfileCircle image={user.image} userId={user.id} styleName="profile-circle-small mr-3 mt-2" />
                </div>
                <div className="col-9">
                    <h3 className="post-card-name mt-3">{user.alias}</h3>
                    <p className="card-time">{convertTime(updatedAt)}</p>
                    <p className="mt-4 description-text">{description}</p>
                    
                </div>
                {postImage !== null  && <img src={postImage.link} alt="post" />}
                <div className="col-12 d-flex">
                    <div 
                    onClick={() => setShowComments(!showComments)}  
                    className={`${currentUser.id === user.id ? 'col-4': 'col-6'} d-flex justify-content-center align-items-center icon-card ${showComments ? 'like-selected': ''}`}

                    >
                    <FontAwesomeIcon
                     icon={faComment}
                     size="lg"
                      /> 
                     <span 
                    className="ml-2 like-text"
                    >
                     {comments.length > 0 && comments.length}

                    </span>  
                    </div>
                    

                    <div 
                    onClick={handleLike}
                    className={`${currentUser.id === user.id ? 'col-4': 'col-6'} d-flex justify-content-center align-items-center icon-card ${checkLiked(postLikes,currentUser) ? 'like-selected': ''}`}>
                    <FontAwesomeIcon 
                    icon={faThumbsUp} 
                    size="lg"
                    /> 
                    <span 
                    className="ml-2 like-text"
                    >
                    {
                    getLikes(postLikes) 
                        || 
                        0
                    }
                    </span>
                    </div>
                    {currentUser.id === user.id && 
                        <div className="col-4 d-flex justify-content-center align-items-center icon-card">
                            <FontAwesomeIcon icon={faTrashAlt}  size="lg" onClick={(e) => handleDelete(e,id)} />
                        </div>  
                    }
                   
                </div>
            </div>

            {showComments && 
            <Comments 
            posts={posts} 
            setPosts={setPosts} 
            setShowComments={setShowComments} 
            showComments={showComments} 
            id={id} 
            image={user.image}
            postOwner={user}
            />}
            

        </div>
    )
};

export default PostCard;