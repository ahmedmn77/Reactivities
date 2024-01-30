//Contains all our app stores

import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

//type that handles contains all app stores
interface Store {
    activityStore:ActivityStore
}

//implementation
export const store: Store = {
    activityStore: new ActivityStore()
}

//prepare the react context
export const StoreContext = createContext(store)

// prepare useStore methoid to be used by the your react components
export function useStore() {
    return useContext(StoreContext);
}