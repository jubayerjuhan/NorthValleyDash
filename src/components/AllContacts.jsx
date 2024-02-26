import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://eb5hayy9ga.execute-api.us-west-1.amazonaws.com/default/get-contacts-list?page=${page}`
      )
      .then((res) => {
        console.log(res, "res.contacts");
        setContacts(res?.data?.contacts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  console.log(contacts, "contacts");

  return (
    <div className="p-3 bg-white" style={{ overflowX: "auto" }}>
      <h1>All Contacts</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          className={`btn btn-primary ${page <= 1 && "disabled"}`}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </button>

        <button
          className={`btn btn-primary ${contacts.length < 50 && "disabled"}`}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
      {loading ? (
        <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>
          <div className="spinner-border p-4" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGE</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ORGANIZATION</th>
              <th>DATE CREATED</th>
              <th>DATE UPDATED</th>
              <th>LAST ACTIVITY DATE</th>
              <th>CREATED USER ID</th>
            </tr>
          </thead>
          <tbody>
            {/* Render contacts data */}
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.CONTACT_ID}</td>
                <td>
                  {contact.IMAGE_URL && (
                    <img
                      src={contact.IMAGE_URL}
                      alt="Contact"
                      width="50"
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                </td>
                <td>{contact.FIRST_NAME}</td>
                <td>{contact.LAST_NAME}</td>
                <td>{contact.EMAIL_ADDRESS}</td>
                <td>{contact.PHONE}</td>
                <td>
                  {contact.ORGANISATION_ID
                    ? contact.ORGANISATION_ID
                    : "No Organization"}
                </td>
                {/* format this string */}
                <td>{moment(contact.DATE_CREATED_UTC).format("YYYY-MM-DD")}</td>
                <td>{moment(contact.DATE_UPDATED_UTC).format("YYYY-MM-DD")}</td>
                <td>
                  {moment(contact.LAST_ACTIVITY_DATE_UTC).format("YYYY-MM-DD")}
                </td>
                <td>{contact.CREATED_USER_ID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllContacts;
