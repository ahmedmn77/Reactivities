import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {activityRegistery, loadActivites} = activityStore;
    //happens as side effect when the component first load
    useEffect(() => {
        if (activityRegistery.size<=1) loadActivites();
    }, [loadActivites , activityRegistery.size])       

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading App ...'/>  
   
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Filter Activities</h2>
            </Grid.Column>
        </Grid>
    )
})
