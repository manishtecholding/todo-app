import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';

import './App.css'
import CreateToDo from './ToDo/Create';
import tasks, { TasksItem } from './data';
import ViewToDo from './ToDo/View';

export interface CreateTask {
  title: string,
  description: string
}

export interface UpdateTask {
  id: string,
  title: string,
  description: string,
  completed: boolean
}

function App() {
  // initialisation
  const { isOpen, onOpen, onClose } = useDisclosure();

  // state
  const [data, setData] = useState<TasksItem[]>(JSON.parse(localStorage.getItem('tasks')));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(null);
  const [itemToEdit, setItemToEdit] = useState<any>(null);

  // useEffects

  // Set the initial tasks from JSON data
  useEffect(() => {
    setIsEdit(false)
    // Initialise dark mode for chakra UI
    localStorage.setItem("chakra-ui-color-mode", "dark")
    if (!data) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, []);

  // Initially when the tasks array is epmty the data is null so the JSX is not displayed
  // useLayoutEffect is used to fetch the data after it has been set in useEffect
  useLayoutEffect(() => {
    refetch()
  }, []);

  // function handlers

  /**
   * @description Handle the Edit functionality of Single Item
   * @param item 
   * @returns {void}
   */
  const toggleEditModal = (item: TasksItem) => {
    console.log('toggleEditModal', item)
    setItemToEdit(item);

    setIsEdit(true);
    onOpen();
  }

  /**
   * @description Handle the Delete functionality of Single Item
   * @param item 
   * @returns {void}
   */
  const handleDelete = (item: TasksItem) => {
    event.preventDefault();

    const itemToDelete = data.findIndex((element) => element.id === item.id);
    itemToDelete > -1 && data.splice(itemToDelete, 1)
    localStorage.setItem("tasks", JSON.stringify(data))

    refetch()
  }

  /**
   * @description Refetch the data from localStorage
   * @param none
   * @returns {void}
   */
  const refetch = () => {
    setData(JSON.parse(localStorage.getItem("tasks")))
  }

  /**
   * @description Handle Closing/Opening of Create Task modal
   * @param none
   * @returns {void}
   */
  const toggleCreateTaskModal = () => {
    setIsEdit(false)
    setShowCreate(!showCreate)
    onOpen()
  }

  /**
   * @description Create a task based on the input provided by the user
   * @params none
   * @returns {void}
   */
  const createTask = (item: CreateTask) => {
    const duplicateItem = data.find((element) => element.title === item.title);
    console.log(duplicateItem);

    // Array.find returns undefined if the condition fails
    if (duplicateItem) {
      alert("Task with same name already exists!!");
    } else {
      // Add the Item
      data.push({
        id: (data.length + 1).toString(),
        title: item?.title,
        description: item?.description,
        completed: false
      });

      localStorage.setItem("tasks", JSON.stringify(data))
      alert('Task added successfully!')
    }
    onClose();
  }

  /**
   * @description Edit a task based on the input provided by the user
   * @params none
   * @returns {void}
   */
  const editTask = (item: UpdateTask) => {
    const index = data.findIndex((element) => element.id === item.id);
    console.log('editTask', index);


    if (index >= 0) {
      data.splice(index, 1, item);
      console.log(data)
      localStorage.setItem("tasks", JSON.stringify(data));

      onClose();
    }
  }

  return (
    <>
      <h1 className='font-bold text-3xl'>ToDo App</h1>
      <div>
        <ViewToDo
          toDoList={data}
          toggleEditModal={toggleEditModal}
          handleDelete={handleDelete}
        />
      </div>
      <div className='m-6'>
        <button className='bg-gray-700 p-2 rounded-lg' onClick={toggleCreateTaskModal}>Create Task</button>
      </div>
      {
        isOpen &&
        <CreateToDo
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          createTask={createTask}
          isEdit={isEdit}
          itemToEdit={isEdit ? itemToEdit : null}
          editTask={editTask}
        />
      }
    </>
  )
}

export default App
