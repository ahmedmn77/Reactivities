import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    upSertMode: boolean
    openForm: (id: string) => void
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard({ activities, selectedActivity
    , selectActivity, cancelSelectActivity, upSertMode, openForm, closeForm, createOrEdit,deleteActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity = {deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !upSertMode &&
                    <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />}
                {upSertMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit= {createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}
