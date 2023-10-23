import ButtonLink from "../ButtonLink";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {deleteCard, readDeck} from "../../utils/api";
import {useEffect, useState} from "react";

export default function CardList(){
    
    const params = useParams();
    const history = useHistory();
    const {url} = useRouteMatch();
    const [cards, setCards] = useState();
    
    useEffect(()=>{
        const getCards = async ()=>{
            const response = await readDeck(params.deckId);
            if (response.cards){
                setCards(response.cards);
            }
        }
        getCards();
    },[params]);
    
    
    const handleDelete = async (id) =>{
        await deleteCard(id).catch((err)=>{
            console.log("Unable to delete card: ",id, err);
        });
        history.push(`/decks/${params.deckId}`)
    }

    return cards ? (
        <div>
            {cards.map((card)=>(
                <div className="card" key={card.id}>
                    <div className="row g-3">
                        <div className="col">
                            <p>{card.front}</p>
                        </div>
                        <div className="col">
                            <p>{card.back}</p>
                            <div>
                                <div style={{textAlign:"right"}}>
                                    <ButtonLink to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</ButtonLink>
                                    <button onClick={()=>handleDelete(card.id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            ))}   
        </div>
        
    ):null
}