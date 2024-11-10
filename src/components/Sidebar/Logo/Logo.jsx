import { useSelector } from 'react-redux';
import sprite from '../../../../src/img/icons.svg';
import s from './Logo.module.css';
import { selectUser } from '../../../redux/auth/selectors';

const Logo = () => {
  const user = useSelector(selectUser);

  const logoIconSvg =
    user.theme === 'violet' ? 'icon-logo-violet' : 'icon-logo';

  return (
    <div className={s.logoBox}>
      <svg className={s.logoIcon} height="32" width="32">
        <use href={`${sprite}#${logoIconSvg}`} />
      </svg>
      <h2 className={s.title}>Task Pro</h2>
    </div>
  );
};

export default Logo;
