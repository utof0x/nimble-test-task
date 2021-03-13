import Tasks from './Tasks';
import {
  setTimeActionCreator,
  toggleActiveActionCreator,
  deleteTaskActionCreator,
  requestTasks,
  updateTasks,
} from '../../Redux/reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    tasks: state.reducer.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTime: (id, time) => {
      dispatch(setTimeActionCreator(id, time));
    },
    toggleIsActive: (id) => {
      dispatch(toggleActiveActionCreator(id));
    },
    deleteTask: (id) => {
      dispatch(deleteTaskActionCreator(id));
    },
    requestTasks: () => {
      dispatch(requestTasks());
    },
    updateTasks: (tasks) => {
      dispatch(updateTasks(tasks));
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Tasks);
