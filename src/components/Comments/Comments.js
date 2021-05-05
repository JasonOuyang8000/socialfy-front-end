import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Comment from '../Comment/Comment';
import LoaderThree from '../Loader/LoaderThree';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

import ProfileCircle from '../ProfileCircle/ProfileCircle';
import useWindowDimensions from '../WindowDimensions/WindowDimensions';
import './Comments.css';

const Comments = ({id, setShowComments, showComments, posts, setPosts, postOwner}) => {
    
    const {user} = useContext(UserContext);
    const [formParams, setFormParams] = useState({
        description: ''
    });
    const [loaded, setLoaded] = useState(null);
    const [comments, setComments] = useState([]);
    const { width } = useWindowDimensions();

    const getComments = async() => {
        setLoaded(false);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/post/${id}/comment`);
        setComments(response.data.comments);
        setLoaded(true);
        
    }


    const handleChange = e => {
        const { value } = e.target;

        setFormParams({
            ...formParams,
            description: value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (formParams.description !== '') {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/post/${id}/comment`,formParams,{
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
        });

       
        

        const postsCopy = [...posts];

        for (let i = 0; i < postsCopy.length; i++) {
            if (postsCopy[i].id === id) {
                postsCopy[i].comments.push(response.data.comment);
            }
        }

 
        

        setPosts(postsCopy);

      
        getComments();


        }
    }

    useEffect(() => {
        getComments();
    }, []);


    useEffect(() => {
        setFormParams({
            description: ''
        });
    }, [comments]);

 
    return (
        <div className="comments-section shadow ">
            <form onSubmit={handleSubmit} className="comment-form mb-5 d-flex align-items-center">
                <div className="col-2 ">
                    <ProfileCircle image={user.image} userId={user.id} styleName="profile-circle-x-small ml-auto mt-5" />
                </div>
                <div className="col-10 d-flex">
                    <input value={formParams.description} onChange={handleChange} className="mt-5  
                    col-8  comment-input shadow-sm" type="text" placeholder="Write an Opinion..." />
                    {
                    (formParams.description !== "" )  && 
                    <input className="mt-5 comment-send shadow-sm col-3 ml-2" type="submit" value="Send" />
                    }
                    
                </div>
            </form>
            {loaded ?
              comments.map(comment => (
                  <Comment key={comment.id} {...comment} postOwner={postOwner} />
              )) :
             <div style={{height: '200px'}} className="d-flex small-loader justify-content-center align-items-center">
                <LoaderThree />
             </div>
            }
            <div className="col-12 d-flex justify-content-center p-3">
                <FontAwesomeIcon onClick={() => setShowComments(!showComments)} className="close-comments-button" icon={faAngleDoubleUp}  size="lg"/>
            </div>
          
            

        </div>
    );

};

export default Comments;