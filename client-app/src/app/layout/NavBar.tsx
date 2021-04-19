import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'


function NavBar() {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact>
                    <img src="../assets/logo.png" alt="" style={{marginRight:10}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" as={NavLink} to='/activities' exact>
                    
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/activity/new' exact positive>Create an Activity</Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);
