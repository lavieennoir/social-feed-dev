import NavigationDispatcher from "../data/NavigationDispatcher";

export const NavigationActionTypes = {
  FEED: "FEED",
  COMP_PROFILE: "COMP_PROFILE",
  USER_PROFILE: "USER_PROFILE",
  LEADERBOARD: "LEADERBOADR"
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
  },
  openUserProfile() {
    NavigationDispatcher.dispatch({
      type: NavigationActionTypes.USER_PROFILE
    });
  },
  openLeaderboard() {
    NavigationDispatcher.dispatch({
      type: NavigationActionTypes.LEADERBOARD
    });
  }
};

export default Actions;
