import { useDispatch } from 'react-redux';
import sprite from '../../../../src/img/icons.svg';
import s from './Logout.module.css';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../../redux/auth/operations';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <button className={s.logoutButton} onClick={handleLogOut}>
      <svg className={s.logoutBtnIcon} height="32" width="32">
        <use href={`${sprite}#icon-logout`} />
      </svg>
      <span>Log out</span>
    </button>
  );
};

export default Logout;
