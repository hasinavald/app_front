import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";

function Region(props) {

      const [toRedirect, setToRedirect] = useState('');
      const [listRegion, setListRegion] = useState([]);
      const [reloadDatas, setReloadDatas] = useState();
      
      const isLogged = props.isAuth;
      let history = useHistory();
      const token = props.isAuth;
      const [token_stored, setToken] = useState(token);

      
      useEffect(() => {

        console.log(isLogged);
        if(isLogged == false){
          history.push('/login')
          sessionStorage.removeItem('jwtToken');
        }else{
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
        };

          const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+'region/all', requestOptions);
            const data = await result.json();
            setListRegion(data);
          };
          setToken(token);
          fetchData();
        }
      },[reloadDatas]);

      function Edit(data){
        props.setRegions(data)
        history.push("/edit-region");
      }

      async function Supprimer(val){
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
        };
        const region = await fetch(configData.SERVER_URL+'region/delete?id='+val.id, requestOptions);
        // const dataRegion = await region.json();
        // console.log(dataRegion,"dataRegion");
        // let linkDelete = dataRegion._links.self.href;

        // const requestOptions2 = {
        //   method: 'DELETE',
        //   headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
        //   };
        // const userDeleted = await fetch(linkDelete, requestOptions2);
        setReloadDatas(region)

      }

      function goAdd(e){
        history.push("/add-region");
      }

      if(listRegion != ""){
        console.log(listRegion);
      }

     
        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Regions</h3>
              <button className="btn btn-info" onClick={goAdd.bind(this)}>Ajouter</button>
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
                {listRegion.map((value,index) =>{
                      return(
                    <tr key={index}>
                    <th scope="row">{value.id}</th>
                    <td>{value.nomRegion}</td>
                    <td>
                      <button onClick={() => Edit(value.nomRegion)} className="btn btn-info mr-2">Modifier</button>
                      <button onClick={() => Supprimer(value)} className="btn btn-danger">Supprimer</button>
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
    isAuth : state.isAuth
  }
}

const setRegions = (dispatch) => {
  return {
    setRegions : (val) => {dispatch({type : 'SET_REGION',value : val})}
  } 
}

export default connect(states,setRegions)(Region);
