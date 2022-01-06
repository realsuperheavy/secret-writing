import { StateInterface } from "./state.interface";

export class StateClass implements StateInterface {
  lastLocation: string;
  isUserLoggedIn: boolean;
  lastCloudSave: string;
  lastLocalSave: string;
  currentProject: string;
  currentScene: string;
  currentTitle: string;

  constructor(
    lastLocation: string = "",
    isUserLoggedIn: boolean = false,
    lastCloudSave: string = "",
    lastLocalSave: string = "",
    currentProject: string = "",
    currentScene: string = "",
    currentTitle: string = ""
  ) {
    this.lastLocation = lastLocation;
    this.isUserLoggedIn = isUserLoggedIn;
    this.lastCloudSave = lastCloudSave;
    this.lastLocalSave = lastLocalSave;
    this.currentProject = currentProject;
    this.currentScene = currentScene;
    this.currentTitle = currentTitle;
  }
}
