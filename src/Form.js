import React, { useState, useEffect } from "react";
const Form = ({ note, setName, setDescription, setId, setisUpdating ,handleNotes}) => {
  console.log(note);
  const [isDeleting, setIsDeleting] = useState(false);
  const createNew = () => {
    setName("");
    setDescription("");
    setId("");
    setisUpdating(false);
    setIsDeleting(false);
  };
  const handleRequest = (e) => {
    e.preventDefault();
    let method = "POST";
    let bodyData = { name: note.name, description: note.description };
    let path = "notes";
    if (note.isUpdating && !isDeleting) {
      method = "PUT";
      bodyData.id = note.id;
      path = "updateNotes";
    }
    if(isDeleting){
      method= 'DELETE' ;
      path='deleteNotes';
      bodyData.id = note.id;
    }
    setTimeout(() => {
      const requestOptions = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      };
      fetch(`https://notes-api-tj99.onrender.com/${path}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("data:",data);
          setName(data.name);
          setDescription(data.description);
          handleNotes();
          if(isDeleting){
            setIsDeleting(false);
          }
        });
    }, 1000);
  };
  return (
    <>
      <form onSubmit={handleRequest}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={note.name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={note.description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div className="d-flex gap-5 mb-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button onClick={createNew} className="btn btn-primary">
            New
          </button>

          <button type="submit" onClick={()=>{setIsDeleting(true)}} className="btn btn-danger">
            Delete
          </button>
        </div>
      </form>
    </>
  );
};
export default Form;
