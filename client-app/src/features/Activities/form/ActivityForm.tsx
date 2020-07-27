import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialFormState, createActivity, editActivity}) => {

  const initializeForm = () => {
    if (initialFormState) return initialFormState;
    else return {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
      city: '',
      venue: ''
    }
  };

  const [activity, setActivity] = React.useState<IActivity>(initializeForm);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleFormSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity)
    } else {
      editActivity(activity)
    }
  };
 
  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit}>
        <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
        <Form.TextArea rows={2} placeholder="Description" value={activity.description} name='description' onChange={handleInputChange}/>
        <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
        <Form.Input type='datetime-local' placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
        <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}/>
        <Button floated='right' positive type='submit' content='Submit' />
        <Button floated='right' onClick={() => setEditMode(false)} type='button' content='Cancel' />
      </Form>
    </Segment>
  )
}