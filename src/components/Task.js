import React from "react";
import { BiRevision, BiCheck, BiTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasks";
import useCurrentPath from "../hooks/useCurrentPath";
import { markComplete, removeTask, resetTask } from "../features/tasks";
import Timer from "./Timer";

export default function Task({
  id,
  name,
  description,
  completed,
  time,
  isRunning,
  remainingTime,
  remainingSeconds,
}) {
  const projectInfo = useCurrentPath();
  const dispatch = useDispatch();
  const handleRemove = async (e) => {
    await dispatch(removeTask(id, projectInfo[0], time));
    dispatch(fetchTasks(projectInfo[0]));
  };
  const handleComplete = async (e) => {
    await dispatch(markComplete(id));
    dispatch(fetchTasks(projectInfo[0]));
  };
  const handleReset = async (e) => {
    await dispatch(resetTask(id));
    dispatch(fetchTasks(projectInfo[0]));
  };
  return (
    <div id="task">
      <div className="left">
        <h1 className="task-title">
          {name}
          <span>
            {completed ? (
              <p id="task-status-completed">completed</p>
            ) : (
              <p id="task-status-in-progress">in progress</p>
            )}
          </span>
        </h1>
        <p className="task-description">{description}</p>
        <div className="buttons-task-wrapper">
          <button onClick={handleRemove}>
            <BiTrashAlt />
          </button>
          <button onClick={handleComplete}>
            <BiCheck />
          </button>
          <button onClick={handleReset}>
            <BiRevision />
          </button>
        </div>
      </div>
      <div className="right">
        <Timer
          id={id}
          time={time}
          remainingTimeTask={remainingTime}
          remainingSeconds={remainingSeconds}
          isRunning={isRunning}
          completed={completed}
        />
      </div>
    </div>
  );
}
