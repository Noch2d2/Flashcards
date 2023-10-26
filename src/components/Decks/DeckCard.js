import React from "react";
import ButtonLink from "../ButtonLink";

export default function DeckCard(props){
  const {id, cards, description, name} = props.details;

  const handleDelete = (id)=>{
    const response = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (response){
      props.deleteFn(id);
    }
  }
  
  return (
    <main key={id}>
      <div className="card" >
        <div className="d-flex justify-content-between">
          <h3 className="text-start">
            {name}
          </h3>
          <p className="text-end">
            {`${cards.length} cards`}
          </p>
        </div>
        <p>{description}</p>
        <div className="d-flex">
          <div className="p-2 flex-grow-1">
            <ButtonLink to={`/decks/${id}`} className="btn btn-secondary">View</ButtonLink>
            <ButtonLink to={`/decks/${id}/study`} className="btn btn-primary">Study</ButtonLink>
          </div>
          <div className="p-2">
            <button className="btn btn-danger" onClick={()=>handleDelete(id)}>Delete</button>
          </div>
        </div>           
      </div>
      <br/>
    </main>
  )
}