import { useSelector } from 'react-redux';
import TaskCard from '../TaskCard/TaskCard';
import s from './TaskList.module.css';
// import { useEffect } from 'react';
// import { getCurrentBoard } from '../../redux/dashboard/currentBoard/operations';
import {
  //   currentBoard,
  selectTasksByColumnId,
} from '../../redux/dashboard/currentBoard/selectors';

const TaskList = ({ columnId }) => {
  const tasks = useSelector(selectTasksByColumnId(columnId));
  return (
    <>
      {tasks && (
        <ul className={s.taskList}>
          {tasks.map(task => (
            <li key={task.id}>
              <TaskCard taskObj={task} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
