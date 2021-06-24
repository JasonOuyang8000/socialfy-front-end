import { useContext, useEffect } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import './Error.css';

export default function Error({message}) {

    const {error, setError} = useContext(ErrorContext);



    useEffect(() => {
        setTimeout(() => {
            setError({isError:false, message:''});
        },2000)
    },[])

    return (
        <div className="error-block">
            {message.toUpperCase()}
        </div>
    );
 
 }