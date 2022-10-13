import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { markComplete, updateTask } from "../features/tasks";
import useCurrentPath from "../hooks/useCurrentPath";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks";

export default function Timer({ id, remainingTimeTask }) {
  const [running, setRunning] = useState(false);
  const [delayTask, setDelay] = useState(60);
  const dispatch = useDispatch();
  const projectInfo = useCurrentPath();
  const toggleTimer = () => {
    setRunning(!running);
  };
  const updateTime = async (remainingTimeTask) => {
    console.log(remainingTimeTask);
    if (remainingTimeTask > 1) {
      await dispatch(updateTask(id));
      dispatch(fetchTasks(projectInfo[0]));
    } else {
      await dispatch(markComplete(id));
      dispatch(fetchTasks(projectInfo[0]));
      setDelay(0);
    }
  };
  return (
    <button id="pause-play" onClick={toggleTimer}>
      <CountdownCircleTimer
        duration={5}
        colors={["#8362D0", "#9C81D9", "#A891DE", "#B5A1E3"]}
        colorsTime={[7, 5, 2, 0]}
        size={55}
        strokeWidth={4}
        isPlaying={running}
        onComplete={() => {
          return { shouldRepeat: { running }, delay: 0.1 };
        }}
      >
        {({ remainingTime }) => {
          if (remainingTime === 0) {
            updateTime();
          }
          return remainingTime;
        }}
      </CountdownCircleTimer>
    </button>
  );
}
