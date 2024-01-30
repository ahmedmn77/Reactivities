import {makeAutoObservable, runInAction} from "mobx"
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    //idetify props and its initial values
    //activities: Activity[] = [];
    activityRegistery = new Map<string, Activity>;
    selectedActivity: Activity | undefined = undefined;
    upSertMode = false;
    loading = false;
    loadingInitial = false;
    constructor () {
        makeAutoObservable(this);        
    } 

    //compuetd Property
    get activitiesByDate() {
        return Array.from(this.activityRegistery.values()).sort((a,b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }
    
    addActivityToRegetery = (id: string, activity:Activity) => {
        this.activityRegistery.set(id, activity) //add or update
    }
     

    loadActivites = async () => {
        this.setLoadingInitial(true);
        try {
            const activities= await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);                
            })
            this.setLoadingInitial(false)

        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }        
    }

    loadActivity = async (id : string) => {
        this.setLoadingInitial(true);
        let activity = this.getActivity(id); //coming from memory
        if (activity) { 
            this.selectedActivity = activity
            this.setLoadingInitial(false)
            return activity;
         }// the app is already running
        else { // coming from an external hyperlink
            this.setLoadingInitial(true);
            try {
              activity = await agent.Activities.detail(id);
              this.setActivity(activity);
              runInAction(() => this.selectedActivity = activity)              
              this.setLoadingInitial(false);
              return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id : string) =>{
        return this.activityRegistery.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.addActivityToRegetery(activity.id, activity);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading=true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity);
                this.activityRegistery.set(activity.id,activity);
                this.selectedActivity = activity;
                this.upSertMode = false;
                this.loading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=> {
                //this.activities = [...this.activities.filter(a=> a.id !== activity.id), activity];
                this.activityRegistery.set(activity.id,activity);
                this.selectedActivity = activity;
                this.upSertMode = false;
                this.loading = false
            })

        } catch (error) {
            console.log(error)
            runInAction(()=> {
                this.loading = false
            })
        }
    }

    deleteActivity = async (id: string) =>{
        this.loading = true;        
        try {
            await agent.Activities.delete(id);
            runInAction ( () => {
                //this.activities = [...this.activities.filter(a=> a.id !== id)];
                this.activityRegistery.delete(id);
                this.loading = false;
            } )
        } catch (error) {
            console.log(error)
            runInAction(()=> {
                this.loading = false
            })
        }
    }
}