import { observer } from 'mobx-react-lite'
import { Grid, GridColumn } from 'semantic-ui-react'
import useStore from '../../../app/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


function ActivitiesDashboard() {
    const {activityStore} = useStore();
    const {editMode,selectedActivity} =activityStore;

    return (
      <Grid>
        <GridColumn width="10">
          <ActivityList />
        </GridColumn>
        <GridColumn width="6">
          {!editMode && selectedActivity && (
            <ActivityDetails />
          )}
          {editMode && <ActivityForm />}
        </GridColumn>
      </Grid>
    );
}

export default observer(ActivitiesDashboard);
