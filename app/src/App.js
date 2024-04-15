import './App.css';
import Bottone from './Bottone.js';

const alunni = [
  {id: 1, nome: "Tommaso", cognome: "Fallani"},
  {id: 2, nome: "Isacco", cognome: "Pieri"},
  {id: 3, nome: "Davide", cognome: "Aiazzi"},
]

function App() {
  return (
    <div className="App">
      {
        alunni.map(((alunni) => 
        <Bottone testo={`${alunni.nome} ${alunni.cognome}`} numero={alunni.id} />
        ))
      }      
    </div>
  );
}

export default App;
