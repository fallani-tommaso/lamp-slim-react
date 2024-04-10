import {useEffect, useState} from 'react';
import AlunnoRow from './AlunnoRow';
import InsertForm from './InsertForm';

export default function Alunni(){

  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInsertForm, setShowInsertForm] = useState(false);

  useEffect(() => {
    fetchAlunni();
  }, []);

  function refreshAlunni(alunno){
    setAlunni(alunni.map(a =>  a.id === alunno.id ? alunno : a));
  }

  function removeAlunno(id){
    setAlunni(alunni.filter(a => a.id !== id));
  }

  function reFetchAlunni(){
    setLoading(true);
    fetchAlunni();
    setShowInsertForm(false);
  }

  function fetchAlunni(){
    fetch("http://localhost:8080/alunni", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAlunni(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  function handleInsertClick(){
    setShowInsertForm(!showInsertForm);
  }

  return(
    <div id="alunni">
      <div>
        <h1>Alunni</h1>
        <table border={1}>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th></th>
          </tr>
          { loading ? (
            <div>Loading...</div>
          )
          :
          (
            alunni && alunni.map(alunno => (
              <AlunnoRow removeAlunno={removeAlunno} refreshAlunni={refreshAlunni} alunno={alunno} key={alunno.id} />
            ))
          )}
        </table>

        <button onClick={handleInsertClick}>Inserisci nuovo alunno</button> 
        { showInsertForm &&
          <InsertForm reFetchAlunni={reFetchAlunni}/> 
        }
      </div>
    </div> 
  )
}
