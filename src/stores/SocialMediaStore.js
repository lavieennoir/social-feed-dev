import {
  SocialMediaActionTypes,
  SocialMediaNetworkTypes
} from "../actions/SocialMediaActions";
import SocialMediaDispatcher from "../data/SocialMediaDispatcher";
import EventEmitter from "events";
import FacebookAuthProvider from "../data/authProviders/FacebookAuthProvider";

class SocialMediaStore extends EventEmitter {
  constructor() {
    super();

    this.state = {
      facebookConnected: false,
      twitterConnected: false,
      instagramConnected: false,
      linkedinConnected: false
    };
    this.facebookAuth = new FacebookAuthProvider();
    this.facebookAuth.getLoginStatus(status =>
      this.OnFacebookLoginStatusResponce(status)
    );
  }
  OnFacebookLoginStatusResponce = status => {
    this.state.facebookConnected = status === "connected";
    this.emit("change");
  };

  getState() {
    return this.state;
  }

  handleActions(action) {
    const isConnected = action.type === SocialMediaActionTypes.CONNECTED;
    switch (action.socialNetwork) {
      case SocialMediaNetworkTypes.FACEBOOK:
        this.state.facebookConnected = isConnected;
        break;
      case SocialMediaNetworkTypes.TWITTER:
        this.state.twitterConnected = isConnected;
        break;
      case SocialMediaNetworkTypes.LINKEDIN:
        this.state.instagramConnected = isConnected;
        break;
      case SocialMediaNetworkTypes.INSTAGRAM:
        this.state.linkedinConnected = isConnected;
        break;
      default:
    }
    this.emit("change");
  }
}

const socialMediaStore = new SocialMediaStore();
SocialMediaDispatcher.register(
  socialMediaStore.handleActions.bind(socialMediaStore)
);
export default socialMediaStore;
