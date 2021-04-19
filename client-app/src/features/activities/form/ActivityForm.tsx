import { observer } from 'mobx-react-lite';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'
import useStore from '../../../app/stores/store';


export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {  loading, createActivity, updateActivity, loadActivity} =activityStore;
    const history = useHistory();


    const [activity, setActivity] = useState<Activity>({
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        venue:'',
        city:''
    });

    const {id} = useParams<{id:string}>();
    useEffect(() => {
        id ?
        loadActivity(id).then((activity)=>{
            if(activity) setActivity(activity)
        }) :
        setActivity({
            id:'',
            title:'',
            description:'',
            category:'',
            date:'',
            venue:'',
            city:''
        })

    }, [id,loadActivity])

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name,value} = event.target;
        setActivity({...activity, [name]: value})
    }
    function handleSubmit(event: SyntheticEvent) {
        if(activity.id) {
            updateActivity(activity).then(
                ()=>history.push(`/activities/${activity.id}`)
            );
        } 
         else{
             createActivity(activity).then(
                 ()=>history.push(`/activities/${activity.id}`)
             );
        }        
        
    }

    return (
        <Segment clearing>
            <Form loading={loading} onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder="Description" name="description" value={activity.description} onChange={handleInputChange} />
                <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleInputChange} />
                <Form.Input placeholder="Date" type="date" name="date" value={activity.date} onChange={handleInputChange} />
                <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleInputChange} />
                <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleInputChange} />
                <Form.Group>
                <Form.Button loading={loading} type="submit" primary>Submit</Form.Button>
                <Button type="button" as={Link} to="/activities" basic>Cancel</Button>
                </Form.Group>
            </Form> 
        </Segment>
    )
});
