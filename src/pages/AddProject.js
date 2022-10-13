import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProject } from "../features/projects";

export default function AddProject() {
  const dispatch = useDispatch();
  const [projectName, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleAddProject = async (e) => {
    e.preventDefault();
    const project = {
      title: projectName,
      description: description,
      slug: projectName
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      trackedTime: 0,
    };
    await dispatch(addNewProject(project));
    setName("");
    setDescription("");
  };

  return (
    <div id="add-project">
      <h1>Welcome to Keeper!</h1>
      <p>
        Keeper is a web application to keep all your projects organized, and
        most importantly help you complete them 🤩. Feel free to add new
        projects, new tasks in each projects, and check the statistics tab to
        track your performance 😉.
      </p>
      <h2>Add a new project</h2>
      <p>Let's add a new project and be productive for today 🥰🥰.</p>
      <form id="project-form">
        <Input
          typeatt="text"
          name="Name"
          value={projectName}
          onChange={handleChangeName}
        />
        <TextArea
          name="Description"
          value={description}
          onChange={handleChangeDescription}
        />
        <input
          type="submit"
          value="Submit"
          id="submit-project"
          onClick={handleAddProject}
        />
      </form>
    </div>
  );
}

const Input = ({ typeatt, name, onChange, value }) => {
  return (
    <label for={name} class="input-label">
      <span class="text-[0.85rem] font-medium"> {name} </span>

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
