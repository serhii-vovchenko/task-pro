import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserInfo.module.css';
import sprite from '../../../src/img/icons.svg';

const UserInfo = ({ onUserPhotoClick }) => {
  const user = useSelector(selectUser);

  const userAvatar =
    user.photoUrl === null ? (
      <svg className={s.avatarIcon} height="32" width="32">
        <use href={`${sprite}#icon-user`} />
      </svg>
    ) : (
      <img className={s.userAvatar} src={userAvatar} />
    );

  return (
    <div className={s.userInfo} onClick={onUserPhotoClick}>
      <p className={s.userName}>{user.name || 'Guest'}</p>
      <div className={s.imgBox}>{userAvatar}</div>
    </div>
  );
};

export default UserInfo;
