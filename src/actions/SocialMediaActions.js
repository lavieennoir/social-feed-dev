import SocialMediaDispatcher from "../data/SocialMediaDispatcher";

export const SocialMediaActionTypes = {
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED"
};
export const SocialMediaNetworkTypes = {
  FACEBOOK: "FACEBOOK",
  TWITTER: "TWITTER",
  LINKEDIN: "LINKEDIN",
  INSTAGRAM: "INSTAGRAM"
};

const Actions = {
  connect(networkType, token = null) {
    SocialMediaDispatcher.dispatch({
      type: SocialMediaActionTypes.CONNECTED,
      socialNetwork: networkType,
      token
    });
  },
  disconect(networkType) {
    SocialMediaDispatcher.dispatch({
      type: SocialMediaActionTypes.DISCONNECTED,
      socialNetwork: networkType
    });
  }
};

export default Actions;
