import React from "react";
import { useState, useEffect } from "react";
import useCurrentPath from "../hooks/useCurrentPath";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../features/projects";
import { addNewTask, fetchTasks } from "../features/tasks";

export default function AddTask() {
  const formState = useSelector((state) => state.taskform.value);
  const { projects, loading } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const [taskName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(60);
  const [project, setProject] = useState(1);

  const projectInfo = useCurrentPath();

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeTime = (e) => setTime(Number(e.target.value));
  const handleChangeProject = (e) => setProject(Number(e.target.value));
  const handleAddTask = async (e) => {
    e.preventDefault();
    const task = {
      name: taskName,
      description: description,
      time: time,
      remainingTime: time - 1,
      projectId: project,
      isRunning: false,
      remainingSeconds: 59,
      completed: false,
    };
    await dispatch(addNewTask(task));
    dispatch(fetchTasks(projectInfo[0], "All"));
    setName("");
    setDescription("");
    setTime(60);
    setProject(1);
  };

  return (
    formState && (
      <div id="add-task">
        <h2>Add a new task</h2>
        <form>
          <Input
            typeatt="text"
            name="Name"
            value={taskName}
            onChange={handleChangeName}
          />
          <Input
            typeatt="number"
            name="Duration"
            value={time}
            onChange={handleChangeTime}
          />
          <TextArea
            name="Description"
            value={description}
            onChange={handleChangeDescription}
          />
          <Select
            name="Project"
            onChange={handleChangeProject}
            value={project}
            projects={projects}
          />
          <input
            type="submit"
            value="Submit"
            id="submit-task"
            onClick={handleAddTask}
          />
        </form>
      </div>
    )
  );
}

const Input = ({ typeatt, name, onChange, value }) => {
  return (
    <label for={name} class="input-label">
      <span className="text-[0.85rem] font-medium"> {name} </span>

      <input
        type={typeatt}
        id={name}
        className="input"
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

const TextArea = ({ name, value, onChange }) => {
  return (
    <label for={name} class="input-label">
      <span class="text-[0.85rem]  font-medium"> {name} </span>

      <textarea id={name} value={value} onChange={onChange} className="input" />
    </label>
  );
};

const Select = ({ name, value, onChange, projects }) => {
  return (
    <label for={name} class="input-label">
      <span class="text-[0.85rem]  font-medium"> {name} </span>

      <select
        id={name}
        className="input text-gray-900"
        value={value}
        onChange={onChange}
      >
        {projects.map((project) => {
          return (
            <option className="project-option" value={project.id}>
              {project.title}
            </option>
          );
        })}
      </select>
    </label>
  );
};
