import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import useStore from '../../../app/stores/store';


export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity :activity,cancelSelectActivity, openForm} =activityStore;

    if(!activity) return (<LoadingComponent/>)
    return (
       <Card fluid>
           <Card.Header>
                <Image fluid src= {`./assets/categoryImages/${activity.category}.jpg`} bordered />
               
            </Card.Header>
           <Card.Content>
               <Card.Header>{activity.title}</Card.Header>
               <Card.Meta>{activity.date}</Card.Meta>
               <Card.Description>{activity.description}</Card.Description>
            
           </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths="2">
                    <Button onClick={()=>openForm(activity.id)} secondary>Edit</Button>
                    <Button color="red" onClick={()=>cancelSelectActivity()}>Cancel</Button>
                </ButtonGroup>
            </Card.Content>
       </Card>
    )
});
