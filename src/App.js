import "./App.css";
import Form from "./Form";
import List from "./List";
import React, { useState } from "react";
function App() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [isUpdating, setisUpdating] = useState(false);
  const [notes, setNotes] = useState([]);
  //let fillForm = this.fillForm.bind(this);
  const handleNotes = () => {
    fetch("https://notes-api-tj99.onrender.com/notes")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        //console.log(notes);
      });
  };
  const handleFillForm = (element) => {
    console.log(element);
    setDescription(element.description);
    setName(element.name);
    setId(element._id);
    setisUpdating(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="mb-5">Notes Application</h1>
          <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-5 justify-content-center">
            <List
              onElementClick={handleFillForm}
              handleNotes={handleNotes}
              notes={notes}
            />
            <Form
              note={{
                name: name,
                description: description,
                id: id,
                isUpdating: isUpdating,
              }}
              setDescription={setDescription}
              setName={setName}
              setId={setId}
              setisUpdating={setisUpdating}
              handleNotes={handleNotes}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
