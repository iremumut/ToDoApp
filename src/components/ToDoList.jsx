import db from "../Firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import ToDo from "./ToDo";
import AddTaskForm from "./AddTaskForm";
import { Container, Row, Col } from "react-bootstrap";

const ToDoList = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [fetching, setFetching] = useState({
    loading: false,
    error: null,
  });

  const toDoRef = collection(db, "toDos");

  const getAll = async () => {
    try {
      const data = await getDocs(toDoRef);
      setAllTasks([]);
      data.forEach((doc) => {
        //console.log(doc.data());
        setAllTasks((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    } catch (e) {
      console.log(e);
      setFetching((prev) => {
        return { ...prev, error: e.text };
      });
    }
  };

  useEffect(() => {
    setFetching({
      loading: true,
      error: null,
    });
    getAll();
    setFetching((prev) => {
      return { ...prev, loading: false };
    });
  }, []);

  if (fetching.loading) {
    return <div>Loading Data</div>;
  }

  if (fetching.error) {
    return <div>Error: {fetching.error}</div>;
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md="auto" className="tasks-list">
          <ul>
            {!fetching.loading
              ? allTasks.map((task) => {
                  //console.log(task);
                  return (
                    <ToDo
                      getAll={getAll}
                      key={task.id}
                      text={task.name}
                      date={task.createdAt}
                      isDone={task.isDone}
                      id={task.id}
                    />
                  );
                })
              : ""}
          </ul>
          <AddTaskForm getAll={getAll} />
        </Col>
      </Row>
    </Container>
  );
};

export default ToDoList;
