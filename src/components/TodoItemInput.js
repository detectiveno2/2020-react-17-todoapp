import React, { Component } from "react";
import "./../css/TodoItemInput.css";
import classNames from "classnames";

class TodoItemInput extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      isHide,
      isShow,
      closeInput,
      addInput,
      onChange,
      newInputItem
    } = this.props;
    const classNameOfTodoItemInput = classNames("TodoItemInput", {
      hide: isHide && !isShow,
      show: !isHide && isShow
    });

    return (
      <div className={classNameOfTodoItemInput}>
        <div className="TodoItemInput-wrapper">
          <input
            type="text"
            placeholder="Add something..."
            value={newInputItem}
            onChange={onChange}
          />
          <div>
            <button className="btn add-btn" onClick={addInput}>
              Add
            </button>
            <button className="btn close-btn" onClick={closeInput}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoItemInput;
