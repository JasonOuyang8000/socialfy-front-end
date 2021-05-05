import { faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './PostForm.css';



const PostForm = ({handleClick,disabled}) => {
    
    const [formParams, setFormParams] = useState({
        file: '',
        description: '',
        fileCode: ''
    });


    const handleChange = e => {
        e.preventDefault();

        const { value }  = e.target;

        setFormParams({
            ...formParams,
            description: value
        });
    };


    const handleFormParams = () => {
        handleClick(formParams);
        setFormParams({
            file: "",
            fileCode: "",
            description: '',
        });
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const savedFile = e.target.files[0];

            let reader = new FileReader();

            reader.onload = (e) => {

                setFormParams({
                    ...formParams,
                    file: savedFile,
                    fileCode: e.target.result
                });
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleMinusImage = () => {
        setFormParams({
            ...formParams,
            file: "",
            fileCode: ""
        });
    }

   




    return (
        <div className={`post-form mb-5 p-4 d-flex flex-column align-items-center shadow ${disabled ? 'opacity-disabled' : ''}`}>
            <textarea value={formParams.description} onChange={handleChange} placeholder="Write a post..." disabled={disabled}/>
                
         
            {(formParams.file !== "" && formParams.fileCode !== "") && <div className="position-relative">
                <img className="mb-4" src={formParams.fileCode} alt="test" />
                <FontAwesomeIcon onClick={handleMinusImage} className="minus-image" icon={faTrashAlt} size="5x"/>
                </div>
                
                 }
           
            <div className="group w-100 d-flex justify-content-center align-items-center">
                <div className="image-upload mr-5">
                        <label htmlFor="file-input">
                            <FontAwesomeIcon className="upload-icon" icon={faUpload} size="2x"/>
                        </label>

                        <input id="file-input" type="file" name="myImage" onChange={handleImageChange} />
                </div>
                <button onClick={handleFormParams} className="col-4 btn-post">Post</button>
            </div>
           
             
          
           
        </div>
    );
}

export default PostForm;