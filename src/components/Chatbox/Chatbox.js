import { faBan, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { convertTime } from '../../functions/helpers';
import ProfileCircle from '../ProfileCircle/ProfileCircle';
import './Chatbox.css';

const Chatbox = ({chatFriend, setShowChatBox, messages, setMessages}) => {
    const [text,setText] = useState('');

    const sendText = async(e) => {
        e.preventDefault();
        try {
           const response = await axios.post(`${process.env.REACT_APP_BACKEND}/user/${chatFriend.id}/message`,{
                info: text
            },{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            });
            setText('');
            setMessages(response.data.messages);

            

        }
        catch(error) {

        }
    }

    const syncMessages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/${chatFriend.id}/message`,{
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            });

            setMessages(response.data.messages);
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight
      }, [ messages])

    return (
        <div className="chat-box shadow line-clamp">
            <div className="title-box">
                <h3>{chatFriend.alias}</h3>
                <FontAwesomeIcon onClick={syncMessages} className="fa-btn-effect chat-refresh" icon={faSync} />
                <FontAwesomeIcon onClick={() => setShowChatBox(false)} className="fa-btn-effect chat-close" icon={faBan} />
            </div>
            <div className={`chat-messages d-flex flex-column ${messages.length <  3 ? 'justify-content-end': ''} pt-4 px-2`}>
                {
                    messages.map(message => (
                        message.user.id === chatFriend.id ?
                            <div key={message.id}>
                                <div className="mb-3 d-flex align-items-center">
                                   
                                    <div className="col-3 mb-3">
                                    <ProfileCircle image={chatFriend.image} userId={chatFriend.id} styleName="profile-circle-x-small  ml-auto" />
                                
                                    </div>
                                    <div className="col-9">
                                        <p className="">{message.info}</p>
                                    </div>
                                </div>
                                <p className="text-small ml-2 time-text text-left">{convertTime(message.updatedAt)}</p>
                            </div>
                            :
                            <div key={message.id} className="mb-3 d-flex text-right ">
                                <div className="col-12">
                                <p className="">{message.info}</p>
                                <p className="text-small time-text text-right">{convertTime(message.updatedAt)}</p>
                                </div>
                            </div>
                    ))


                }
            

            </div>
            

            <form onSubmit={sendText} className="input-container">
                <input onChange={(e) => setText(e.target.value)} value={text} className="chat-input" type="text" placeholder="send a message"/>    
                <button  className="chat-send"> Send</button>
            </form>    
            
        </div>
    )
}

export default Chatbox;