import { useDispatch, useSelector } from 'react-redux';
import sprite from '../../../../src/img/icons.svg';
import s from './Logout.module.css';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../../redux/auth/operations';

const Logout = () => {
  const accessToken = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logoutThunk(accessToken));
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
