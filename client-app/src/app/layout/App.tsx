import React, { useEffect, Fragment, useContext } from 'react';

import { Container } from 'semantic-ui-react';
import Navbar from '../../features/nav/navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import LoadingComponent from './loadingComponent';
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';


const App = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading Activities...' />

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
     
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );
}

export default observer(App);
