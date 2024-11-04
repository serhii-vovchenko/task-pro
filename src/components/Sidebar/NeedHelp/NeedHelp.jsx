import sprite from '../../../../src/img/icons.svg';
import plant from '../../../img/plant_2x.webp';
import s from './NeedHelp.module.css';

const NeedHelp = () => {
  return (
    <div className={s.helpBox}>
      <img
        src={plant}
        alt="WelcomeIMG"
        className={s.plantImg}
        width="54"
        height="78"
      />
      <p className={s.helpBoxText}>
        If you need help with <span>TaskPro</span>, check out our support
        resources or reach out to our customer support team.
      </p>
      <button className={s.helpButton}>
        <svg className={s.helpBtnIcon} height="20" width="20">
          <use href={`${sprite}#icon-help-circle`} />
        </svg>
        <span>Need help?</span>
      </button>
    </div>
  );
};

export default NeedHelp;
