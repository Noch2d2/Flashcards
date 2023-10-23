import ButtonLink from "../ButtonLink";
import {useEffect, useState} from "react"
import {createDeck, readDeck, updateDeck} from "../../utils/api";
import {useHistory, useParams} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";

export default function DeckForm({editMode}){
    
    const formInitialState = {
        id:"",
        name:"",
        description:""
    };

    const history = useHistory();
    const [deck,setDeck] = useState(formInitialState);
    const [breadcrumb, setBreadcrumb] = useState();
    
    //get details for edit mode
    const params = useParams();
    useEffect(()=>{
        async function getDeck() {
            const response = await readDeck(params.deckId);
            setDeck(response);
        }
        if (editMode){
            getDeck();
        }
    },[params.deckId])
    
    useEffect(()=>{
        const editLink  = `/decks/${params.id}/edit`;
        const createLink = "/decks/create";
        setBreadcrumb({
            name:deck.name,
            link: `${editMode ? editLink : createLink}`,
            action: `${editMode ? "Edit Deck": "Create Deck"}`
        })
    },[deck.name, editMode, params.id])
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        let deckResults;
        if (editMode){
            deckResults = await updateDeck(deck).catch((err)=>{
                console.log("Error updating deck!", err);
            });
        }else{
            deckResults = await createDeck(deck).catch((err)=>{
                console.log("Error creating new deck!", err)
            });            
        }
        history.push(`/decks/${deckResults.id}`); 
    }

    const handleChange = ({target})=>{
        setDeck({
            ...deck,
            [target.name]:target.value
        }); 
    }

    return (
    <>
    {deck.name || breadcrumb ? <Breadcrumb data={breadcrumb}/>: ""}
    <h1>{editMode ? "Edit" : "Create"} Deck</h1>
    <form id="theForm" onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                name="name"
                id="name"
                required
                className="form-control"
                value={deck.name}
                onChange={handleChange}
                placeholder="Deck Name"/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
                name="description"
                id="description"
                required
                className="form-control"
                value={deck.description}
                onChange={handleChange}
                placeholder="Brief description of the deck"/>
        </div>
        <ButtonLink to={editMode ? `/decks/${params.deckId}`: '/'} className="btn btn-secondary">Cancel</ButtonLink>
        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
    </form>
    </>
    );
}