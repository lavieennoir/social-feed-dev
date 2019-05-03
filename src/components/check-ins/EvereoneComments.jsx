import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Favorite from "@material-ui/icons/Favorite";
import Flag from "@material-ui/icons/Flag";
import Comment from "@material-ui/icons/Comment";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import InputAdornment from "@material-ui/core/InputAdornment";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import WebAsset from "@material-ui/icons/WebAsset";
import MailOutline from "@material-ui/icons/MailOutline";
import { Typography, List } from "@material-ui/core";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  nullMargin: {
    margin: "0"
  },
  comments: {
    borderTop: "1px solid RGB(210, 210, 210)",
    paddingTop: "20px"
  },
  commentsTitle: {
    padding: "20px",
    backgroundColor: "RGB(168, 199, 224, 0.3)",
    minWidth: "100%",
    boxSizing: "border-box",
    fontWeight: "600"
  },
  commentsBody: {
    margin: "20px 0 20px 30px"
  },
  flag: {
    margin: "10px 0 10px 20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  commentsBlock: {
    backgroundColor: "RGB(240, 240, 240)",
    marginLeft: "20px"
  },
  someDate: {
    opacity: "0.4",
    marginLeft: "10px"
  },
  like: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "RGB(200, 200, 200)",
    marginLeft: "10px"
  },
  post: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  postActions: {
    marginLeft: "auto",
    display: "flex"
  },
  flagIcon: {
    marginRight: "5px"
  },
  menuButton: {
    marginLeft: "5px",
    padding: "0"
  },
  commentList: {
    paddingLeft: "10px",
    paddingRight: "50px",
    paddingTop: "0.1px",
    paddingBottom: "0.1px"
  },
  commentListItem: {
    display: "flex",
    flexDirection: "row",
    padding: "0",
    margin: "13px 0"
  },
  commentPersonIcon: {
    width: "30px",
    height: "30px",
    minWidth: "30px",
    borderRadius: "50%",
    backgroundColor: "RGB(200, 200, 200)",
    margin: "3px 10px 0"
  },
  subcomment: {
    fontSize: "12px"
  },
  blockForComment: {
    display: "inline-block",
    width: "100%",
    boxSizing: "border-box",
    paddingTop: "10px"
  },
  textField: {
    margin: "0",
    width: "100%",
    marginBottom: "10px"
  },
  webAsset: {
    opacity: "0.6",
    marginRight: theme.spacing.unit
  },
  subCommentBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "-3px"
  },
  actionImg: {
    marginRight: "25px",
    padding: "0",
    opacity: "0.6"
  },
  nullVerticalPadding: {
    paddingTop: "0",
    paddingBottom: "0"
  },
  iconButton: {
    padding: "5px"
  }
});

const weeks = [
  {
    id: "0",
    posts: [
      {
        id: "0",
        comments: [
          {
            id: "0"
          },
          {
            id: "1"
          }
        ]
      },
      {
        id: "1",
        comments: []
      },
      {
        id: "2",
        comments: [
          {
            id: "0"
          }
        ]
      }
    ]
  },
  {
    id: "0",
    posts: [
      {
        id: "0",
        comments: [
          {
            id: "0"
          },
          {
            id: "1"
          }
        ]
      },
      {
        id: "1",
        comments: []
      },
      {
        id: "2",
        comments: [
          {
            id: "0"
          }
        ]
      }
    ]
  }
];

class EvereoneComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorAction: null,
      weeks: weeks,
      comment: "",
      favorite: false
    };
  }

  commentActionClick = id => {
    this.setState(state => ({ comment: state.comment == id ? "" : id }));
  };

  favoriteActionClick = () => {
    this.setState(state => ({ favorite: !state.favorite }));
  };

  handleActionClick = event => {
    this.setState({ anchorAction: event.currentTarget });
  };

  handleActionClose = () => {
    this.setState({ anchorAction: null });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { anchorAction, weeks, comment, favorite } = this.state;
    const isActionOpen = anchorAction ? true : false;
    return (
      <React.Fragment>
        {weeks.map(week => (
          <div className={classes.comments}>
            <Typography variant="body2" className={classes.commentsTitle}>
              What went well this week?
            </Typography>
            {week.posts.map(post => (
              <div className={classes.commentsBody}>
                <Typography className={classes.post} variant="body2">
                  <span>This was a really nice and productive week.</span>
                  <span className={classes.like}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={() => this.favoriteActionClick()}
                    >
                      <Favorite color={favorite ? "primary" : "disabled"} />
                    </IconButton>
                    Like
                  </span>
                  <span className={classes.postActions}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={() => this.commentActionClick(post.id)}
                    >
                      <Comment color="action" />
                    </IconButton>
                    <IconButton
                      aria-label="More"
                      aria-owns={isActionOpen ? "action-menu" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleActionClick}
                      className={classes.menuButton}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="action-menu"
                      anchorEl={anchorAction}
                      open={isActionOpen}
                      onClose={this.handleActionClose}
                    >
                      <MenuItem key="action1" onClick={this.handleActionClose}>
                        <Flag className={classes.actionImg} />
                        Un-flag for follow-up
                      </MenuItem>
                      <MenuItem key="action2" onClick={this.handleActionClose}>
                        <MailOutline className={classes.actionImg} />
                        Share by email
                      </MenuItem>
                    </Menu>
                  </span>
                </Typography>
                <Typography className={classes.flag}>
                  <Flag className={classes.flagIcon} color={"primary"} />
                  <b className={classes.flagIcon}>Ana Gallo</b> flagged for
                  follow up
                  <span className={classes.someDate}>date</span>
                </Typography>
                <div className={classes.commentsBlock}>
                  <List
                    className={classNames(classes.commentList, {
                      [classes.nullVerticalPadding]:
                        post.comments.length == 0 && comment != post.id
                    })}
                  >
                    {post.comments.map(comment => (
                      <listItem className={classes.commentListItem}>
                        <div
                          className={classNames(
                            classes.commentPersonIcon,
                            classes.nullMargin
                          )}
                        />{" "}
                        <Typography>
                          <b>Ana Gallo</b>
                          <span className={classes.someDate}>Just now</span>
                          <div className={classes.subcomment}>
                            This is an example of a comment related to the
                            previous question
                          </div>
                        </Typography>
                      </listItem>
                    ))}
                    <Collapse
                      in={comment == post.id && comment !== ""}
                      timeout="auto"
                      unmountOnExit
                    >
                      <listItem className={classes.commentListItem}>
                        <div
                          className={classNames(
                            classes.commentPersonIcon,
                            classes.nullMargin
                          )}
                        />
                        <div className={classes.blockForComment}>
                          <TextField
                            id="Comment"
                            placeholder="Comment"
                            name="commentInput"
                            value={this.state.multiline}
                            onChange={this.handleChange("multiline")}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <InsertEmoticon
                                    className={classes.commentAction}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                          <div className={classes.subCommentBlock}>
                            <WebAsset className={classes.webAsset} />
                            <Typography style={{ display: "inline" }}>
                              Private comment to <span>Ana Gallo</span>
                            </Typography>
                          </div>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.printButton}
                          >
                            Post comment
                          </Button>
                        </div>
                      </listItem>
                    </Collapse>
                  </List>
                </div>
              </div>
            ))}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EvereoneComments);
