import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { fetchTasks, addTask, updateTask, completeTask, deleteTask } from '../helper.js';
import Task from './Task.jsx';
import NewTaskForm from './NewTaskForm.jsx';

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 100%;
  overflow-y: auto;
  margin: 0;
  border: #A8D0E6 solid 2px;
  margin-right: 4px;
  scroll-behavior: smooth;
`

const TaskList = (props) => {
  const [ tasks, setTasks ] = useState([]);

  useEffect(() => {
    fetchTasks()
      .then( ({data}) => {
        setTasks(data);
      })
      .catch( (err) => {
        console.error(err);
      });
  }, []);

  const handleAdd = (taskObject) => {
    addTask(taskObject)
      .then( () => {
        fetchTasks()
          .then( ({data}) => {
            setTasks(data);
          })
          .catch( (err) => {
            console.error(err);
          });
      });
  }

  const handleComplete = (taskText) => {
    completeTask(taskText)
      .catch( (err) => {
        console.error(err);
      });
  }

  const handleDelete = (taskText) => {
    deleteTask(taskText)
      .then( () => {
        fetchTasks()
          .then( ({data}) => {
            setTasks(data);
          })
          .catch( (err) => {
            console.error(err);
          });
      })
      .catch( (err) => {
        console.error(err);
      })
  }

  return (
    <StyledTaskList className='task-list' >
      <div className='tasks-title' style={{textAlign: 'center'}}>
        Tasks
      </div>
      <NewTaskForm handleAdd={handleAdd} style={{alignSelf: 'flex-end'}} />
      <div className='task-list' >
        { tasks.length ? tasks.map( (task, i) => {
          return (
            <Task
              id={task.id}
              taskText={task.task}
              category={task.category}
              completed={task.completed}
              color={`#${task.hex_color}`}
              key={i}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              />
          )
        }) : <div style={{margin: '0'}}>Add a task to track it!</div>}
      </div>
    </ StyledTaskList>
  )
}

export default TaskList;