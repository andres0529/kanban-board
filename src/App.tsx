import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "./App.css";
import { Inote } from "./models";

const initialState = [
  {
    id: "0",
    title: "Get requirements",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "1",
    title: "Design Layout",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "2",
    title: "Design DB Schema",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "3",
    title: "Develop Server",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "4",
    title: "Deply App",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
];

const emptyForm = {
  id: "",
  title: "",
  description: "",
};

function App() {
  const [dataBase, setDataBase] = useState<Inote[]>(initialState);
  const [notes, setNotes] = useState<Inote[]>(dataBase);
  const [processing, setProcessing] = useState<Inote[]>([]);
  const [approved, setApproved] = useState<Inote[]>([]);
  const [done, setDone] = useState<Inote[]>([]);
  const [form, setForm] = useState<Inote>(emptyForm);

  const handleOnDrag = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const parent = e.currentTarget.parentNode as HTMLDivElement;
    e.dataTransfer.setData("currentCol", `${parent.id}-${target.id}`);
  };

  const handleOnDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData("currentCol").split("-");
    const newColumn = e.target as HTMLDivElement;
    const oldColumn = data[0];
    const idNote = data[1];

    let newCard = dataBase.find((e) => e.id === idNote);
    // If the Column origin is the same to column destination
    if (!newColumn.id || newColumn.id === oldColumn) {
      return "";
    }
    // If newCard is undefined
    if (!newCard) {
      return "";
    }
    // Process to delete note in origen Column
    if (oldColumn === "notes") {
      setNotes(notes.filter((e) => e.id !== idNote));
    } else if (oldColumn === "processing") {
      setProcessing(processing.filter((e) => e.id !== idNote));
    } else if (oldColumn === "approved") {
      setApproved(approved.filter((e) => e.id !== idNote));
    } else if (oldColumn === "done") {
      setDone(done.filter((e) => e.id !== idNote));
    }

    // Process to add note in Destination Column
    if (newColumn.id === "notes") {
      setNotes(notes.concat([newCard]));
    } else if (newColumn.id === "processing") {
      setProcessing(processing.concat([newCard]));
    } else if (newColumn.id === "approved") {
      setApproved(approved.concat([newCard]));
    } else if (newColumn.id === "done") {
      setDone(done.concat([newCard]));
    }
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const createNote = () => {
    if (!form.title || !form.description) return;

    let newCard = {
      id: `${Date.now()}`,
      title: form.title,
      description: form.description,
    };
    // cleanning form
    setForm(emptyForm);
    // Updating the note column and state with new card
    setDataBase(dataBase.concat([newCard]));
    setNotes(notes.concat([newCard]));
  };
  return (
    <div className="App">
      <Container className="my-5 centerItems flex-column">
        <Form className="centerItems">
          <div className="field-form w-50">
            <input
              required
              type="text"
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="field-form ms-5 w-75">
            <input
              required
              type="text"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="field-form ms-5">
            <button
              type="button"
              className="btn btn-primary"
              onClick={createNote}
            >
              Add
            </button>
          </div>
        </Form>
        <Row className="table">
          <Col
            id="notes"
            md="3"
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e)}
          >
            <h5>Notes</h5>
            {notes.map((note: Inote) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  className="my-5 mx-4"
                  draggable
                  onDragStart={(e) => handleOnDrag(e)}
                >
                  <Card.Header>{note.title}</Card.Header>
                  <Card.Body>{note.description}</Card.Body>
                </Card>
              );
            })}
          </Col>
          <Col
            id="processing"
            md="3"
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e)}
          >
            <h5>Processing</h5>
            {processing.map((note: Inote) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  className="my-5 mx-4"
                  draggable
                  onDragStart={(e) => handleOnDrag(e)}
                >
                  <Card.Header>{note.title}</Card.Header>
                  <Card.Body>{note.description}</Card.Body>
                </Card>
              );
            })}
          </Col>
          <Col
            id="approved"
            md="3"
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e)}
          >
            <h5>Approved</h5>
            {approved.map((note: Inote) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  className="my-5 mx-4"
                  draggable
                  onDragStart={(e) => handleOnDrag(e)}
                >
                  <Card.Header>{note.title}</Card.Header>
                  <Card.Body>{note.description}</Card.Body>
                </Card>
              );
            })}
          </Col>
          <Col
            id="done"
            md="3"
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e)}
          >
            <h5>Done</h5>
            {done.map((note: Inote) => {
              return (
                <Card
                  key={note.id}
                  id={note.id}
                  className="my-5 mx-4"
                  draggable
                  onDragStart={(e) => handleOnDrag(e)}
                >
                  <Card.Header>{note.title}</Card.Header>
                  <Card.Body>{note.description}</Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default App;