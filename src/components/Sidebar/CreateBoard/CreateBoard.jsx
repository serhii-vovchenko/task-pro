import sprite from '../../../../src/img/icons.svg';
import s from './CreateBoard.module.css';

const CreateBoard = () => {
  return (
    <>
      <h3 className={s.subTitle}>My boards</h3>
      <div className={s.createBoardBox}>
        <p className={s.text}>Create a new board</p>
        <button className={s.addButton}>
          <svg className={s.plusIconBtn} height="20" width="20">
            <use href={`${sprite}#icon-plus`} />
          </svg>
        </button>
      </div>
    </>
  );
};

export default CreateBoard;
