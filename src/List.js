import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
const List = ({ onElementClick, notes, handleNotes }) => {
  useEffect(() => {
    handleNotes();
  }, []);

  return (
    <>
      <ListGroup>
        {notes.map((note, index) => {
          return (
            <ListGroup.Item
              key={note._id}
              eventKey={index}
              onClick={() => onElementClick(note)}
            >
              #{index} {note.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};
export default List;
