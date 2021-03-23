import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react'
import { Button, Item, ItemGroup, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'
import useStore from '../../../app/stores/store';



function ActivityList() {
    const [target, setTarget] = useState('');
    const {activityStore} = useStore();
    const {activities,loading, selectActivity, deleteActivity} =activityStore;

    function handleDelete(e:SyntheticEvent<HTMLButtonElement> , id:string) {
            setTarget(e.currentTarget.name)
            deleteActivity(id)
    }
    return (
        <Segment loading={loading}>
            <ItemGroup divided>
                
                {activities.map( (activity :Activity) =>
                <Item key={activity.id} style={{marginLeft:10}}>
                <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                    <Item.Meta>{activity.date}</Item.Meta>
                   
                    <Item.Description>
                        <div>{activity.city},{activity.venue}</div>
                    </Item.Description>
                    <Item.Extra style={{ marginRight:20}}>
                        <div>
                        <Button loading={loading && target===activity.id} name={activity.id} onClick={(e)=>handleDelete(e,activity.id)} color="red" floated="right">Delete</Button>
                        <Button primary floated="right" onClick={()=> selectActivity(activity.id)}>View</Button>
                        <Label floated="left">{activity.category}</Label>

                        </div>
                        
                    </Item.Extra>
                    

                </Item.Content>
                   
                    
                </Item>
                )}
            </ItemGroup>
        </Segment>
    )
}

export default observer(ActivityList);
