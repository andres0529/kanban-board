import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Inote } from "./models";

const initialState = [
  {
    id: "0",
    title: "Title",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  },
  {
    id: "1",
    title: "Design Layout",
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

    // Process to add note in Target Column
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

  // Function to create the new Note from the form
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

  // Function to Delete Notes
  const deleteNote = (idCol: string, noteId: string) => {
    if (idCol === "notes") {
      setNotes(notes.filter((e) => e.id !== noteId));
    } else if (idCol === "processing") {
      setProcessing(processing.filter((e) => e.id !== noteId));
    } else if (idCol === "approved") {
      setApproved(approved.filter((e) => e.id !== noteId));
    } else if (idCol === "done") {
      setDone(done.filter((e) => e.id !== noteId));
    }
  };

  // Function to create the cards according to the info received
  const renderColumns = (idCol: string, title: string, state: Inote[]) => {
    return (
      <Col
        id={idCol}
        md="3"
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e)}
      >
        <h5>{title}</h5>
        {state.map((note: Inote) => {
          return (
            <Card
              key={note.id}
              id={note.id}
              className="my-5 mx-4"
              draggable
              onDragStart={(e) => handleOnDrag(e)}
            >
              <Card.Header className="d-flex p-2  justify-content-between align-items-baseline">
                <p>{note.title}</p>
                <AiOutlineDelete display={ idCol==='done'?'none':'show'} onClick={() => deleteNote(idCol, note.id)} />
              </Card.Header>
              <Card.Body className="">{note.description}</Card.Body>
            </Card>
          );
        })}
      </Col>
    );
  };

  return (
    <div className="App">
      <Container className="my-5 centerItems flex-column">
        <Form className="centerItems">
          <div className="field-form title">
            <input
              required
              type="text"
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="field-form ms-5 description">
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
              className="btn btn-primary d-flex justify-content-around align-items-center"
              onClick={createNote}
            >
              Add <GrAddCircle />
            </button>
          </div>
        </Form>
        <Row className="table">
          {renderColumns("notes", "Notes", notes)}
          {renderColumns("processing", "Processing", processing)}
          {renderColumns("approved", "Approved", approved)}
          {renderColumns("done", "Done", done)}
        </Row>
      </Container>
    </div>
  );
}
export default App;
