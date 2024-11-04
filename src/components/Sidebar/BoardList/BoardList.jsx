import s from './BoardList.module.css';
import sprite from '../../../../src/img/icons.svg';

const BoardList = () => {
  return (
    <ul className={s.boardList}>
      <li className={s.boardItem}>
        <div className={s.titleBox}>
          <svg className={s.titleBoxIcon} height="18" width="18">
            <use href={`${sprite}#icon-project`} />
          </svg>
          <p className={s.titleBoxTitle}>Project office</p>
        </div>
        <div className={s.btnBox}>
          <button className={s.btnBoxButton}>
            <svg className={s.btnBoxIcon} height="16" width="16">
              <use href={`${sprite}#icon-pencil`} />
            </svg>
          </button>
          <button className={s.btnBoxButton}>
            <svg className={s.btnBoxIcon} height="16" width="16">
              <use href={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  );
};

export default BoardList;
