import React, { useRef } from 'react';
import styles from './Input.module.css';
import createButtonImage from '../../assets/icons/run-btn.png';
import * as moment from 'moment';

const Input = (props) => {
  const inputRef = useRef();

  const addNewTask = () => {
    // if user create empty task
    if (!inputRef.current.value) {
      // set name to current date
      props.addTask(`${moment().format('Do MMMM kk:mm')}`);
    } else {
      props.addTask(inputRef.current.value);
    }

    // clear text and remove fucus after task creation
    removeFocus();
  };

  // add task after Enter press
  const addNewTaskWithEnter = (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  };

  const removeFocus = () => {
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  return (
    <div className={styles.inputTab}>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Enter tracker name"
        onKeyPress={addNewTaskWithEnter}></input>
      <img
        className={styles.image}
        alt="Create task button"
        src={createButtonImage}
        onClick={addNewTask}
      />
    </div>
  );
};

export default Input;
