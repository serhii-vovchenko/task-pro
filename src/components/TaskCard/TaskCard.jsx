import s from "./TaskCard.module.css"
import sprite from "../../img/icons.svg"
import { useState } from "react"
import ReusableModal from "../Modal/Modal"
import TaskForm from "../TaskForm/TaskForm"

const taskObj = {
    title: "Title card 1",
    description: "decription card 1",
    priority: "low",
    deadline: "08/10/2024"
}

const TaskCard = () => {

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        console.log("modal is closed");
    }



    return (
        <>
            <div className={s.cardTask}>
                <h4 className={s.taskTitle}>{taskObj.title}</h4>
                <p className={s.taskDescription}>{taskObj.description}</p>
                <div className={s.lowerCont}>
                    <div>
                        <div className={s.contWithMarkings}>
                            <p className={s.lowerContTitle}>Priority</p>
                            <div className={s.contWithCircle}>
                                <span className={s.priorityCircle}></span><span className={s.lowerContText}>{taskObj.priority}</span>
                            </div>
                        </div>
                        <div className={s.contWithMarkings}>
                            <p className={s.lowerContTitle}>Deadline</p>
                            <p className={s.lowerContText}>{taskObj.deadline}</p>
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
                            <button onClick={()=> handleClick()}>
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
            <ReusableModal isOpen={isOpen} onClose={()=> handleClose()} children={<TaskForm initialTaskValue={taskObj} typeOfPopUp={'Edit'} />}/>
        </>
    );
}
 
export default TaskCard;