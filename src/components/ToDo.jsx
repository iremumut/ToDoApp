import { doc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import db from "../Firebase";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const ToDo = ({ text, isDone, date, id, getAll }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTask, setNewTask] = useState(text);

  const handleDelete = async () => {
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, "toDos", id));
      await batch.commit();
      getAll();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleTaskUpdate = async () => {
    try {
      const batch = writeBatch(db);
      const taskRef = doc(db, "toDos", id);
      batch.update(taskRef, { name: newTask });
      await batch.commit();
      setIsUpdating(false);
      getAll();
    } catch (e) {
      console.log(e);
    }
  };

  const updateForm = () => {
    return (
      <Col className="d-flex justify-content-between">
        <Form.Control
          type="text"
          value={newTask}
          onChange={handleNewTask}
        ></Form.Control>
        <button onClick={handleTaskUpdate} className="update-btn" type="button">
          Update
        </button>
      </Col>
    );
  };

  const handleFinishTask = async () => {
    try {
      const batch = writeBatch(db);
      const taskRef = doc(db, "toDos", id);
      batch.update(taskRef, { isDone: !isDone });
      await batch.commit();
      getAll();
    } catch (e) {
      console.log(e);
    }
  };

  const checkButton = isDone ? "bi bi-check-square-fill" : "bi bi-check-square";

  return (
    <li className="task d-flex justify-content-between align-items-center my-3">
      {isUpdating ? (
        updateForm()
      ) : (
        <>
          <div>
            <p className={isDone ? "text-overline" : ""}>{text}</p>
            <p className="text-muted date">{date}</p>
          </div>
          <div className="fs-3">
            <button onClick={handleUpdate} className="btn shadow-none">
              <i className="bi bi-pencil-square fa-lg"></i>
            </button>
            <button onClick={handleDelete} className="btn shadow-none">
              <i className="bi bi-x-square"></i>
            </button>
            <button onClick={handleFinishTask} className="btn shadow-none">
              <i className={checkButton}></i>{" "}
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default ToDo;
