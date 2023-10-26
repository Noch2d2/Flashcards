import React, {useEffect, useState} from "react"
import {Route, Switch, useParams, useHistory} from "react-router-dom"
import {listDecks, deleteDeck, readDeck} from "../../utils/api/index"
import ButtonLink from "../ButtonLink";
import DeckCard from "../Decks/DeckCard";
import DeckView from "../Decks/DeckView";
import DeckStudy from "../Decks/DeckStudy";
import DeckForm from "../Decks/DeckForm";
import CardForm from "../Cards/CardForm";
import NotFound from "../../Layout/NotFound";
export default function Home(){

  const [decks, setDecks] = useState([]);
  const history = useHistory();
  const params = useParams();
  const updateDecks = async () => {
    const fetchResponse = await listDecks().then((response)=>{
      setDecks(response);
    }).catch((err)=>{
        console.log(err);
      });
  }
  
  const removeDeck = async (deckId)=>{
    await deleteDeck(deckId);
    history.go(0);
  }
   
  //load the decks once
  useEffect(()=>{
    const updateDecks = async () => {
      const fetchResponse = await listDecks().catch((err)=>{
        console.log(err);
      });
      setDecks(fetchResponse);
    }
    updateDecks();
  },[params])
  
  
  const deckList = decks.map((deck, index)=>(
    <DeckCard details={deck} key={index} deleteFn={removeDeck}/>
  ));

  return (
    <Switch>
      <Route exact={true} path="/">
        <div className="container" key="1">
          <ButtonLink className="btn btn-secondary" to="/decks/new">+ Create Deck</ButtonLink>
          {deckList}
        </div>
      </Route>
      <Route exact path={`/decks/new`}>
        <DeckForm/>
      </Route>
      <Route exact path={`/decks/:deckId/edit`}>
        <DeckForm editMode />
      </Route>
      <Route exact path={`/decks/:deckId`}>
        <DeckView/>
      </Route>
      <Route exact path={`/decks/:deckId/study`}>
        <DeckStudy/>
      </Route>
      <Route exact path={'/decks/:deckId/cards/new'}>
        <CardForm/>
      </Route>
      <Route exact path={'/decks/:deckId/cards/:cardId/edit'}>
        <CardForm editMode/>
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  )
}