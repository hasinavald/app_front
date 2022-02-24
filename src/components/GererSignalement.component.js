import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import Pagination from './partials/Pagination';
import configData from "./config.json";

function GererSignalement(props) {

  const [toRedirect, setToRedirect] = useState('');
  const [reloadDatas, setReloadDatas] = useState();

  const [signals, setListSignals] = useState([]);

  const isLogged = props.isAuth;
  let history = useHistory();
  const token = props.isAuth;
  const [token_stored, setToken] = useState(token);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [signalsO, setListSignalsO] = useState([]);

  useEffect(() => {

    console.log(isLogged);
    if (isLogged == false) {
      history.push('/login')
      sessionStorage.removeItem('jwtToken');
    } else {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
      };

      const fetchData = async () => {
        const result = await fetch(configData.SERVER_URL+'signal/all', requestOptions);
        console.log(result,"Ettt");
        const data = await result.json();
        setListSignals(data);
        setListSignalsO(data)
      };

      setToken(token);
      fetchData();

    }

  }, [reloadDatas]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = signals.slice(indexOfFirstPost, indexOfLastPost);

  function Edit(data) {
    props.setSignal(data)
    history.push("/edit-signalement");
  }

  async function supprimer(data){
    const requestOptions2 = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
      };
    const userDeleted = await fetch(configData.SERVER_URL+"signal/delete/"+data.id, requestOptions2);
    setReloadDatas(userDeleted)
  }

  function changeSearch(e){
    let val = e.target.value;
    let copyList = [...signalsO];
    let filtered = copyList.filter(function(dataM) {
      const reg = new RegExp(val, 'i');
      if(!dataM.description){
        dataM.description = "";
      }
      if(!dataM.status){
        dataM.status = "";
      }
      if(!dataM.date){
        dataM.date = "";
      }
        return  dataM.description.match(reg) || dataM.status.match(reg) || dataM.date.match(reg);
    });
    setListSignals(filtered);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (isLogged == false) {
    return <Redirect to={toRedirect} />;
  }
  
  return (
    <div className="container container_page">
      <div>
        <Menus />
      </div>

      <h3>Gerer les signalements</h3>
      <div className="col-md-12 text-right mb-3">
          <input placeholder="Recherche" type="text" onChange={changeSearch.bind(this)}></input>
      </div>
      <div className="col-12">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              {/* <th scope="col">Region</th> */}
              <th scope="col">Date</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((value, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{value.id}</th>
                  <td>{value.description}</td>
                  {/* <td>{value.idRegion}</td> */}
                  <td>{value.date.split('T')[0]}</td>
                  {/* <td>{value.dateSignal.split(' ')[0]}</td> */}
                  <td className={value.status.split(' ')[0]}>{value.status}</td>
                  <td>
                    <button onClick={() => Edit(value)} className="btn btn-info mr-2">Modifier</button>
                    <button onClick={() => supprimer(value)} className="btn btn-danger">Supprimer</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={signals.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
const states = (state) => {
  return {
    isAuth: state.isAuth
  }
}

const setSignal = (dispatch) => {
  return {
    setSignal: (val) => { dispatch({ type: 'SET_SIGNAL', value: val }) }
  }
}

export default connect(states, setSignal)(GererSignalement);
