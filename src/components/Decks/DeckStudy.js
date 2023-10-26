import {useParams} from "react-router-dom";
import React, {useState,useEffect} from "react";
import {readDeck} from "../../utils/api";
import CardStudy from "../Cards/CardStudy";
import ButtonLink from "../ButtonLink";
import Breadcrumb from "../Breadcrumb";

export default function DeckStudy (){
    const params = useParams();
    const deckId = params.deckId;
    const [deck,setDeck] = useState({});
    const [breadcrumb, setBreadcrumb] = useState()
     
    useEffect(()=>{
        setBreadcrumb({
            name:deck.name,
            link:`/decks/${params.deckId}`,
            action: "Study"
        })
    },[deck.name])
    
    useEffect(()=>{
        const getDeck = async () =>{
            const deckResponse = await readDeck(params.deckId);
            setDeck(deckResponse);
        }
        getDeck()
    },[deckId]);
    
    
    return deck.cards && deck.name ? (
        <main>
            <Breadcrumb data={breadcrumb}/>
            <h1>Study: {deck.name}</h1>
            {deck.cards.length <= 2 ?
            (<div>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study.  There are {deck.cards.length} cards in this deck.</p>
                <ButtonLink to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">+ Add Cards</ButtonLink>
            </div>)
            : <CardStudy cards={deck.cards}/>}
        </main>
    ): null;
}