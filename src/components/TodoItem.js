import React, { Component } from "react";
import "../css/TodoItem.css";

class TodoItem extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { item, onClick } = this.props;
    return (
      <div className="TodoItem" onClick={onClick}>
        <p># {item.title}</p>
      </div>
    );
  }
}

export default TodoItem;
