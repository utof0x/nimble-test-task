import React, { useEffect, useRef } from 'react';
import styles from './Tasks.module.css';
import Task from './Task/Task';

const Tasks = (props) => {
  const unloadListener = () => {
    props.updateTasks(props.tasks);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', unloadListener);
    window.addEventListener('dblclick', unloadListener);

    return () => {
      window.removeEventListener('beforeunload', unloadListener);
      window.removeEventListener('dblclick', unloadListener);
    };
  });

  useEffect(() => {
    props.requestTasks();
  }, []);

  const taskElements = props.tasks.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        name={task.name}
        time={task.time}
        isActive={task.isActive}
        setTime={props.setTime}
        toggleIsActive={props.toggleIsActive}
        deleteTask={props.deleteTask}
      />
    );
  });

  return <div className={styles.tasksTab}>{taskElements}</div>;
};

export default Tasks;
