import moment from 'moment';

export const convertTime = (time) => {
    return moment(time).fromNow();
}

export const getLikes = (likeArray) => {
    let count = 0;

    for (let i = 0; i < likeArray.length; i++) {
        if (likeArray[i].liked) count ++
    };

    return count;
}

export const checkLiked = (likeArray, user) => {
    for (let i = 0; i < likeArray.length; i++ ){
        
       
        if (likeArray[i].userId === user.id) {
            return likeArray[i].liked;
        }
    }

    return false;
}

export const checkFriend = (friendsArray, userId) => {
    for (let i=0; i < friendsArray.length; i++) {
       
        if (friendsArray[i].id === userId) return true;
    }
   

    return false;
}

export const checkRequested = (requested, userId, profileId) => {
    
    for (let i = 0; i < requested.length; i++) {
        if (requested[i].requestId === profileId && requested[i].sentId === userId) {
            
            return true;
        }
    }
 
    return false;
}