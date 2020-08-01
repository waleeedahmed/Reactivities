import React, { useEffect, useState, Fragment, useContext } from 'react';

import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from '../../features/nav/navbar';
import { ActivityDashboard } from '../../features/Activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';
import ActivityStore from '../stores/activityStore';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivty, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const context = useContext(ActivityStore);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a =>  a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  };
 
  const handleDeleteActivity = (data: any, id: string) => {
    setSubmitting(true);
    setTarget(data);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false))
  };

  useEffect(() => {
    agent.Activities.list()
      .then(res => {
        let activities: IActivity[] = [];
        res.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities)
      }).then(() => setLoading(false))
  }, []);

  if (loading) return <LoadingComponent content='Loading Activities...'/>

  return (
    <Fragment>
      <h1>{context.title}</h1>
      <Navbar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivty}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default App;
