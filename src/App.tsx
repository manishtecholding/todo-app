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

function App() {
  // initialisation
  const { isOpen, onOpen, onClose } = useDisclosure();

  // state
  const [data, setData] = useState<TasksItem[]>(JSON.parse(localStorage.getItem('tasks')));
  const [isLoading, setIsLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  // useEffects

  // Set the initial tasks from JSON data
  useEffect(() => {
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
  const handleEdit = (item: TasksItem) => {
    console.log('handleEdit')
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
    setShowCreate(!showCreate)
    onOpen()
  }

  /**
   * @description Create a task based on the input provided by the user
   * @params none
   * @returns {void}
   */
  const createTask = (item: CreateTask) => {
    console.log('createTask', item)

    // Check for duplicate item by name 
    // If duplicate Item exists show the Error message
    // Else add it to the localStorage and show to the user

    const duplicateItem = data.find((element) => element.title === item.title);
    console.log(duplicateItem);

    // Array.find returns undefined if the condition fails
    if (duplicateItem) {
      alert("Task with same name already exists!!");
    } else {
      // Add the Item
      console.log('Item added successfully....')
      console.log('createTask', data)
      const updatedTasks = data.push({
        id: (data.length + 1).toString(),
        title: item?.title,
        description: item?.description,
        completed: false
      });

      console.log(data, 'createTask updatedTasks')

      localStorage.setItem("tasks", JSON.stringify(data))

      alert('Task added successfully!')
    }

    onClose();
  }

  return (
    <>
      <h1 className='font-bold text-3xl'>ToDo App</h1>
      <div>
        <ViewToDo
          toDoList={data}
          handleEdit={handleEdit}
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
        />
      }
    </>
  )
}

export default App
