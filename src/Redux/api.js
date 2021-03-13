// Not real API, but i try imitate it for thunk-creators

export const tasksAPI = {
  async getTasks() {
    return await JSON.parse(localStorage.getItem('tasks'));
  },
  async setTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },
};
