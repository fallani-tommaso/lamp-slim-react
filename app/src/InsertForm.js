import {useState} from 'react';

export default function InsertForm({reFetchAlunni}){

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [loading, setLoading] = useState(false);

  function handleNomeChange(e){
    setNome(e.target.value);
  }

  function handleCognomeChange(e){
    setCognome(e.target.value);
  }

  function handleSave(){
    setLoading(true);
    fetch(`http://localhost:8080/alunni`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nome: nome , cognome: cognome})
    })
      .then((response) => response.json())
      .then((data) => {
        reFetchAlunni();
        resetForm();
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  function resetForm(){
    setNome("");
    setCognome("");
  }
  
  return(
    <div>
      <div>Nome: 
        <input type="text" value={nome} onChange={handleNomeChange}  disabled={loading}/>
      </div>
      <div>Cognome:
        <input type="text" value={cognome} onChange={handleCognomeChange}  disabled={loading}/>
      </div>
      <button onClick={handleSave} disabled={loading}>Save</button>
    </div>
  );
}
