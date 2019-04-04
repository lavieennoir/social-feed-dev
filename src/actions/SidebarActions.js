import AppDispatcher from "../data/AppDispatcher";

export const SidebarActionTypes = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
  TOGGLE: "TOGGLE"
};

const Actions = {
  toggleSidebar(isOpen) {
    AppDispatcher.dispatch({
      type: SidebarActionTypes.TOGGLE,
      isOpen: isOpen
    });
  }
};

export default Actions;
