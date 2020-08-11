import React, { useContext } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';

const Navbar: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { openCreateForm } = activityStore;
    return (
      <Menu fixed='top' inverted>
          <Container>
              <Menu.Item header>
                  <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                  Reactivities
              </Menu.Item>
              <Menu.Item name='Activities'/>
              <Menu.Item>
                  <Button onClick={openCreateForm} positive content='Create Activity'/>
              </Menu.Item>
          </Container>
      </Menu>
    )
}

export default Navbar;