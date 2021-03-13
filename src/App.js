import './App.css';

import Title from './components/Title/Title';
import InputContainer from './components/Input/InputContainer';
import TasksContainer from './components/Tasks/TasksContainer';

const App = () => {
  return (
    <div className="content">
      <Title />
      <InputContainer />
      <TasksContainer />
    </div>
  );
};

export default App;
