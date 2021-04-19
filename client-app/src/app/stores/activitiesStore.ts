import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/Activity";
import { v4 as uuid } from "uuid";

export default class ActivitiesStore {
  title: string = "Hello World!";
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  initialLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date)-Date.parse(b.date));
  }

  get groupedActivities() {
      return Object.entries(
          this.activitiesByDate.reduce((activities, activity) => {
                  const dateVal:string = activity.date;
                  activities[dateVal] =activities[dateVal] ? [...activities[dateVal], activity] : [activity];
                  return activities;
              },
              {} as {[key:string]: Activity[]})
          );
  }

  setTitle = (msg: string) => {
    this.title = msg;
  };

  loadActivities = async () => {
    this.setInitLoading(true);
    try {
      const activities = await agent.activities.list();
      activities.forEach((element) => {
        this.setActivity(element);
      });
      this.setInitLoading(false);

    } catch (error) {
      console.log(error);
      this.setInitLoading(false);
    }
  };

  loadActivity = async (id:string) => {
      let activity = this.getActivity(id);
      if(activity){
          this.selectedActivity = activity;
          return activity;
      }else{
          this.initialLoading = true;
          try {
              activity = await agent.activities.details(id);
              this.setActivity(activity);
              this.initialLoading = false;
              this.selectedActivity = activity;
              return activity;
          } catch (error) {
              console.log(error);
              this.initialLoading = false;
          }
      }
  }

  private setActivity = (activity:Activity) =>{
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id,activity);
  }

  private getActivity = (id:string)=>{
      return this.activityRegistry.get(id);
  }


  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setInitLoading = (state: boolean) => {
    this.initialLoading = state;
  };

  setEditMode = (mode: boolean) => {
    this.editMode = mode;
  };

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    activity.id = uuid();
    try {
      await agent.activities.create(activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id,activity);
        this.selectedActivity = activity;
      });
      this.setLoading(false);
      
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  updateActivity = async (activity: Activity) => {
    this.setLoading(true);
    try {
      await agent.activities.update(activity.id, activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id,activity);
        this.selectedActivity = activity;
      });

      this.setLoading(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  deleteActivity = async (id: string) => {
    this.setLoading(true);

    await agent.activities.remove(id);
    runInAction(() => {
      this.activityRegistry.delete(id);
    });
    this.setLoading(false);
  };
}


