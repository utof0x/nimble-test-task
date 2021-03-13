import Input from './Input';
import { createTaskActionCreator } from '../../Redux/reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (tasksText) => {
      dispatch(createTaskActionCreator(tasksText));
    },
  };
};

export default compose(connect(null, mapDispatchToProps))(Input);
