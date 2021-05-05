import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './Slideshow.css';

export default function Slideshow (){
    const isCancelled = useRef(false);
    const [images, setImages] = useState(['https://images.unsplash.com/photo-1620179748536-3d77b34fa73d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80','https://images.unsplash.com/photo-1620151891801-31de96da6766?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80','https://images.unsplash.com/photo-1620143201180-cbe9d6efeb1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80','https://images.unsplash.com/photo-1616851928715-3173db62a78c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80','https://images.unsplash.com/photo-1620095087136-e647156360b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80','https://images.unsplash.com/photo-1620097064445-1a64d19ff2f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    let timer = null;


    const changeImageIndex = () => {
        const img = document.querySelector('.slideshow img');
        img.classList.add('fadein-image');
        timer = setTimeout(() => {
            img.classList.remove('fadein-image');
            setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
        },4000);     
    }

    useEffect(() => {
        changeImageIndex();
        
        

        return () => clearTimeout(timer);
    }, [ currentImageIndex ]);

    useEffect(() => {
        const pageNumber = Math.floor((Math.random() * 4) + 1);
        axios.get(`https://api.pexels.com/v1/search?query=nature&per_page=20&page=${pageNumber}`,{
            headers: {
                authorization: process.env.REACT_APP_API_KEY
            }
        }).then(res => {
            
            const { photos } = res.data;
            const imagesCopy = photos.map(info => info.src.large);
            if (!isCancelled.current) {
                setImages(imagesCopy);
            }
        
        }).catch(error => {
            console.log(error);
        })

        return() => {
            isCancelled.current = true;
        }
    }, []);


    return (
        <div className="slideshow shadow">
            <img src={images[currentImageIndex]}  alt={'image-' + currentImageIndex} />


        </div>
    );
}