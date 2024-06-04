import { DataState } from "../enum/data.state.enum";

// determines the data state of the application
export interface AppState<T>{
    dataState: DataState;
    appData?: T; //? means optional
    errror?: string; 
}