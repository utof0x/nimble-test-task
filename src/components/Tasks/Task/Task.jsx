import React, { useState, useEffect } from 'react';
import styles from './Task.module.css';
import pauseIcon from '../../../assets/icons/pause.png';
import playIcon from '../../../assets/icons/play.png';
import removeIcon from '../../../assets/icons/remove.png';
import * as moment from 'moment';
import 'moment-duration-format';

const Task = (props) => {
  const [localTime, setLocalTime] = useState(props.time);
  const [isActive, setIsActive] = useState(props.isActive);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(localTime);
      }, 1000);
    } else if (!isActive && localTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, localTime]);

  const setTime = (time) => {
    props.setTime(props.id, time);
    setLocalTime((time) => (time += 1));
  };

  const toggleIsActive = () => {
    props.toggleIsActive(props.id);
    setIsActive(!props.isActive);
  };

  const deleteTask = () => {
    props.deleteTask(props.id);
  };

  return (
    <div
      className={
        props.isActive ? `${styles.task} ${styles.activeTask}` : styles.task
      }>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.time}>
        {moment
          .duration(localTime, 'seconds')
          .format('HH:mm:ss', { trim: false })}
      </div>
      <img
        className={`${styles.image} ${styles.pausePlayImg}`}
        alt={`${props.isActive ? 'pause' : 'play'} task`}
        src={props.isActive ? pauseIcon : playIcon}
        onClick={toggleIsActive}
      />
      <img
        className={`${styles.image} ${styles.removeImg}`}
        alt="Remove task"
        src={removeIcon}
        onClick={deleteTask}
      />
    </div>
  );
};

export default Task;
