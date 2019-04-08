import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme =>
  createStyles({
    dragDrop: {
      border: "dashed grey 1px",
      borderRadius: theme.spacing.unit,
      backgroundColor: "#F2F2F2",
      display: "inline-block",
      position: "relative",
      textAlign: "center",
      padding: theme.spacing.unit * 3,
      width: "100%"
    },
    draggingWrapper: {
      backgroundColor: "rgba(255,255,255,.9)",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999
    },
    dragging: {
      position: "absolute",
      top: theme.spacing.unit * 3,
      right: theme.spacing.unit * 3,
      left: theme.spacing.unit * 3,
      bottom: theme.spacing.unit * 3,
      overflow: "hidden",
      textAlign: "center",
      color: "grey"
    }
  });

class DragAndDropInput extends Component {
  constructor(props) {
    super(props);

    this.dropRef = React.createRef();
    this.state = {
      dragging: false
    };
  }

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) {
      return;
    }
    this.setState({ dragging: false });
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  componentDidMount() {
    this.dragCounter = 0;
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }

  render() {
    const { classes } = this.props;
    return (
      <div ref={this.dropRef} className={classes.dragDrop}>
        {this.state.dragging ? (
          <div className={classes.draggingWrapper}>
            <div className={classes.dragging}>
              <div>Drop your file</div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.props.children}
      </div>
    );
  }
}
export default withStyles(styles)(DragAndDropInput);
