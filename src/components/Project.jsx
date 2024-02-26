import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  const { project_id } = useParams();

  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repLoading, setRepLoading] = useState(false);
  const [salesRepName, setSalesRepName] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch project details from API
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `https://b6tfaq7q8k.execute-api.us-west-1.amazonaws.com/default/get-project-details?project_id=${project_id}`
        );
        setProject(res?.data?.project);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [project_id]);

  useEffect(() => {
    // Fetch sales rep details when project data is available
    if (project.CUSTOMFIELDS) {
      console.log(project.CUSTOMFIELDS);
      const salesRepField = project.CUSTOMFIELDS.find(
        (field) => field.FIELD_NAME === "Sales_Rep__c"
      );
      if (salesRepField) {
        fetchSalesRep(salesRepField.FIELD_VALUE).then((res) => {
          setSalesRepName(res.FIRST_NAME + " " + res.LAST_NAME);
        });
      }
    }
  }, [project]);

  const fetchSalesRep = async (sales_rep_id) => {
    setRepLoading(true);
    try {
      const res = await axios.get(
        `https://5p7jsopg0d.execute-api.us-west-1.amazonaws.com/default/get-contact-details?contact_id=${sales_rep_id}`
      );
      setRepLoading(false);
      return res?.data?.contact;
    } catch (error) {
      setRepLoading(false);
      return null;
    }
  };

  // Function to render custom fields
  const renderCustomFields = () => {
    return project.CUSTOMFIELDS?.map((field, index) => {
      // Replace all underscores with spaces
      const str = field.FIELD_NAME;
      let field_name = str.replace(/__/g, "").replace(/_/g, " ").slice(0, -1); // Replace all underscores with spaces
      let field_value = field.FIELD_VALUE;

      return (
        <tr key={index}>
          <td>{field_name}</td>
          <td>{field_value}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container mt-4">
      <h2>Project Details</h2>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <div className="spinner-border p-4" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Project ID</td>
              <td>{project.PROJECT_ID}</td>
            </tr>
            <tr>
              <td>Project Name</td>
              <td>{project.PROJECT_NAME}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{project.STATUS}</td>
            </tr>

            <tr>
              <td>Sales Rep</td>
              <td>
                {repLoading ? (
                  <>
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                  </>
                ) : (
                  salesRepName
                )}
              </td>
            </tr>

            <tr>
              <td>Started Date</td>
              <td>{project.STARTED_DATE}</td>
            </tr>
            <tr>
              <td>Completed Date</td>
              <td>{project.COMPLETED_DATE}</td>
            </tr>
            {/* Render custom fields */}
            {renderCustomFields()}
            {/* Render sales rep name */}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Project;
