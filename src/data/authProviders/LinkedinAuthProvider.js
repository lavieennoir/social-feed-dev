import SocialMediaActions, {
  SocialMediaNetworkTypes
} from "../../actions/SocialMediaActions";

export default class LinkedinAuthProvider {
  authUrl = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${
    process.env.REACT_APP_LINKEDIN_ID
  }&redirect_uri=${encodeURI(
    process.env.REACT_APP_URL
  )}&state=linkedin&scope=r_basicprofile%20w_share`;

  constructor() {
    this.token = null;
  }

  getAuthLink() {
    return this.authUrl;
  }

  checkLoginUrl() {
    const url = new URL(window.location);
    if (url.searchParams.get("state") === "linkedin") {
      this.token = url.searchParams.get("code");
      if (this.token) {
        SocialMediaActions.connect(SocialMediaNetworkTypes.LINKEDIN);
      }
      window.history.pushState("", "", "/");
    }
  }
}
