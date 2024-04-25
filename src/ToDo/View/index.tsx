import React, { FC } from "react"
import { TasksItem } from "../../data"

interface ViewToDoProps {
  toDoList: TasksItem[],
  toggleEditModal: (TasksItem) => void;
  handleDelete: (TasksItem) => void;
}

const ViewToDo: FC = ({
  toDoList,
  toggleEditModal,
  handleDelete
}: ViewToDoProps) => {
  return (
    <ul>
      {toDoList && toDoList.length > 0 && toDoList.map((task) => (
        <li className='task-item' key={task?.id}>
          <div>{task?.title?.length > 25 ? task?.title.slice(0, 25) + '...' : task?.title}</div>
          <div>
            <button className='action-button' onClick={() => toggleEditModal(task)}>Edit</button>
            <button className='action-button' onClick={() => handleDelete(task)}>Delete</button>
          </div>
        </li>
      ))}
      {
        !toDoList || toDoList.length === 0 && <li className='p-1'>No ToDo found</li>
      }
    </ul>
  )
}

export default ViewToDo