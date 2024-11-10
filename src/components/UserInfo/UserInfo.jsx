import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserInfo.module.css';
import sprite from '../../../src/img/icons.svg';
import { useState } from 'react';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

const UserInfo = () => {
  const user = useSelector(selectUser);

  const [updateUserModal, setUpdateUserModal] = useState(false);

  const clickOnUpdate = () => {
    setUpdateUserModal(true);
  };

  const userIcon =
    user.theme === 'light'
      ? 'icon-user-light'
      : user.theme === 'violet'
      ? 'icon-user-violet'
      : user.theme === 'dark'
      ? 'icon-user-dark'
      : null;

  const userAvatar =
    user.photoUrl === null ? (
      <svg className={s.avatarIcon} height="32" width="32">
        <use href={`${sprite}#${userIcon}`} />
      </svg>
    ) : (
      <img className={s.userAvatar} src={user.photoUrl} alt="User Avatar" />
    );

  return (
    <>
      <div className={s.userInfo} onClick={clickOnUpdate}>
        <p className={s.userName}>{user.name}</p>
        <div className={s.imgBox}>{userAvatar}</div>
      </div>
      {updateUserModal && <EditProfileModal isOpen={updateUserModal} onClose={() => setUpdateUserModal(false)}  />}
    </>
  );
};

export default UserInfo;
