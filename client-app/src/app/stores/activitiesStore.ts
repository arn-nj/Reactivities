import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/Activity";
import { v4 as uuid } from "uuid";

export default class ActivitiesStore {
  title: string = "Hello World!";
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  initialLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setTitle = (msg: string) => {
    this.title = msg;
  };

  loadActivities = async () => {
    this.setInitLoading(true);
    try {
      const activities = await agent.activities.list();
      activities.forEach((element) => {
        element.date = element.date.split("T")[0];
      });
      this.activities = activities;
      this.setInitLoading(false);

    } catch (error) {
      console.log(error);
      this.setInitLoading(false);
    }
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setInitLoading = (state: boolean) => {
    this.initialLoading = state;
  };

  setEditMode = (mode: boolean) => {
    this.editMode = mode;
  };

  selectActivity = (id: string) => {
    this.setEditMode(false);
    this.selectedActivity = this.activities.find((x) => x.id === id);
  };

  cancelSelectActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectActivity();
    this.setEditMode(true);
  };

  closeForm = () => {
    this.setEditMode(false);
  };

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    activity.id = uuid();
    try {
      await agent.activities.create(activity);

      runInAction(() => {
        this.activities.push(activity);
      });
      this.setLoading(false);
      this.selectActivity(activity.id);
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
        this.activities = [
          ...this.activities.filter((x) => x.id !== activity.id),
          activity,
        ];
      });

      this.setLoading(false);
      this.selectActivity(activity.id);
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
      this.activities = [...this.activities.filter((x) => x.id !== id)];
    });
    this.setLoading(false);
  };
}
