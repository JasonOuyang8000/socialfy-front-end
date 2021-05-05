import Loader from "../Loader/Loader";

import PostCard from "../PostCard/PostCard";

const PostList = ({posts, loaded, setPosts, handleDelete}) => {
  
    return (
        <div className="post-list">
            {loaded 
            ? 
        
            posts.map((post) => (
                <PostCard key={post.id} {...post} setPosts={setPosts} posts={posts} handleDelete={handleDelete} />
            ))
                
            :
            <div style={{height: '400px'}} className="d-flex justify-content-center align-items-center">
                <Loader />
            </div>
            
        
            }
           

        </div>

    );
   
};


export default PostList;