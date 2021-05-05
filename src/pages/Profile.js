import PostForm from "../components/PostForm/PostForm"
import PostList from "../components/PostList/PostList"
import ProfileCard from "../components/ProfileCard/ProfileCard";

import {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { UserContext } from "../context/UserContext";


const Profile = () => {
    
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const {user: currentUser} = useContext(UserContext);

    const getPosts = async() => {
        try {
            setLoaded(false);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/${currentUser.id}/post`);
            setLoaded(true);
            setPosts(response.data.posts);
        }
        catch(error) {
            console.log(error);
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
    

    
    const handleClick = async (formParams) => {
        try {
            if(formParams.description === '' && formParams.file === '') throw new Error("Post can't be empty!!");
            setDisabled(true);
            const formData = new FormData();
            formData.append('description', formParams.description);
            if (formParams.file !== "") formData.append('file', formParams.file);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/post`, formData,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken'),
                    'content-type': 'multipart/form-data'
                }
            });
            await new Promise(resolve => {
                setTimeout(resolve, 100)
            });
            setDisabled(false);
            getPosts();
        }
        catch(error)  {
          
            setLoaded(true);
            setDisabled(false);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container c-width-md mt-5">
            <div className="row ">
            <div className="col-12 col-lg-4">
               <ProfileCard  user={currentUser} />
                
            </div>
       
            <div className="col-12 col-lg-8 ">
                <PostForm handleClick={handleClick}  disabled={disabled}/>
                <PostList setPosts={setPosts} handleDelete={handleDelete} posts={posts} loaded={loaded}/>
            </div>
           
         


            </div>
      
        </div>
    )
}



export default Profile;