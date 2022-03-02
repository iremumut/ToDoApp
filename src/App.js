import "./App.css";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";
import { Row, Container, Col } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="auto">
          <Header />
          <ToDoList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
