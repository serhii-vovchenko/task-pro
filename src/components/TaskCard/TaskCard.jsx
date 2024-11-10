import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {format} from "date-fns"
import ReusableModal from '../ReusableModal/ReusableModal';
import TaskForm from '../TaskForm/TaskForm';
import { deleteTask, moveTask } from '../../redux/dashboard/tasks/operations';
import { selectUserTheme } from '../../redux/auth/selectors';
import { selectBoardColumns } from '../../redux/dashboard/currentBoard/selectors';
import sprite from '../../img/icons.svg';
import s from './TaskCard.module.css';

const TaskCard = ({ taskObj }) => {

  const theme = useSelector(selectUserTheme)

  const colorPriority = [
    {
      priority: 'none',
      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(22, 22, 22, 0.3)',
    },
    {
      priority: 'low',
      color: 'rgba(143, 161, 208, 1)',
    },
    {
      priority: 'medium',
      color: 'rgba(224, 156, 181, 1)',
    },
    {
      priority: 'high',
      color: 'rgba(190, 219, 176, 1)',
    },
  ];

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)
  const columns = useSelector(selectBoardColumns)
  const color = colorPriority.find(
    priority => priority.priority === taskObj?.priority
  );
  
  const columnsList = columns.filter(column => column._id !== taskObj.columnId)

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: taskObj._id, columnId: taskObj.columnId }));
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBlur = (event) => {
    if (!dropdownRef.current.contains(event.relatedTarget)) {
      setIsDropdownOpen(false)
    }
  }

  const handleMove = (idColumn) => {
    dispatch(moveTask({ taskId: taskObj._id, newColumnId: idColumn }))
    setIsDropdownOpen(false)
  }
  return (
    <>
      <div
        className={s.cardTask}
        style={{ '--custom-colorCard': `${color.color}` }}
      >
        <h4 className={s.taskTitle}>{taskObj.title}</h4>
        <p className={s.taskDescription}>{taskObj.description}</p>
        <div className={s.lowerCont}>
          <div>
            <div className={s.contWithMarkings}>
              <p className={s.lowerContTitle}>Priority</p>
              <div className={s.contWithCircle}>
                <span className={s.priorityCircle}></span>
                <span className={s.lowerContText}>{taskObj.priority === "none" ? 'Without' : taskObj.priority.charAt(0).toUpperCase() + taskObj.priority.slice(1)}</span>
              </div>
            </div>
            <div className={s.contWithMarkings}>
              <p className={s.lowerContTitle}>Deadline</p>
              <p className={s.lowerContText}>{format(taskObj.deadline, 'dd/MM/yyyy')}</p>
            </div>
          </div>
          <ul>
            { format(new Date(), "dd/MM/yyyy") === format(taskObj.deadline, 'dd/MM/yyyy') &&
              <li>
              <svg className={s.iconBell} width="16px" height="16px">
                <use href={`${sprite}#icon-bell`} />
              </svg>
            </li>}
            <li>
              <button onClick={toggleDropdown}  onBlur={handleBlur}>
                <svg className={s.icon} width="16px" height="16px">
                  <use href={`${sprite}#icon-arrow-circle-broken-right`} />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className={s.dropdownMenu} tabIndex="-1" ref={dropdownRef}>
                  <ul> 
                    {columnsList.map((column) => (
                      <li key={column._id} >
                        <button onClick={()=> handleMove(column._id)}>
                            <span className={s.dropdownColumnTitle}>
                              {column.title}
                            </span>
                            <span>
                              <svg className={s.icon} width="16px" height="16px">
                                <use href={`${sprite}#icon-arrow-circle-broken-right`} />
                              </svg>
                            </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <button onClick={() => handleEdit()}>
                <svg className={s.icon} width="16px" height="16px">
                  <use href={`${sprite}#icon-pencil`} />
                </svg>
              </button>
            </li>
            <li>
              <button onClick={() => handleDelete()}>
                <svg className={s.icon} width="16px" height="16px">
                  <use href={`${sprite}#icon-trash`} />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ReusableModal
        isOpen={isOpen}
        onClose={() => handleClose()}
        children={
          <TaskForm
            initialTaskValue={taskObj}
            handleClose={handleClose}
            typeOfPopUp={'Edit'}
          />
        }
      />
    </>
  );
};

export default TaskCard;
