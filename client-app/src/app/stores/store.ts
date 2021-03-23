import { createContext, useContext } from "react";
import ActivitiesStore from "./activitiesStore";

interface Store{
    activityStore : ActivitiesStore;
}
export const store: Store = {
    activityStore: new ActivitiesStore()
};

export const StoreContext = createContext(store);

export default function useStore() {
    return useContext(StoreContext);
} 
