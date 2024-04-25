import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react';
import { CreateTask, UpdateTask } from '../../App';

interface CreateToDoProps {
  isOpen: boolean,
  isEdit: boolean,
  onClose: () => void,
  onOpen: () => void,
  createTask: (CreateTask) => void,
  editTask: (UpdateTask) => void,
  itemToEdit: UpdateTask
}

const CreateToDo = ({
  isOpen,
  isEdit,
  onClose,
  onOpen,
  createTask,
  editTask,
  itemToEdit
}: CreateToDoProps) => {
  // initialisation

  // state
  const [formData, setFormData] = useState<{ title: string, description: string }>(null);

  const [error, setError] = useState({
    title: '',
    description: ''
  })

  // useEffects
  useEffect(() => {
    console.log('isEdit', itemToEdit)

    isEdit ? setFormData({
      title: itemToEdit?.title,
      description: itemToEdit?.description
    }) : setFormData({ title: '', description: '' })
  }, []);

  // function handlers

  /**
   * @description Handle On Change of Input fields
   * @param event 
   * @returns {void}
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  /**
   * @description Handle Submit functionality for Create Task
   * @param none
   * @returns {void}
   */
  const handleSubmit = async () => {
    if (isEdit === true) {
      editTask({
        id: itemToEdit?.id,
        title: formData?.title,
        description: formData?.description,
        completed: itemToEdit?.completed
      })

      // Update the element
    } else {
      for (const [key, value] of Object.entries(formData)) {
        if (value === '') {
          await (async () => {
            setError(prevError => ({
              ...prevError,
              [key]: `${key} cannot be empty`
            }))
          })()
        } else {
          await (async () => {
            setError(prevError => ({
              ...prevError,
              [key]: ''
            }));
          })()
        }
      }

      createTask(formData);
    }

  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit === false ? 'Create' : 'Edit'} Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name='title'
              placeholder='Title'
              className='m-2'
              value={formData?.title}
              onChange={handleOnChange}
            />
            {error && error?.title !== '' && <div className='mx-2 text-rose-700'>{error.title}</div>}

            <Textarea
              name='description'
              placeholder='Description'
              className='m-2'
              value={formData?.description}
              onChange={handleOnChange}
              size='lg'
            />
            {error && error?.description !== '' && <div className='mx-2 text-rose-700'>{error.description}</div>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreateToDo