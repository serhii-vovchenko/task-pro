import { useState } from "react"
import ReusableModal from "../ReusableModal/ReusableModal"
import TaskForm from "../TaskForm/TaskForm"
import sprite from "../../img/icons.svg"
import s from "./TaskCard.module.css"
import { useDispatch } from "react-redux"
import { deleteTask } from "../../redux/dashboard/tasks/operations"

const colorPriority = [
    {
        priority: "none",
        color: 'rgba(255, 255, 255, 0.3)'
    },
    {
        priority: "low",
        color: 'rgba(143, 161, 208, 1)'
    },{
        priority: "medium",
        color: 'rgba(224, 156, 181, 1)'
    },{
        priority: "high",
        color: 'rgba(190, 219, 176, 1)'
    },
]


const TaskCard = ({taskObj}) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const color = colorPriority.find(priority => priority.priority === taskObj?.priority)

    const handleEdit = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleDelete = () => {
        dispatch(deleteTask(taskObj._id))
    }
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    return (
        <>
            <div className={s.cardTask} style={{"--custom-colorCard": `${color.color}`}}>
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
                            <button onClick={()=> toggleDropdown()}>
                                <svg className={s.icon} width="16px" height="16px">
                                    <use href={`${sprite}#icon-arrow-circle-broken-right`} />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className={s.dropdownMenu}>
                                    <ul>
                                        <li onClick={() => console.log("Move to Column 1")}>Move to Column 1</li>
                                        <li onClick={() => console.log("Move to Column 2")}>Move to Column 2</li>
                                        <li onClick={() => console.log("Move to Column 3")}>Move to Column 3</li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li>
                            <button onClick={()=> handleEdit()}>
                                <svg className={s.icon} width="16px" height="16px">
                                    <use href={`${sprite}#icon-pencil`}/>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button onClick={()=> handleDelete()}>
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