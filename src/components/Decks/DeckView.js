import {deleteDeck, readDeck} from "../../utils/api";
import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import ButtonLink from "../ButtonLink";
import CardList from "../Cards/CardList";
import Breadcrumb from "../Breadcrumb";


export default function DeckView() {
    const {url} = useRouteMatch();
    const params = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState(null);
    const [breadcrumb, setBreadcrumb] = useState();
    
    useEffect(() => {
        async function getDeck() {
            const response = await readDeck(params.deckId);
            setDeck(response);
            setBreadcrumb({
                name:response.name
            })
        }
        getDeck();
    }, [params.deckId]);
    

    const handleDelete = async ()=>{
        const confirmMessage = "Delete this card?\n\nYou will not be able to recover it.";
        if (window.confirm(confirmMessage)){
            await deleteDeck(params.deckId).catch((err)=>{
                console.log("Error deleting the deck", err);
            });
            history.push("/")
        }
    }

    return deck && breadcrumb ? (
        <main>
        <Breadcrumb data={breadcrumb}/>
            <div className="container">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className="d-flex justify-content-between">
                    <div className="text-start">
                        <ButtonLink to={`${url}/edit`} className="btn btn-secondary">Edit</ButtonLink>
                        <ButtonLink to={`${url}/study`} className="btn btn-primary">Study</ButtonLink>
                        <ButtonLink to={`${url}/cards/new`} className="btn btn-primary">+ Add Cards</ButtonLink>    
                    </div>
                    <div className="text-end">
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>    
                    </div>
                </div>
            </div>
            <div className="container">
                <h2>Cards</h2>
                <CardList/>
            </div>
        </main>
    ) : null;
}