import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (data: string, id: string) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = ({ activities, selectActivity, deleteActivity, submitting, target }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => { selectActivity(activity.id) }}
                  color="blue"
                  label="View"
                  floated="right"
                />
                <Button
                  value={activity.id}
                  onClick={(e, data) => { deleteActivity((data.value as string), activity.id) }}
                  loading={target === activity.id && submitting}
                  color="red"
                  label="Delete"
                  floated="right"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
