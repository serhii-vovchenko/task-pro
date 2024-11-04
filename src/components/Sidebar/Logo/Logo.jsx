import sprite from '../../../../src/img/icons.svg';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <div className={s.logoBox}>
      <svg className={s.logoIcon} height="32" width="32">
        <use href={`${sprite}#icon-logo`} />
      </svg>
      <h2 className={s.title}>Task Pro</h2>
    </div>
  );
};

export default Logo;
