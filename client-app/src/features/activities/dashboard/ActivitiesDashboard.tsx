import { observer } from 'mobx-react-lite'
import { useEffect } from 'react';
import { Button, Grid, GridColumn, StepTitle } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import useStore from '../../../app/stores/store'
import ActivityList from './ActivityList'


function ActivitiesDashboard() {
    const {activityStore} = useStore();
    const { activityRegistry, loadActivities, initialLoading} = activityStore;

    
  useEffect(() => {
    if(activityRegistry.size <=1) loadActivities();
 }, [activityRegistry.size ,loadActivities]);


 if(initialLoading) return (<LoadingComponent content="App Loading"  />);


    return (
      <Grid>
        <GridColumn width="10">
        <StepTitle as="h1" content={activityStore.title} />
        <Button onClick={()=>activityStore.setTitle("Hello User")} primary>Show Welcome Message</Button>
        <br/>
        <br/>
          <ActivityList />
        </GridColumn>
        <GridColumn width="6">
            <h3>Activity Filters</h3>
        </GridColumn>
      </Grid>
    );
}

export default observer(ActivitiesDashboard);
