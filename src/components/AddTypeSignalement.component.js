import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";


function AddTypeSignalement(props) {

      const [toRedirect, setToRedirect] = useState('');
      const [nomType, setNomType] = useState('');
      const [couleur, setColor] = useState('');
      const token = props.isAuth;
      const isLogged = props.isAuth;
      let history = useHistory();

      
      useEffect(() => {
        console.log(isLogged);
        if(isLogged == false){
          setToRedirect('login');
          sessionStorage.removeItem('jwtToken');
        }
        
      });

      function changeNomRegion(e){
        setNomType(e.target.value)
      }

      function changeCouleur(e){
        setColor(e.target.value)
      }

      function Back(){
        history.push("gerer-type-signalement");
      }

      async function Valider(){

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
          body: JSON.stringify({ type: nomType,couleur : couleur})
        };

        const response = await fetch(configData.SERVER_URL+'typesignal/save', requestOptions);
        const data = await response.json();
        
        if(data){
            history.push("/gerer-type-signalement");
        }else{
            alert('Login error');
        }

        history.push("gerer-type-signalement");

      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }

        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Ajouter type Signalement</h3>
              <button onClick={Back.bind(this)} className="btn btn-info">Retour</button>
              <div className="col-12">
                <div className="form-group">
                    <label>Nom du type de signalement</label>
                    <input className="form-control" value={nomType} onChange={changeNomRegion.bind(this)} type="text" placeholder="Nom du type de signalement" />
                </div>
                <div className="form-group text-left">
                    <label className="label_color">Couleur du type de signalement</label>
                    <input value={couleur} type="color" onChange={changeCouleur.bind(this)} className="color_input" />
                </div>
                <div className="form-group">
                    <button onClick={Valider.bind(this)} className="btn btn-success">Valider</button>
                </div>
              </div>
            </div>
            );
        }

const states = (state) => {
  return {
    isAuth : state.isAuth
  }
}

const setAuth = (dispatch) => {
  return {
    setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
  } 
}

export default connect(states,setAuth)(AddTypeSignalement);
