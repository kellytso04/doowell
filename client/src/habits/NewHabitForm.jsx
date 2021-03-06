import React, { useState } from 'react';
import styled from 'styled-components';

const StyledHabitForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  justify-content: center;
  margin: auto;
  margin-bottom: 10px;
  border: white 2px solid;
  padding: 5px;
  border-radius: 10%;
`

const NewHabitForm = ( {handleAdd} ) => {
  const [ habitText, setHabitText ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(habitText);
    setHabitText('');
  }

  return (
    <StyledHabitForm className='habit-form' >
      <input
        type='text'
        placeholder='Making it a goal to...'
        value={habitText}
        onChange={(e) => { setHabitText(e.target.value) }}
      />
      <button type='submit' value='+' onClick={handleSubmit} style={{width: '100%'}}>+</button>
    </ StyledHabitForm>
  )
}

export default NewHabitForm;
