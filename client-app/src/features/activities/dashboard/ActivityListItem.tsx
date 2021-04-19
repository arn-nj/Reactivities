import React, { Fragment, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import useStore from "../../../app/stores/store";

interface Props {
  activity: Activity;
}
function ActivityListItem({ activity }: Props) {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { loading, deleteActivity } = activityStore;

  function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src="../assets/user.png" />
              <Item.Content as={Link} to={`/activities/${activity.id}`}>
                <Item.Header as={Header}> {activity.title}</Item.Header>
              </Item.Content>
              <Item.Meta>Added by Bob</Item.Meta>
            </Item>
          </Item.Group>
        </Segment>
        <Segment color="grey">
          <div>
            <Icon size="small" name="calendar" style={{ marginLeft: 5 }} />{" "}
            {activity.date} <br />
            <Icon
              size="small"
              name="location arrow"
              style={{ marginLeft: 5 }}
            />{" "}
            {activity.venue}, {activity.city}
          </div>
        </Segment>
        <Segment tertiary clearing>
          <div>
            <Button
              loading={loading && target === activity.id}
              name={activity.id}
              onClick={(e) => handleDelete(e, activity.id)}
              color="red"
              floated="right"
            >
              Delete
            </Button>
            <Button
              primary
              floated="right"
              as={Link}
              to={`/activities/${activity.id}`}
            >
              View
            </Button>
            <Label floated="left">{activity.category}</Label>
          </div>
        </Segment>
      </Segment.Group>
    </>
  );
}

export default ActivityListItem;
