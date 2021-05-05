import { NavLink as Link, useHistory } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt, faToggleOff, faToggleOn, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({themeControl, setUser, user}) => {

    const {theme, setTheme} = themeControl;

    const history = useHistory();

    const themeHandler = () => {
        setTheme(theme === 'light' ? 'dark' : 'light' );
    }

    const handleClick = () => {
        localStorage.removeItem('userToken');
        setUser(null);
        history.push('/');
        setTheme('light');
    }


    return (<nav className="navbar navbar-expand-lg shadow fixed-top position-sticky">
    <div className="container">
       <Link className="navbar-brand d-flex align-items-center no-active" to="/">
        <FontAwesomeIcon icon={faUsers} size="2x" />
            <h1 className="ml-2" id="brand-title">Socialfy</h1>
       </Link>

       
        

       
            <ul className="navbar-nav flex-row  ml-md-auto align-items-center" >
                <li className="nav-item">
                <Link exact activeClassName="active" className="nav-link" aria-current="page" to="/"><FontAwesomeIcon icon={faHome} size="2x" /></Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/profile"><FontAwesomeIcon icon={faUserCircle} size="2x" /></Link>
                </li>
                <li className="nav-item">
                <span onClick={handleClick} className="nav-link" to=""><FontAwesomeIcon icon={faSignOutAlt} size="2x" /> </span>
                </li>
                <li className="nav-item ml-5">
                    {theme === 'light' ? 
                    <FontAwesomeIcon onClick={themeHandler} className="pointer" icon={faToggleOn} size="2x" />
                        :
                    <FontAwesomeIcon onClick={themeHandler} className="pointer" icon={faToggleOff} size="2x" />
                    }
                </li>
            
            </ul>
       
    
    
        </div>
    </nav>)
};

export default Navbar;