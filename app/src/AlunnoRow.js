import {useState} from 'react';

export default function AlunnoRow({alunno, refreshAlunni, removeAlunno}){

  const [edit, setEdit] = useState(false);
  const [nome, setNome] = useState(alunno.nome);
  const [cognome, setCognome] = useState(alunno.cognome);
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);



  function handleEdit(){
    setEdit(true);
  }

  function handleDelete(){
    setShowConfirmDelete(true);
  }

  function handleSi(){
    deleteAlunno();
  }

  function handleNo(){
    setShowConfirmDelete(false);
  }

  function handleCancel(){
    setEdit(false);
  }

  function handleNomeChange(e){
    setNome(e.target.value);
  }

  function handleCognomeChange(e){
    setCognome(e.target.value);
  }

  function handleSave(){
    setLoading(true);
    fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nome: nome , cognome: cognome})
    })
      .then((response) => response.json())
      .then((data) => {
        refreshAlunni({id: alunno.id, nome: nome, cognome: cognome});
        setLoading(false);
        setEdit(false);
      })
      .catch((error) => console.log(error));
  }

  function deleteAlunno(){
    fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        removeAlunno(alunno.id);
        setEdit(false);
      })
      .catch((error) => console.log(error));
  }
  return(
    <tr> 
      <td>{alunno.id}</td>
      <td>
        { edit ?
            (
              <input type="text" value={nome} onChange={handleNomeChange}  disabled={loading}/>
            ):(
              <div>{alunno.nome}</div>
            )
        }
      </td>
      <td>
        { edit ?
            (
              <input type="text" value={cognome} onChange={handleCognomeChange} disabled={loading}/>
            ):(
              <div>{alunno.cognome}</div>
            )
        }
      </td>
      <td>{ edit ?
          (
            <div>
              <button onClick={handleSave} disabled={loading}>Save</button>
              <button onClick={handleCancel} disabled={loading}>Cancel</button>
            </div>
          ):(
              showConfirmDelete ?
                (
                  <div>
                    Sei sicuro?
                      <button onClick={handleSi}>Si</button>
                      <button onClick={handleNo}>No</button>
                  </div>
                ):(
                  <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                  </div>
                )
          )
        }</td>
    </tr>
  );
}
