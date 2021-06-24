import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useContext, useEffect, useState } from 'react';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { ErrorContext } from '../../context/ErrorContext';

import './Signup.css';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import LoaderTwo from '../Loader/LoaderTwo';
import Modal from 'react-modal';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const Signup = () => {
    const choices = ['male', 'female', 'human', 'identicon', 'initials', 'bottts', 'avataaars', 'jdenticon', 'gridy','micah'];
    
    const [count, setCount] = useState(0);
    const [loaded, setLoaded] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [tempUser, setTempUser] = useState({
        alias: '',
        image: '',
        id: '',
        key: ''
    })
 
 
    const [formParams, setFormParams] = useState({
        alias: '',
        image:  `https://avatars.dicebear.com/api/female/${Math.floor(Math.random() * 10000)}.svg`,
    });

    const {user, setUser} = useContext(UserContext);
    const {error, setError} = useContext(ErrorContext);
    

    const handleTextChange = (e) => {
        const { value } = e.target;
        
        setFormParams({
            ...formParams,
            alias: value
        });
    }
    
    const handleImageClick = (e) => {
        e.preventDefault();
        setCount(Math.floor(Math.random() * 10000));
        const randChoice = choices[Math.floor(Math.random() * choices.length)];
      
        const newImage = `https://avatars.dicebear.com/api/${randChoice}/${count}.svg`;

        setFormParams({
            ...formParams,
            image: newImage
        })
        

    }   


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (formParams.alias !== '') {
                setLoaded(false);
                const response = await axios.post(`${process.env.REACT_APP_BACKEND}/user`, formParams);
                setTempUser({
                    alias: response.data.user.alias,
                    image: response.data.user.image,
                    id: response.data.user.id,
                    key: response.data.user.key
                });

                setModalOpen(true);
              
                setLoaded(true);


                localStorage.setItem('userToken', response.data.userToken);
            }
            else {
                throw new Error("Alias cannot be empty!")
            }
         
        }

        catch(error) {
            setLoaded(true);
      
            if (error.response) setError({isError:true, message:error.response.data.error.message})
            else  setError({isError:true, message:error.message});
        }
       
    };

    const closeModal = () => {
        setModalOpen(false);
        setUser({
            alias: tempUser.alias,
            image: tempUser.image,
            id: tempUser.id,
        });
    }
   

   

    return (
        <Fragment>
      

        <form onSubmit={handleSubmit} className="form positon-relative">
            <div className="mb-5">
                <input onChange={handleTextChange} type="text" className="mx-auto d-block sign-input-text" placeholder="Enter an Alias"/>
            </div>

            <div className="mb-5">
                <h3 className="text-center mb-4">Your Profile Image</h3>
                <div 
                style={{backgroundImage:`url(${formParams.image})`}} 
                className="bg profile-circle d-block mx-auto mb-5"
                >
           
                </div> 
                <button onClick={handleImageClick} className="btn-green-custom generate-new-image d-block mx-auto">
                    <FontAwesomeIcon icon={faSync} />
                </button>

            
             
            </div>

            <input type="submit" value="Create Account" className="btn-submit" />

            <Modal 
            isOpen={modalOpen}
            style={customStyles}
            onRequestClose={closeModal}
            >
                <div className="modal-inside">
                    <h3 className="mb-4">Save Your Key</h3>
                    <p>The key is used to Login.</p>
                    <textarea className="custom-textarea" readOnly={true} value={tempUser.key}/>
                </div>
                <button onClick={closeModal} className="btn-modal">Okay</button>
                <button className="btn-modal" onClick={() => {navigator.clipboard.writeText(tempUser.key)}}
                >Copy to Clipboard</button>
            </Modal>


            {loaded || 
            <div className="position-absolute custom-pos">
                <LoaderTwo/>
            </div>
            }
        </form>


        </Fragment>
      
    )
}

export default Signup;