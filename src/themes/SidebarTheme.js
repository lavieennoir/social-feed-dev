import { createMuiTheme } from "@material-ui/core/styles";

const SideBarTheme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#222222"
      }
    },
    MuiListItemIcon: {
      root: {
        color: "#565656"
      }
    },
    MuiListItemText: {
      primary: {
        color: "#F6F6F6"
      }
    },
    MuiIconButton: {
      root: {
        color: "#236991"
      }
    },
    MuiTypography: {
      subheading: {
        color: "#565656"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default SideBarTheme;
