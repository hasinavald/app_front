import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";

function TypeSignalement(props) {

  const [listTypeSignal, setListTypeSignal] = useState([]);
  const [reloadDatas, setReloadDatas] = useState();

  const token = props.isAuth;
  const [token_stored, setToken] = useState(token);

  const isLogged = props.isAuth;
  let history = useHistory();


  useEffect(() => {

    if (isLogged == false) {
      history.push('/login')
      sessionStorage.removeItem('jwtToken');
    } else {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
      };

      const fetchData = async () => {
        const result = await fetch(configData.SERVER_URL+'typesignal/all', requestOptions);
        const data = await result.json();
        setListTypeSignal(data);
      };
      setToken(token);
      fetchData();
    }
  }, [reloadDatas]);

  function Edits(data) {
    props.setType(data)
    history.push("/edit-type-signalement");
  }

  async function deleteType(data){
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
      };
    const typeSigna = await fetch(configData.SERVER_URL+'typesignal/delete?id='+data.id, requestOptions);
    const dataType = await typeSigna.json();
    setReloadDatas(typeSigna)

  }

  function goAdd(e) {
    history.push("/add-type-signalement");
  }

  return (
    <div className="container container_page">
      <div>
        <Menus />
      </div>

      <h3>Type de signalement</h3>
      <button onClick={goAdd.bind(this)} className="btn btn-info mb-3">Ajouter</button>
      <div className="col-12">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {listTypeSignal.map((valueE,index) =>{
            return(
            <tr key={index}>
              <th scope="row">{valueE.id}</th>
              <td>{valueE.type}</td>
              <td>
                <button onClick={Edits.bind(this,valueE.type)} className="btn btn-info mr-2">Modifier</button>
                <button onClick={deleteType.bind(this,valueE)} className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
            )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const states = (state) => {
  return {
    isAuth: state.isAuth
  }
}

const setTypeSignal = (dispatch) => {
  return {
    setType: (val) => { dispatch({ type: 'SET_Type', value: val }) }
  }
}

export default connect(states,setTypeSignal)(TypeSignalement);
