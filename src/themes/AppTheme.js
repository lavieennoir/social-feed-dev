import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  sideBarWidth: 240,
  tableMinWidth: 700,
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#238AC4"
    },
    secondary: {
      main: "#565656"
    }
  },
  overrides: {
    MuiTablePagination: {
      root: {
        overflowX: "auto"
      }
    },
    MuiTableRow: {
      root: {
        height: "100%"
      }
    },
    MuiTableCell: {
      body: {
        height: "100%"
      }
    }
  }
});
