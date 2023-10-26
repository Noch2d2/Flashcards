import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

export default function CardStudy({cards}){
    const history = useHistory();
    const initialPresentingState = {
        cardNum:1,
        showFront:true
    }
    const [currentlyPresenting, setCurrentlyPresenting] = useState(initialPresentingState)
    
    const updatePresentation = ({target}) =>{
        if (target.name === "flip"){
            setCurrentlyPresenting({...currentlyPresenting,showFront:!currentlyPresenting.showFront})
        } else {
            if (currentlyPresenting.cardNum === cards.length){
                if(window.confirm("Restart Cards? \n\n Click 'cancel' to return to the home page.")){
                    setCurrentlyPresenting(initialPresentingState);
                    return;
                }else{
                    history.push('/');
                }
            }
            setCurrentlyPresenting({showFront:true,cardNum: currentlyPresenting.cardNum+1})
        }
    };
            
    return (
        <main>
            <div className="card">
                <h4>Card {currentlyPresenting.cardNum} of {cards.length}</h4>
                <p>{currentlyPresenting.showFront ? cards[currentlyPresenting.cardNum-1].front : cards[currentlyPresenting.cardNum-1].back}</p>
                <input
                    type="button"
                    value="Flip"
                    name="flip"
                    className="btn btn-secondary"
                    onClick={updatePresentation}/>
                { !currentlyPresenting.showFront ?
                    (<input
                        type="button"
                        value="Next"
                        name="next"
                        className="btn btn-primary"
                        onClick={updatePresentation}/>
                    ) : null
                }
                    
            </div>
        </main>
    )
}