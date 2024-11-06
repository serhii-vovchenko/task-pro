import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors"; 
import s from "./UserInfo.module.css"; 

const UserInfo = ({ onUserPhotoClick }) => {
  const user = useSelector(selectUser); 

  return (
    <div className={s.userInfo} onClick={onUserPhotoClick}>
      
      <img src={user.photo || 'path/to/default-avatar.png'} alt={user.name || 'User Avatar'} className={s.userAvatar} />
      <span className={s.userName}>{user.name || 'Guest'}</span>
    </div>
  );
};

export default UserInfo;
