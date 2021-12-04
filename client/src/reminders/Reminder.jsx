import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// {reminder, day, time, location, priority, details, hex_color}
const Reminder = ( {text, handleComplete, no} ) => {
  const reminderID = `reminder-text-${no}`;

  const handleClick = () => {
    const reminderText = document.getElementsByClassName(reminderID)[0];
    reminderText.style.textDecorationLine = 'line-through';

    handleComplete(text);
  }

  return (
    <div className='reminder'>
      <span className={reminderID}>{text}</span>
      <button onClick={handleClick}>Done</button>
    </div >
  )
}

export default Reminder;