import { useDispatch, useSelector } from 'react-redux'
import TaskCard from '../TaskCard/TaskCard'
import s from "./TaskList.module.css"
import { useEffect } from 'react'
import { getCurrentBoard } from '../../redux/dashboard/currentBoard/operations'
import { currentBoard } from '../../redux/dashboard/currentBoard/selectors'
import { writeToState } from "../../redux/dashboard/tasks/slice"
import { selectTasks } from '../../redux/dashboard/tasks/selectors'


const TaskList = () => {

    const dispatch = useDispatch()
    const board = useSelector(currentBoard)
    
    const tasks = useSelector(selectTasks)
    useEffect(() => {
        dispatch(getCurrentBoard("672cc86792d2fef358dba64c"))
        dispatch(writeToState(board.columns[0].tasks))
    }, [dispatch])
    
    return (
        <>
            {tasks && <ul className={s.taskList}>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <TaskCard taskObj={task} />
                    </li>
                ))}
            </ul>}
            
        </>
    );
}
 
export default TaskList;