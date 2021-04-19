import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import { observer } from "mobx-react-lite";
import { Route } from "react-router";
import HomePage from "./HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";

function App() {

  return (
    <>
      <Route path='/' exact component={HomePage} />

      <Route path='/(.+)' render= {() =>  (
        <>
        <NavBar/>
        <Container style={{ marginTop: "7em" }}>
          <Route exact path='/activities'  component={ActivitiesDashboard} />
          <Route  exact path='/activities/:id' component={ActivityDetails} />
          <Route  path={['/activities/manage/:id', '/activity/new']} component={ActivityForm} />
        </Container>
        </>
      )} />
        
      
    </>
  );
}

export default observer(App);
