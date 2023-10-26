import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {createCard, readCard, readDeck, updateCard} from "../../utils/api";
import ButtonLink from "../ButtonLink";

export default function CardForm({editMode}){

    const params = useParams();
    
    const initialForm = {
        id:"",
        front:"",
        back:"",
    }
    const [deck,setDeck] = useState();
    const [formData,setFormData] = useState(initialForm);
    
    //Get the deck on page load
    useEffect(()=>{
        async function getDeck() {
            const response = await readDeck(params.deckId);
            setDeck(response);
        }
        getDeck();
    },[params.deckId]);
    
    //If editing a card, read the card details
    useEffect(()=>{
        async function getCard() {
            const response = await readCard(params.cardId);
            setFormData(response);
        }
        if(editMode){
            getCard();
        }
    },[params.cardId]);
    
    //Form submit
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //update card if the form is presented in edit mode
        if (editMode){
            await updateCard(formData).catch((err)=>{
                console.log("Error updating deck!", err);
            });
        //create card if the form is presented in normal mode
        }else{
            await createCard(params.deckId,formData).catch((err)=>{
                console.log("Error creating new deck!", err)
            });
        }
        setFormData(initialForm);   
    }
    
    const handleChange = ({target})=>{
        setFormData({...formData,
            [target.id]:target.value});
    }
    
    //TODO:Breadcrumbs
    return deck ? (
        <main>
            <h3><span>{deck.name}</span>:<span>Add Card</span></h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="front">
                            Front
                        </label>
                    </div>
                    
                    <textarea
                        id="front"
                        placeholder="Front side of card"
                        onChange={handleChange}
                        value={formData.front}
                        required
                    />
                </div>
                <div>
                    <div>
                        <label htmlFor="back">
                            Back
                        </label>
                    </div>
                    <textarea
                        id="back"
                        placeholder="Back side of card"
                        onChange={handleChange}
                        value={formData.back}
                        required
                    />
                </div>
                <ButtonLink to={`/decks/${params.deckId}`} className="btn btn-secondary">Done</ButtonLink>
                <input className="btn btn-primary" type="submit" value="Save"/>
            </form>
        </main>
    ):null
}