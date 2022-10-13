import { configureStore } from "@reduxjs/toolkit";
import taskFormReducer from "../features/taskForm";
import projectsReducer from "../features/projects";
import tasksReducer from "../features/tasks";

export default configureStore({
  reducer: {
    taskform: taskFormReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});
