import { useSelector } from 'react-redux'
import TaskCard from '../TaskCard/TaskCard'
import s from "./TaskList.module.css"
import { selectBoards } from '../../redux/dashboard/boards/selectors'

const tasks = [
    {
        "_id": "672cbb8292d2fef358db8523",
        "title": "style calendar",
        "description": "change the appereance of input field and do something about datepicker",
        "priority": "high",
        "deadline": "2024-11-07T00:00:00.000Z",
        "columnId": "672cb72392d2fef358db84b0",
        "userId": "672946f9dd9aea6f1c50c373",
        "createdAt": "2024-11-07T13:07:14.935Z",
        "updatedAt": "2024-11-07T13:07:14.935Z"
    },
    {
        "_id": "672cbbe292d2fef358db8562",
        "title": "eat",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatem, quos commodi provident consequatur laboriosam sunt dolores repudiandae inventore voluptatum consequuntur deserunt ipsum voluptas sint nihil totam, atque repellat obcaecati.",
        "priority": "low",
        "deadline": "2024-11-07T00:00:00.000Z",
        "columnId": "672cb72392d2fef358db84b0",
        "userId": "672946f9dd9aea6f1c50c373",
        "createdAt": "2024-11-07T13:08:50.248Z",
        "updatedAt": "2024-11-07T13:08:50.248Z"
    },
    {
        "_id": "672cbbeb92d2fef358db8566",
        "title": "third",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatem, quos commodi provident consequatur laboriosam sunt dolores repudiandae inventore voluptatum consequuntur deserunt ipsum voluptas sint nihil totam, atque repellat obcaecati.",
        "priority": "low",
        "deadline": "2024-11-07T00:00:00.000Z",
        "columnId": "672cb72392d2fef358db84b0",
        "userId": "672946f9dd9aea6f1c50c373",
        "createdAt": "2024-11-07T13:08:59.145Z",
        "updatedAt": "2024-11-07T13:08:59.145Z"
    },
    {
        "_id": "672cbbff92d2fef358db8571",
        "title": "fourth",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatem, quos commodi provident consequatur laboriosam sunt dolores repudiandae inventore voluptatum consequuntur deserunt ipsum voluptas sint nihil totam, atque repellat obcaecati.",
        "priority": "low",
        "deadline": "2024-11-07T00:00:00.000Z",
        "columnId": "672cb72392d2fef358db84b0",
        "userId": "672946f9dd9aea6f1c50c373",
        "createdAt": "2024-11-07T13:09:19.230Z",
        "updatedAt": "2024-11-07T13:09:19.230Z"
    },
    {
        "_id": "672cbc0b92d2fef358db8575",
        "title": "fifth",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatem, quos commodi provident consequatur laboriosam sunt dolores repudiandae inventore voluptatum consequuntur deserunt ipsum voluptas sint nihil totam, atque repellat obcaecati.",
        "priority": "none",
        "deadline": "2024-11-07T00:00:00.000Z",
        "columnId": "672cb72392d2fef358db84b0",
        "userId": "672946f9dd9aea6f1c50c373",
        "createdAt": "2024-11-07T13:09:31.857Z",
        "updatedAt": "2024-11-07T13:09:31.857Z"
    }
]


const TaskList = () => {


    const boards = useSelector(selectBoards)

    return (
        <>
            <ul className={s.taskList}>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <TaskCard taskObj={task} />
                    </li>
                ))}
            </ul>
        </>
    );
}
 
export default TaskList;