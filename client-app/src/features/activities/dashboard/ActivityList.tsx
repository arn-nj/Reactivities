import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header, ItemGroup } from 'semantic-ui-react'
import useStore from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';



function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities} =activityStore;


    return (
      <>
        {groupedActivities.map(([group, activities]) => (
          <Fragment key={group}>
            <Header sub color="teal">
              {group}
            </Header>
            
              <ItemGroup divided>
                {activities.map((activity) => (
                  <Fragment key={activity.id}>
                    <ActivityListItem activity={activity} />
                  </Fragment>
                ))}
              </ItemGroup>
          
          </Fragment>
        ))}
      </>
    );
}

export default observer(ActivityList);
