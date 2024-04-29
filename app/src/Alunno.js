import {useState} from 'react';

export default function Alunno({alunno, loadAlunni}){

    const [inCancellazione, setInCancellazione] = useState(false);
    
    const [inConfermaCancellazione, setInConfermaCancellazione] = useState(false);

    const [inModifica, setInModifica] = useState(false);

    const [inConfermaModifica, setInConfermaModifica] = useState(false);


    async function cancellaAlunno(){
        setInCancellazione(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`,
        {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
        });
        loadAlunni();
        setInCancellazione(false);
    }

    async function modificaAlunno(){
        setInModifica(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
        });
        loadAlunni();
        setInModifica(false);
    }

    function richiediConfermaCancellazione(){
        setInConfermaCancellazione(true);
    }
    function annullaCancellazione(){
        setInConfermaCancellazione(false);
    }

    function richiediConfermaModifica(){
        setInConfermaModifica(true);
    }
    function annullaModifica(){
        setInConfermaModifica(false);
    }

    return(
        <div>
            {alunno.id} - {alunno.nome} {alunno.cognome}
            { inCancellazione ?
                <span> in cancellazione... </span>
            :
                <span>
                    { inConfermaCancellazione ?
                        <span>Sei sicuro? 
                        <button onClick={cancellaAlunno}>si</button>
                        <button onClick={annullaCancellazione}>no</button></span>
                        :
                        <button onClick={richiediConfermaCancellazione}>Cancella</button>
                    }
                </span>
            }
            
            { inModifica ?
                <span> Aggiornamento in corso... </span>
            :
                <span>
                    { inConfermaModifica ?
                        <span>Sei sicuro?
                        <button onClick={modificaAlunno}>si</button>
                        <button onClick={annullaModifica}>no</button></span>
                        :
                        <button onClick={richiediConfermaModifica}>Modifica</button>
                    }
                </span>
            }
            <hr />
        </div>
    );
}