import { addDoc, collection } from "firebase/firestore";
import db from "../Firebase";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const initalTaskState = {
  name: "",
  isDone: false,
  createdAt: "",
};
const AddTaskForm = ({ getAll }) => {
  const [task, setTask] = useState(initalTaskState);
  const [error, setError] = useState(false);

  const toDoRef = collection(db, "toDos");

  const getDate = () => {
    const today = new Date();
    const date =
      today.getDate() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes();
    return date + "  " + time;
  };

  const handleTask = (e) => {
    setTask({
      name: e.target.value,
      isDone: false,
      createdAt: getDate(),
    });
  };

  const add = async () => {
    try {
      const docRef = await addDoc(toDoRef, { ...task, createdAt: getDate() });
      console.log(docRef);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length === 0) {
      setError(true);
    } else {
      setError(false);
      add();
      setTask(initalTaskState);
      getAll();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="d-flex justify-content-between align-items-center add-task-form">
        <Col xs={10}>
          <Form.Control
            type="text"
            placeholder="Enter your task"
            onChange={handleTask}
            value={task.name}
          ></Form.Control>
        </Col>
        <Col xs={2}>
          <button type="submit" className="update-btn add-btn">
            Add
          </button>
        </Col>
      </Row>
      {error ? (
        <p className="text-danger mt-3 pb-0 mb-0">Task can't be empty!</p>
      ) : (
        ""
      )}
    </Form>
  );
};

export default AddTaskForm;
