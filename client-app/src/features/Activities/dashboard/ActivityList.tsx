import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { IActivity } from '../../../app/models/activity';


const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, selectActivity, deleteActivity, submitting, target } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity: IActivity) => (
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
                  onClick={(e, data) => { deleteActivity(data.value, activity.id) }}
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

export default observer(ActivityList);