import NavigationDispatcher from "../data/NavigationDispatcher";

export const NavigationActionTypes = {
  FEED: "FEED",
  COMP_PROFILE: "COMP_PROFILE"
};

const Actions = {
  openFeed() {
    NavigationDispatcher.dispatch({
      type: NavigationActionTypes.FEED
    });
  },
  openCompanyProfile() {
    NavigationDispatcher.dispatch({
      type: NavigationActionTypes.COMP_PROFILE
    });
  }
};

export default Actions;
