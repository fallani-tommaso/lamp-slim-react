import {useState} from 'react';

export default function Bottone({testo, numero}){
    const[contatore, setContatore] = useState(numero);

    function incrementaNumero(){
        setContatore(contatore + 1)
    }

    return (
        <div>
            {testo} {contatore}
            <button onClick={incrementaNumero}>{contatore}</button>
        </div>
    );
}