import './_userCard.scss';
import defaultAvatar from '../../../assets/photo-cover.svg'
import {phoneFormat} from "../../../lib/helpers";

const UserCard = ({photo, name, position, email, phone}) => {
    return (
        <div className={'user-card'}>
            <img src={photo || defaultAvatar}
                 alt="avatar"
                 className={'photo'} />

            <p className={'name'} title={name}>{name}</p>
            <p className={'position'} title={position}>{position}</p>
            <p className={'email'} title={email}>{email}</p>
            <p className={'phone'} title={phone}>{phoneFormat(phone)}</p>
        </div>
    );
};

export default UserCard;