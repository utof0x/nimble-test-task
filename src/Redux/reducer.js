import { tasksAPI } from './api';

const CREATE_TASK = 'CREATE_TASK';
const SET_TIME = 'SET_TIME';
const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
const DELETE_TASK = 'DELETE_TASK';
const SET_TASKS = 'SET_TASKS';
const SET_CLOSE_TIME = 'SET_CLOSE_TIME';

const initialState = {
  tasks: [],
};

const reducer = (state = initialState, action) => {
  window.state = state;
  switch (action.type) {
    case CREATE_TASK: {
      return {
        ...state,
        tasks: [
          {
            id: state.tasks[0]
              ? state.tasks.reduce((prev, current) =>
                  prev.id > current.id ? prev : current
                ).id + 1
              : 1,
            name: action.taskName,
            time: 0,
            isActive: true,
            closeTime: null,
          },
          ...state.tasks,
        ],
      };
    }
    case SET_TIME: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return { ...task, time: action.time };
          }

          return task;
        }),
      };
    }
    case TOGGLE_ACTIVE: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return { ...task, isActive: !task.isActive };
          }

          return task;
        }),
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    }
    case SET_TASKS: {
      return {
        ...state,
        tasks: action.tasks
          ? action.tasks.map((task) => {
              if (task.isActive) {
                return {
                  ...task,
                  time:
                    task.time + Math.ceil((Date.now() - task.closeTime) / 1000),
                };
              } else {
                return { ...task };
              }
            })
          : [],
      };
    }
    case SET_CLOSE_TIME: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          return { ...task, closeTime: Date.now() };
        }),
      };
    }
    default:
      return state;
  }
};

export const createTaskActionCreator = (taskName) => ({
  type: CREATE_TASK,
  taskName,
});

export const setTimeActionCreator = (id, time) => ({
  type: SET_TIME,
  id,
  time,
});

export const toggleActiveActionCreator = (id) => ({
  type: TOGGLE_ACTIVE,
  id,
});

export const deleteTaskActionCreator = (id) => ({
  type: DELETE_TASK,
  id,
});

export const setTasksActionCreator = (tasks) => ({
  type: SET_TASKS,
  tasks,
});

export const requestTasks = () => {
  return (dispatch) => {
    tasksAPI.getTasks().then((tasks) => {
      dispatch(setTasksActionCreator(tasks));
    });
  };
};

export const updateTasks = (tasks) => {
  const tasksWithCloseTime = tasks.map((task) => {
    return { ...task, closeTime: Date.now() };
  });

  return (dispatch) => {
    tasksAPI.setTasks(tasksWithCloseTime);
  };
};

export default reducer;
