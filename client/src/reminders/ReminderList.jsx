import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {fetchReminders, addReminder, updateReminder, deleteReminder, completeReminder} from '../helper.js';
import Reminder from './Reminder.jsx';
import NewReminderForm from './NewReminderForm.jsx';

const StyledReminderList = styled.div`
  align-content: center;
  margin: 0;
  width: 50%;
  height: 100%;
  overflow-y: auto;
  border: white solid 2px;
  margin-left: 4px;
  scroll-behavior: smooth;
`

const ReminderList = (props) => {
  const [ reminders, setReminders ] = useState([]);

  useEffect( () => {
    fetchReminders()
      .then( ({data}) => {
        setReminders(data);
      })
      .catch( (err) => {
        console.error(err);
      })
  }, []);

  const handleAdd = (reminderText) => {
    addReminder(reminderText)
      .then( () => {
        fetchReminders()
          .then( ({data}) => {
            setReminders(data);
          })
          .catch( (err) => {
            console.error(err);
          })
      })
      .catch( (err) => {
        console.error(err);
      });
  }

  const handleEdit = (reminderID, updateText) => {
    updateReminder(reminderID, updateText)
      .then( () => {
        fetchReminders()
        .then( ({data}) => {
          setReminders(data);
        })
        .catch( (err) => {
          console.error(err);
        })
      })
      .catch( (err) => {
        console.error(err);
      });
  }

  const handleDelete = (reminderID) => {
    deleteReminder(reminderID)
      .then( () => {
        fetchReminders()
          .then( ({data}) => {
            setReminders(data);
          })
          .catch( (err) => {
            console.error(err);
          })
      })
      .catch( (err) => {
        console.error(err);
      });
  }

  const handleComplete = (reminderID) => {
    completeReminder(reminderID)
      .catch( (err) => {
        console.error(err);
      })
  }

  return (
    <StyledReminderList className='reminders'>
        <div className='reminders-title' style={{textAlign: 'center'}}>
          Reminders
        </div>
      <ul className='reminder-list' style={{padding: '0'}}>
        { reminders.length ? reminders.map( (reminder, i) => (
          <Reminder
            id={reminder.id}
            text={reminder.reminder}
            handleComplete={handleComplete}
            key={i}
            no={i}/>
        )) : null }
      </ul>
      <br />
      <NewReminderForm addReminder={handleAdd} />
    </StyledReminderList >

  )
}

export default ReminderList;