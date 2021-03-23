import { useEffect } from "react";
import { Button, Container, StepTitle } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import LoadingComponent from "./LoadingComponent";
import useStore from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const {activityStore} = useStore();



  useEffect(() => {
     activityStore.loadActivities();
  }, [activityStore]);


  if(activityStore.initialLoading) return (<LoadingComponent content="App Loading"  />);

  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: "7em" }}>
      <StepTitle as="h1" content={activityStore.title} />
      <Button onClick={()=>activityStore.setTitle("Hello User")} primary>Show Welcome Message</Button>
      <br/>
      <br/>
        <ActivitiesDashboard />
      </Container>
    </>
  );
}

export default observer(App);
