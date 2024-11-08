import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserInfo.module.css';
import sprite from '../../../src/img/icons.svg';
import { useState } from 'react';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

const UserInfo = () => {
  const user = useSelector(selectUser);

  const [updateUserModal, setUpdateUserModal] = useState(true);
  // console.log(user.theme);

  const clickOnUpdate = () => {
    setUpdateUserModal(true);
  };

  const userAvatar =
    user.photoUrl === null ? (
      <svg className={s.avatarIcon} height="32" width="32">
        <use href={`${sprite}#icon-user`} />
      </svg>
    ) : (
      <img className={s.userAvatar} src={user.photoUrl} />
    );

  return (
    <>
      <div className={s.userInfo} onClick={clickOnUpdate}>
        <p className={s.userName}>{user.name}</p>
        <div className={s.imgBox}>{userAvatar}</div>
      </div>
      {updateUserModal && <EditProfileModal />}
    </>
  );
};

export default UserInfo;
