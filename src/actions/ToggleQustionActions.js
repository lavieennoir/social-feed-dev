import ToggleQuestionDispatcher from "../data/ToggleQuestionDispatcher";

export const ToggleQuestionActions = {
  SHOW: "SHOW",
  HIDE: "HIDE"
};

export const ToggleQuestionName = {
  NAME: "NAME",
  SUBNAME: "SUBNAME"
}


const Actions = {
    
  showSubName() {
    ToggleQuestionDispatcher.dispatch({
      type: ToggleQuestionActions.SHOW,
      name: ToggleQuestionName.SUBNAME
    });
  },
  hideSubName() {
    ToggleQuestionDispatcher.dispatch({
      type: ToggleQuestionActions.HIDE,
      name: ToggleQuestionName.SUBNAME
    });
  },

  showName() {
    ToggleQuestionDispatcher.dispatch({
      type: ToggleQuestionActions.SHOW,
      name: ToggleQuestionName.NAME
    }); 
  },

  hideName() {
    ToggleQuestionDispatcher.dispatch({
      type: ToggleQuestionActions.HIDE,
      name: ToggleQuestionName.NAME
    }); 
  }

};

export default Actions;
