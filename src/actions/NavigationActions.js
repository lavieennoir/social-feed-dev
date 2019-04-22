import NavigationDispatcher from "../data/NavigationDispatcher";

export const NavigationActionTypes = {
  FEED: "FEED",
  COMP_PROFILE: "COMP_PROFILE",
  USER_PROFILE: "USER_PROFILE",
  LEADERBOARD: "LEADERBOADR",
  MANAGE_QUESTIONS: "MANAGE_QUESTIONS"
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
  },
  openManageQuestions() {
    NavigationDispatcher.dispatch({
      type: NavigationActionTypes.MANAGE_QUESTIONS
    });
  }
};

export default Actions;
