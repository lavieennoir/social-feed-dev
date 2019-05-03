import {
  ToggleQuestionActions,
  ToggleQuestionName
} from "../actions/ToggleQustionActions";
import ToggleQuestionDispatcher from "../data/ToggleQuestionDispatcher";
import EventEmitter from "events";

class ToggleQuestionStore extends EventEmitter {
  constructor() {
    super();

    this.state = {
      isNameHidden: true,
      isSubNameHidden: true
    };
  }

  getState() {
    return this.state;
  }

  handleActions(action) {
    const isHidden = action.type === ToggleQuestionActions.HIDE;

    if (action.name === ToggleQuestionName.NAME) {
      this.state.isNameHidden = isHidden;
    } else {
      this.state.isSubNameHidden = isHidden;
    }

    this.emit("change");
  }
}

const toggleQuestionStore = new ToggleQuestionStore();
ToggleQuestionDispatcher.register(
  toggleQuestionStore.handleActions.bind(toggleQuestionStore)
);
export default toggleQuestionStore;
