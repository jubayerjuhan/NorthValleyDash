import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://nrjij3bdu5.execute-api.us-west-1.amazonaws.com/default/get-all-project-list?page=${page}`
      )
      .then((res) => {
        setProjects(res?.data?.projects);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  console.log(page, "page");

  console.log(projects, "projects");
  return (
    <div className="p-3 bg-white" style={{ overflowX: "auto" }}>
      <h1>All Projects</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          className={`btn btn-primary ${page <= 1 && "disabled"}`}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </button>

        <button
          className={`btn btn-primary ${projects.length < 50 && "disabled"}`}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <div className="spinner-border p-4" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Status</th>
              <th>Category Id</th>
              <th>Started Date</th>
              <th>Completed Date</th>
              <th>Project Details</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7">Loading</td>
              </tr>
            )}
            {/* Render projects data */}
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.PROJECT_ID}</td>
                <td>{project.PROJECT_NAME}</td>
                <td>{project.STATUS}</td>
                <td>{project.CATEGORY_ID}</td>
                {/* format this string */}
                <td>{moment(project.STARTED_DATE).format("YYYY-MM-DD")}</td>
                <td>
                  {project.COMPLETED_DATE
                    ? moment(project.COMPLETED_DATE).format("YYYY-MM-DD")
                    : "---"}
                </td>
                <td>
                  <Link to={`/project/${project.PROJECT_ID}`}>
                    <button className="btn btn-primary">View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProjects;
