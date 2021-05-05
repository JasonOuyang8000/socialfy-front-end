import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { faSync } from '@fortawesome/free-solid-svg-icons';


import './Login.css'
import axios from 'axios';
import { UserContext } from '../../context/UserContext';


const Login = () => {
 
    const [formParams, setFormParams] = useState({
        key:''
    });

    const {user, setUser} = useContext(UserContext);
    
 

    const handleTextChange = (e) => {
        const { value } = e.target;
        
        setFormParams({
            ...formParams,
            key: value
        });
    }
    


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, formParams);
            setUser(response.data.user);
         
            localStorage.setItem('userToken', response.data.userToken);
        }

        catch(error) {
            
            if (error.response) console.log(error.response.data.error.message);
        }
       
    };


   

    return (
        <form onSubmit={handleSubmit} className="form mx-auto w-50 ">
            <div className="mb-5">
                <textarea onChange={handleTextChange} type="text" className="w-100 sign-input-text" values={formParams.key} placeholder="Enter Your Secret Token"/>
            </div>

           

            <input type="submit" value="Login" className="btn-submit" />
           
            
        </form>
    )
}

export default Login;