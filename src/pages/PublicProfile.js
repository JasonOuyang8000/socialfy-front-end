import PostList from "../components/PostList/PostList";
import ProfileCard from "../components/ProfileCard/ProfileCard";

import {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useHistory, useParams } from "react-router";
import LoaderThree from "../components/Loader/LoaderThree";
import FriendsCard from "../components/FriendsCard/FriendsCard";


const PublicProfile = () => {
    
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(null);
    const { id:profileId } = useParams();
    const [profileUser, setProfileUser] = useState({});
    const {user} = useContext(UserContext);
    const history = useHistory();

    const getPosts = async() => {
        try {
            setLoaded(false);
           
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/${profileId}/post`);
           
            setLoaded(true);
            setPosts(response.data.posts);
            setProfileUser(response.data.user);
        }
        catch(error) {
            setLoaded(true);
        
           
        }
    }

    
    const handleDelete = async(e,id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/post/${id}`,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            });

            

            getPosts();
        }   
        catch(error) {
            console.log(error);
        }
     
    }
     
   

    useEffect(() => {
        
        getPosts();
    }, [ profileId ]);

  

    return (
        <div className="container c-width-md mt-5">
            <div className="row justify-content-center">
                
                <div className="col-8">
                    {loaded ? 
                        <ProfileCard user={profileUser} />
                        :
                        <div style={{height: '400px'}} className="justify-content-center align-items-center d-flex">


                        <LoaderThree />
                        </div>
                    }
                </div>

                <div className="col-8">
                    <FriendsCard posts={posts} user={user} profileId={profileId}/>
                </div>
        
                <div className="col-8">
                
                    <PostList setPosts={setPosts} handleDelete={handleDelete} posts={posts}  loaded={loaded}/>
                </div>
            
               


            </div>
      
        </div>
    )
}



export default PublicProfile;