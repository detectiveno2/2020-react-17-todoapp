import React, { Component } from "react";
import "../css/TodoApp.css";
import TodoItem from "./TodoItem.js";
import TodoItemInput from "./TodoItemInput.js";

export default class TodoApp extends Component {
  constructor() {
    super();
    if (!localStorage.getItem("todoItems")) {
      var todoItems = [];
    } else {
      var todoItems = JSON.parse(localStorage.getItem("todoItems"));
    }
    this.state = {
      todoItems: todoItems,
      // { title: "Đi chơi", isFinished: true },
      // { title: "Học bài", isFinished: true },
      // { title: "Về nhà nghỉ ngơi", isFinished: false },
      // { title: "Đi ngủ", isFinished: false }
      newInputItem: "",
      hideInput: true,
      showInput: false
    };
    this.showInput = this.showInput.bind(this);
    this.closeInput = this.closeInput.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addInput = this.addInput.bind(this);
  }

  showInput() {
    this.setState({ showInput: true, hideInput: false });
  }

  closeInput() {
    this.setState({ showInput: false, hideInput: true });
  }

  toggleItem(item) {
    return async event => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      const isFinished = item.isFinished;

      await this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isFinished: !isFinished
          },
          ...todoItems.slice(index + 1)
        ]
      });

      localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    };
  }

  onChange(event) {
    let text = event.target.value;
    this.setState({
      newInputItem: text
    });
  }

  async addInput(event) {
    const { newInputItem } = this.state;

    if (!newInputItem.trim()) return;

    await this.setState({
      todoItems: [
        { title: newInputItem.trim(), isFinished: false },
        ...this.state.todoItems
      ]
    });

    localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));

    this.setState({
      newInputItem: ""
    });

    this.closeInput();
  }

  render() {
    const { hideInput, showInput, todoItems, newInputItem } = this.state;

    // filter array of finished item.
    const finishedTodoItems = todoItems.filter(todoItem => todoItem.isFinished);

    // filter array of unfinished item.
    const unfinishedTodoItems = todoItems.filter(
      todoItem => !todoItem.isFinished
    );

    return (
      <div className="TodoApp">
        <div className="Header">
          <p className="White-text">DAILIST</p>
        </div>
        {todoItems.length === 0 && (
          <img
            src="https://cdn.glitch.com/73ebb838-1ad1-43f5-bd52-13cee9fce15e%2Fno-data.svg?v=1588876085640"
            width="400"
          />
        )}
        {todoItems.length > 0 && (
          <div className="Body-app">
            <div className="Upcoming">
              <p className="White-text Title">UPCOMING</p>
              <div className="Upcoming-body">
                {unfinishedTodoItems.map((item, index) => (
                  <TodoItem
                    key={index}
                    item={item}
                    onClick={this.toggleItem(item)}
                  />
                ))}
              </div>
            </div>
            <div className="Finished">
              <p className="White-text Title">FINISHED</p>
              <div className="Finished-body">
                {finishedTodoItems.map((item, index) => (
                  <TodoItem
                    key={index}
                    item={item}
                    onClick={this.toggleItem(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <button className="Add-btn" onClick={this.showInput}>
          <img
            src="https://image.flaticon.com/icons/svg/1417/1417434.svg"
            width="16"
            alt="add button"
          />
        </button>
        <TodoItemInput
          isHide={hideInput}
          isShow={showInput}
          newInputItem={newInputItem}
          closeInput={this.closeInput}
          addInput={this.addInput}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

// Requirements:
// Viết một app todo-list có giao diện như hình https://cdn.glitch.com/780fd861-6c5c-464f-8b1b-c3c0ed64e30a%2FPasted_Image_4_20_20__9_05_PM.png?v=1587384320345
// Không cần phải giống 100%, nhưng càng giống càng tốt và phải có tính thẩm mỹ
// Illustration có thể tải ở đây https://undraw.co/illustrations hoặc các nguồn khác và upload lên Glitch assets
// Cần làm:
// - Màn hình danh sách todo list, nếu trống thì hiển thị một hình nào đó như trong ảnh
// - Khi ấn nút + để tạo todo mới thì hiển thị modal có chứa 1 text input và nút để add - 50%
// - Khi ấn vào 1 item thì sẽ toggle trạng thái isDone của nó - 100%
// - Nếu isDone là true thì cho vào danh sách Finished, còn không thì ở Upcoming - 100%
