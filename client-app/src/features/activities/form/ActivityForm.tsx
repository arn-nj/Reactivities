import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'
import useStore from '../../../app/stores/store';


export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, loading, closeForm, createActivity, updateActivity} =activityStore;

    const initialState:Activity = selectedActivity ?? {
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        venue:'',
        city:''
    }

    const [activity, setActivity] = useState<Activity>(initialState);

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name,value} = event.target;
        setActivity({...activity, [name]: value})
    }
    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
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
                <Form.Button onClick={closeForm} type="button" basic>Cancel</Form.Button>
                </Form.Group>
            </Form> 
        </Segment>
    )
});
