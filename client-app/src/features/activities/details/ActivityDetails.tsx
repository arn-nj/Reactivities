import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, Grid, GridColumn, GridRow, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import useStore from '../../../app/stores/store';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailSideBar from './ActivityDetailSideBar';


export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity :activity, loadActivity, initialLoading} =activityStore;
    const {id} = useParams<{id:string}>();   

    useEffect(() => {
        loadActivity(id)
    }, [id, loadActivity])

    if(initialLoading || !activity) return (<LoadingComponent/>)
    return (
        <>
      <Grid>
          <GridColumn width='10'>
          <ActivityDetailHeader />
              <ActivityDetailInfo />
              <ActivityDetailChat />
        </GridColumn>
        <GridColumn width='6'>
            <ActivityDetailSideBar />
        </GridColumn>

        
        <GridRow>
        <Card fluid>
           <Card.Header>
                <Image fluid src= {`../assets/categoryImages/${activity.category}.jpg`} bordered />
               
            </Card.Header>
           <Card.Content>
               <Card.Header>{activity.title}</Card.Header>
               <Card.Meta>{activity.date}</Card.Meta>
               <Card.Description>{activity.description}</Card.Description>
            
           </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths="2">
                    <Button as={Link} to={`/activities/manage/${activity.id}`} secondary>Edit</Button>
                    <Button color="red" as={Link} to='/activities'>Cancel</Button>
                </ButtonGroup>
            </Card.Content>
       </Card>

        </GridRow>
          

         
      </Grid>
      <Grid>
        

      </Grid>
      </>
    )
});
