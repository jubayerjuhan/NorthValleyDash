import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AllContacts from "../components/AllContacts";
import AllProjects from "../components/AllProjects";

const Home = () => {
  return (
    <Tabs
      defaultActiveKey="contacts"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="contacts" title="Contacts">
        <AllContacts />
      </Tab>
      <Tab eventKey="projects" title="Projects">
        <AllProjects />
      </Tab>
    </Tabs>
  );
};

export default Home;
