import { NavigationActionTypes } from "../actions/NavigationActions";
import NavigationDispatcher from "../data/NavigationDispatcher";
import EventEmitter from "events";

class NavigationStore extends EventEmitter {
  constructor() {
    super();

    this.state = {
      currentPage: NavigationActionTypes.COMP_PROFILE
    };
  }

  getState() {
    return this.state;
  }

  handleActions(action) {
    this.state.currentPage = action.type;
    this.emit("change");
  }
}

const navigationStore = new NavigationStore();
NavigationDispatcher.register(
  navigationStore.handleActions.bind(navigationStore)
);
export default navigationStore;
