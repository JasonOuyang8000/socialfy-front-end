import { useState } from 'react';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Slideshow from '../components/SlideShow/Slideshow';
import './Form.css';

const Form = () => {

    const [isSignup, setIsSignup] = useState(true);

   

    return (
    <div className="form-holder">
        <div className="form-container row shadow-lg">
       
            <div className="col-lg-5 h-100 d-none d-lg-block p-0">
                    <Slideshow />
                </div>
                <div className="col-lg-7 col-md-12  p-4 d-flex flex-column justify-content-center">
                    <h1 id="sign-title" className="text-center mb-5 font-weight-bold">
                            {isSignup ? 'Create a Quick Account' : 'Login'}
                    </h1>
                    {isSignup ? <Signup /> : <Login /> }
                    
                    <button 
                    onClick={() => setIsSignup(!isSignup)} 
                    className="mt-5 switch-button d-block mx-auto">
                    
                    {isSignup ? 'Got an Account' : 'No Account?'}
                        
                    </button>
                </div>
               
            </div>

        
    </div>);

};


export default Form;