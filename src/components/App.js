import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Task from './Task';
import AddTaskModal from './AddTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import EditeTaskModal from './EditeTaskModal';
import TaskContext from '../contexts/taskContext';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { db } from '../firebase';
import {
 query,
 collection,
 onSnapshot,
 addDoc,
 deleteDoc,
 doc,
 updateDoc,
} from 'firebase/firestore';

export const styleBox = {
 position: 'absolute',
 top: '20%',
 left: '50%',
 transform: 'translate(-50%, -50%)',
 width: '90vw',
 maxWidth: 400,
 bgcolor: 'background.paper',
 border: '2px solid #000',
 boxShadow: 24,
 p: 1,
 display: 'flex',
 flexDirection: 'column',
};
function App() {
 const [selectedTask, setSelectedTask] = useState(null);
 const [modalText, setModalText] = useState('');
 const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
 const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
 const [isEditePopupOpen, setIsEditePopupOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [tasks, setTasks] = useState([]);
 const [loadTasks, setLoadTasks] = useState(false);

 useEffect(() => {
  setLoadTasks(true);
  const q = query(collection(db, 'todos'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
   let todosArr = [];
   querySnapshot.forEach((doc) => {
    todosArr.push({
     ...doc.data(),
     id: doc.id,
    });
   });

   setTasks(todosArr);
   setLoadTasks(false);
  });

  return () => unsubscribe();
 }, []);
 function closeAllPopups() {
  setIsAddPopupOpen(false);
  setIsDeletePopupOpen(false);
  setIsEditePopupOpen(false);
 }
 function handleAddClick() {
  setIsAddPopupOpen(true);
 }
 function handleDeleteClick(task) {
  setIsDeletePopupOpen(true);
  setSelectedTask(task);
 }
 function handleEditeClick(task) {
  setIsEditePopupOpen(true);
  setModalText(task.text);
  setSelectedTask(task);
 }

 const addNewTask = async (isInput) => {
  try {
   setIsLoading(true);
   await addDoc(collection(db, 'todos'), {
    text: isInput,
    completed: false,
   });
  } catch (error) {
   console.error(error);
   toast.error('Произошла ошибка при добавлении задачи!');
  } finally {
   closeAllPopups();
   setIsLoading(false);
  }
 };
 const handleDeleteTask = async (id) => {
  try {
   setIsLoading(true);
   await deleteDoc(doc(db, 'todos', id));
  } catch (error) {
   console.error(error);
  } finally {
   closeAllPopups();
   setIsLoading(false);
  }
 };
 const handleEditeTask = async (id, editeText) => {
  try {
   setIsLoading(true);
   await updateDoc(doc(db, 'todos', id), {
    text: editeText,
   });
  } catch (error) {
   console.error(error);
  } finally {
   closeAllPopups();
   setIsLoading(false);
  }
 };

 return (
  <TaskContext.Provider value={{ handleEditeTask, handleDeleteTask }}>
   <div className="App">
    <div className="todo">
     <h1>{'ToDoList'}</h1>
     <Button
      sx={{ width: '100%', margin: '20px 0' }}
      variant="contained"
      onClick={handleAddClick}
     >
      {tasks.length === 0 ? 'Создать первую задачу' : 'Добавить задачу'}
     </Button>
     <TableContainer
      sx={{
       minHeight: 400,
       maxWidth: 800,
       width: '90vw',
       fontSize: 'x-large',
      }}
      component={Paper}
     >
      {loadTasks ? (
       <CircularProgress />
      ) : tasks.length > 0 ? (
       <Table aria-label="simple table">
        <TableHead>
         <TableRow>
          <TableCell sx={{ textAlign: 'center', padding: '0' }}>
           {'ID'}
          </TableCell>
          <TableCell sx={{ textAlign: 'center', padding: '0' }}>
           {'текст'}
          </TableCell>
          <TableCell sx={{ textAlign: 'center', padding: '5px' }}>
           {'дата создания'}
          </TableCell>
          <TableCell sx={{ textAlign: 'center', padding: '5px' }}>
           {'дейстаия с задачей'}
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
       'ЗАДАЧ НЕТ'
      )}
     </TableContainer>
     <ToastContainer />
    </div>

    <AddTaskModal
     isOpen={isAddPopupOpen}
     onClose={closeAllPopups}
     onAddTask={addNewTask}
     submitText={isLoading ? 'Подождите,идет добавление...' : 'Добавить задачу'}
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
 );
}

export default App;
