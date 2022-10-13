import React, { useEffect, useState, useRef } from "react";
import Task from "./Task";
import useCurrentPath from "../hooks/useCurrentPath";
import { fetchTasks } from "../features/tasks";
import { useDispatch, useSelector } from "react-redux";

export default function TasktList() {
  const dispatch = useDispatch();
  const projectInfo = useCurrentPath();
  const { tasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTasks(projectInfo[0]));
  }, []);
  useEffect(() => {
    dispatch(fetchTasks(projectInfo[0]));
  }, [projectInfo[0]]);
  return (
    <div>
      <h1 id="project-name">{projectInfo[1]}</h1>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            completed={task.completed}
            time={task.time}
            projectId={task.projectId}
            remainingTimeTask={task.remainingTime}
            remainingSeconds={task.remainingSeconds}
            isRunning={task.isRunning}
          />
        );
      })}
    </div>
  );
}
