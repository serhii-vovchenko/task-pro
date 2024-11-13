import { useSelector } from 'react-redux';
import TaskCard from '../TaskCard/TaskCard';
import { selectTasksByColumnId } from '../../redux/dashboard/currentBoard/selectors';
import s from './TaskList.module.css';

const TaskList = ({ columnId }) => {
  const tasks = useSelector(selectTasksByColumnId(columnId));
  return (
    <>
      {tasks && (
        <ul className={s.taskList}>
          {tasks.map(task => (
            <li key={task._id}>
              <TaskCard taskObj={task} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskList;
