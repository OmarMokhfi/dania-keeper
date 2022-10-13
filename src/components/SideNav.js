import React from "react";
import {
  BiPieChartAlt2,
  BiFolderPlus,
  BiFolderOpen,
  BiStop,
} from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { Link, Router } from "react-router-dom";
import { fetchProjects } from "../features/projects";
import { useEffect } from "react";

export default function SideNav() {
  const { projects, loading } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, [projects]);

  return (
    <div className="side-navigation-bar">
      <span id="keeper">Keeper</span>

      <nav className="side-nav-wrapper">
        <Link className="side-link" to="/">
          <BiFolderPlus />
          <span className="ml-3 text-sm font-medium"> Add project </span>
        </Link>
        <Link className="side-link" to="/statistics">
          <BiPieChartAlt2 />
          <span className="ml-3 text-sm font-medium"> Statistics </span>
        </Link>

        <details className="group">
          <summary className="side-link">
            <BiFolderOpen />
            <span className="ml-3 text-sm font-medium"> Projects </span>

            <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <nav className="mt-1.5 ml-6 flex flex-col">
            {projects.map((project) => {
              return (
                <Link
                  className="side-link-nested"
                  key={project.id}
                  to={project.slug}
                  state={{ id: project.id, title: project.title }}
                >
                  <BiStop />
                  <span className="ml-2 text-sm font-medium">
                    {project.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </details>
      </nav>
    </div>
  );
}
