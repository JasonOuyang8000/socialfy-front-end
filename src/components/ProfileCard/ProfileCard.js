import ProfileCircle from '../ProfileCircle/ProfileCircle';
import './ProfileCard.css';

const ProfileCard = ({user}) => {

    return (
        
        <div className="profile-card text-center shadow p-3 mb-5">
            <ProfileCircle styleName="user-profile-circle bg d-block mx-auto mb-5" image={user.image} userId={user.id} />
            <h3 className="line-clamp">{user.alias}</h3>

        </div >
    );


}

export default ProfileCard;