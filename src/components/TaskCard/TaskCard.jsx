import s from "./TaskCard.module.css"
import sprite from "../../img/icons.svg"
const TaskCard = () => {
    return (
        <>
            <div className={s.cardTask}>
                <h4 className={s.taskTitle}>Title</h4>
                <p className={s.taskDescription}>description</p>
                <div className={s.lowerCont}>
                    <div>
                        <div className={s.contWithMarkings}>
                            <p className={s.lowerContTitle}>Priority</p>
                            <div className={s.contWithCircle}>
                                <span className={s.priorityCircle}></span><span className={s.lowerContText}>Low</span>
                            </div>
                        </div>
                        <div className={s.contWithMarkings}>
                            <p className={s.lowerContTitle}>Deadline</p>
                            <p className={s.lowerContText}>Date</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <button>
                                <svg className={s.icon} width="16px" height="16px">
                                    <use href={`${sprite}#icon-arrow-circle-broken-right`} />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button>
                                <svg className={s.icon} width="16px" height="16px">
                                    <use href={`${sprite}#icon-pencil`}/>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button>
                                <svg className={s.icon} width="16px" height="16px">
                                    <use href={`${sprite}#icon-trash`} />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        
        </>
    );
}
 
export default TaskCard;