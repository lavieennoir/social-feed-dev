import SocialMediaActions, {
  SocialMediaNetworkTypes
} from "../../actions/SocialMediaActions";

export default class FacebookAuthProvider {
  version = "3.2";
  xfbml = false;
  language = "en_US";
  constructor(version = "3.2", xfbml = false, language = "en_US") {
    this.key = process.env.REACT_APP_FACEBOOK_API_ID;
    this.version = version;
    this.xfbml = xfbml;
    this.language = language;
    this.isSDKLoaded = false;
    if (typeof window.FB === "undefined") {
      this.setFbAsyncInit();
      this.loadSdkAsynchronously();
    }
    this.waitForFBLoad();
  }
  waitForFBLoad(callback) {
    let loadInterval = setInterval(() => {
      if (typeof window.FB !== "undefined") {
        clearInterval(loadInterval);
        this.isSDKLoaded = true;
        if (callback) {
          callback(this);
        }
      }
    }, 500);
  }

  login(success, error) {
    window.FB.login(function(response) {
      if (response.authResponse) {
        if (success) {
          success(response);
        }
        SocialMediaActions.connect(SocialMediaNetworkTypes.FACEBOOK);
      } else {
        if (error) {
          error(response);
        }
      }
    });
  }

  getLoginStatus(callback) {
    if (typeof window.FB === "undefined") {
      this.waitForFBLoad(() => {
        this.getLoginStatus(function(status) {
          callback(status);
        });
      });
    } else {
      window.FB.getLoginStatus(function(response) {
        callback(response.status);
      });
    }
  }

  share(url, success, error) {
    window.FB.ui(
      {
        method: "share",
        href: url
      },
      function(response) {
        if (response && !response.error_message) {
          if (success) {
            success(response);
          }
        } else {
          if (error) {
            error(response);
          }
        }
      }
    );
  }

  logout() {
    window.FB.logout();
    SocialMediaActions.disconect(SocialMediaNetworkTypes.FACEBOOK);
  }

  setFbAsyncInit() {
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${this.version}`,
        appId: this.key,
        xfbml: this.xfbml
      });
    };
  }

  loadSdkAsynchronously() {
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/${this.language}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
}
