import React, { useState, useEffect } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/500.css'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import Button from '@mui/material/Button'
import Task from './components/Task'
import AddTaskModal from './components/AddTaskModal'
import DeleteTaskModal from './components/DeleteTaskModal'
import EditeTaskModal from './components/EditeTaskModal'
import TaskContext from './contexts/taskContext'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { db } from './firebase'
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  writeBatch,
} from 'firebase/firestore'

function App() {
  const [selectedTask, setSelectedTask] = useState(null)
  const [modalText, setModalText] = useState('')
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [isEditePopupOpen, setIsEditePopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [loadTasks, setLoadTasks] = useState(false)

  useEffect(() => {
    setLoadTasks(true)
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({
          ...doc.data(),
          id: doc.id,
        })
      })

      setTasks(todosArr)
      setLoadTasks(false)
    })

    return () => unsubscribe()
  }, [])

  function handleAddClick() {
    setIsAddPopupOpen(true)
  }

  function handleDeleteClick(task) {
    setIsDeletePopupOpen(true)
    setSelectedTask(task)
  }

  function handleEditeClick(task) {
    setIsEditePopupOpen(true)
    setModalText(task.text)
    setSelectedTask(task)
  }

  function closeAllPopups() {
    setIsAddPopupOpen(false)
    setIsDeletePopupOpen(false)
    setIsEditePopupOpen(false)
  }

  const addNewTask = async (isInput) => {
    try {
      setIsLoading(true)
      await addDoc(collection(db, 'todos'), {
        text: isInput,
        completed: false,
      })
    } catch (error) {
      console.error(error)
      toast.error('Произошла ошибка при добавлении задачи!')
    } finally {
      closeAllPopups()
      setIsLoading(false)
    }
  }
  const handleDeleteTask = async (id) => {
    try {
      setIsLoading(true)
      await deleteDoc(doc(db, 'todos', id))
    } catch (error) {
      console.error(error)
    } finally {
      closeAllPopups()
      setIsLoading(false)
    }
  }
  const handleDeleteAllTasks = async () => {
    try {
      setIsLoading(true)
      const querySnapshot = await getDocs(collection(db, 'todos'))
      const batch = writeBatch(db)
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref)
      })
      await batch.commit()
    } catch (error) {
      console.error(error)
    } finally {
      closeAllPopups()
      setIsLoading(false)
    }
  }
  const handleEditeTask = async (id, editeText) => {
    try {
      setIsLoading(true)
      await updateDoc(doc(db, 'todos', id), {
        text: editeText,
      })
    } catch (error) {
      console.error(error)
    } finally {
      closeAllPopups()
      setIsLoading(false)
    }
  }

  return (
    <TaskContext.Provider value={{ handleEditeTask, handleDeleteTask }}>
      <div className="App">
        <div className="todo">
          <Typography variant="h4">ToDoList</Typography>
          <Button
            sx={{ width: '100%', margin: '20px 0' }}
            variant="contained"
            onClick={handleAddClick}
          >
            {tasks.length === 0 ? 'Создать первую задачу' : 'Добавить задачу'}
          </Button>
          <TableContainer
            sx={{
              position: 'relative',
              minHeight: 400,
              maxWidth: 800,
              width: '90vw',
            }}
            component={Paper}
          >
            {loadTasks ? (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  bottom: '0',
                  right: '0',
                  margin: 'auto',
                }}
              />
            ) : tasks.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        padding: '0',
                      }}
                    >
                      {'ID'}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        padding: '0',
                      }}
                    >
                      {'Текст'}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        padding: '5px',
                      }}
                    >
                      {'Дата создания'}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        padding: '5px',
                      }}
                    >
                      {'Действия с задачей'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    editeClick={handleEditeClick}
                    deleteClick={handleDeleteClick}
                    isLoading={isLoading}
                  />
                ))}
              </Table>
            ) : (
              <Typography
                sx={{
                  display: 'flex',
                  minHeight: 'inherit',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  margin: '0',
                  fontSize: '1.5rem',
                }}
              >
                задач нет
              </Typography>
            )}
            {tasks.length > 1 ? (
              <Button
                sx={{ display: 'flex', bgcolor: 'red' }}
                variant="contained"
                onClick={handleDeleteAllTasks}
              >
                {'удалить все'}
              </Button>
            ) : null}
          </TableContainer>
          <ToastContainer />
        </div>

        <AddTaskModal
          isOpen={isAddPopupOpen}
          onClose={closeAllPopups}
          onAddTask={addNewTask}
          isLoading={isLoading}
          submitText={
            isLoading ? 'Подождите,идет добавление...' : 'Добавить задачу'
          }
        />
        <DeleteTaskModal
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          deleteClick={handleDeleteClick}
          submitText={
            isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Удалить'
          }
          task={selectedTask}
        />
        <EditeTaskModal
          isOpen={isEditePopupOpen}
          onClose={closeAllPopups}
          submitText={isLoading ? 'Сохранение...' : 'Сохранить'}
          modalText={modalText}
          setModalText={setModalText}
          task={selectedTask}
        />
      </div>
    </TaskContext.Provider>
  )
}

export default App
