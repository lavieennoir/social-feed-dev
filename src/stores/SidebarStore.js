import { SidebarActionTypes } from "../actions/SidebarActions";
import AppDispatcher from "../data/AppDispatcher";
import EventEmitter from "events";

class SidebarStore extends EventEmitter {
  constructor() {
    super();

    this.state = { isOpen: false };
  }

  getState() {
    return this.state;
  }

  handleActions(action) {
    switch (action.type) {
      case SidebarActionTypes.TOGGLE:
        this.state.isOpen = !this.state.isOpen;
        this.emit("change");
      default:
    }
  }
}

const sidebarStore = new SidebarStore();
AppDispatcher.register(sidebarStore.handleActions.bind(sidebarStore));
export default sidebarStore;
