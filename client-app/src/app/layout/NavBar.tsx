import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import useStore from '../stores/store';


function NavBar() {

    const {activityStore} = useStore();
    const {openForm} = activityStore;
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item>
                    <img src="./assets/logo.png" alt="" style={{marginRight:10}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities">
                    
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={()=>openForm()} positive>Create an Activity</Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);
