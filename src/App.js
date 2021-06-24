import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './headers/Navbar';
import { Redirect, Route, Switch } from 'react-router';
import Home from './pages/Home';
import {ThemeContext} from './context/ThemeContext';
import { Fragment, useEffect, useRef, useState } from 'react';
import { UserContext } from './context/UserContext';
import { ErrorContext } from './context/ErrorContext';
import Form from './pages/Form';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Error from './components/Error/Error';
function App() {
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState(false);
 
  const verifyUser = async() => {
    if (localStorage.getItem('userToken')) {
      try {
        setLoaded(false);
        let isCancelled = false;
       
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/verify`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('userToken')
          }
        });
        
       
        if (!isCancelled) {
          setUser(response.data.user);
          setLoaded(true);
        }
        
        return () => {
          isCancelled = true;
        };
        
      }
      catch(error) {
        localStorage.removeItem('userToken');
        setLoaded(true);
      }

    }
  }


  useEffect(() => {
    verifyUser();

  },[]);  




  return (
    <UserContext.Provider value={{user,setUser}}>
    <ThemeContext.Provider value={{theme,setTheme}}>
    <ErrorContext.Provider value={{error,setError}}>
    {error.isError && <Error message={error.message}/> }
    <div className={`App ${user !== null ? 'nav-space' : ''}`} data-theme={theme}>
        
        {user !== null &&  <Navbar setUser={setUser} user={user}data-theme={theme} themeControl={{theme,setTheme}}/> 
        
        }
      
     
        <Switch>
        {user !== null ? 
        <Fragment>
          <Route exact path ="/">
            {
              loaded ? 
                <Home />
              :
              <div style={{height: "70vh"}} className="d-flex justify-content-center align-items-center">
                <Loader/>
              </div>
            }
          </Route>
          <Route exact path ="/profile">
            {
              loaded ? 
                <Profile />
              :
              <div style={{height: "70vh"}} className="d-flex justify-content-center align-items-center">
                <Loader/>
              </div>
            }
          </Route>
          <Route path="/profile/:id">
          
          <PublicProfile />
          </Route>
        </Fragment>
          :
          <Route path ="/">
               <Redirect to="/" />
            <Form/>
          </Route>
         
        }
        </Switch>
    </div>
    </ErrorContext.Provider>
    </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
