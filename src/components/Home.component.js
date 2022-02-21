import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";


function Home(props) {

      const [toRedirect, setToRedirect] = useState('');

      const [titre, setTitre] = useState('');
      const [description, setDescription] = useState('');
      const [region, setRegion] = useState('');
      const [typeSignalement, setTypeSignalement] = useState('');
      const [status, setStatus] = useState('');

      
      const isLogged = props.isAuth;
      let history = useHistory();

      
      useEffect(() => {
        console.log(isLogged);
        if(isLogged == false){
          setToRedirect('login');
          sessionStorage.removeItem('jwtToken');
        }
        
      });

      function Back(){
        history.push("gerer-signalement");
      }

      function Valider(){
        history.push("gerer-signalement");
      }

      function setTitre_val(e){
        setTitre(e.target.value)
      }
      function setDescription_val(e){
        setDescription(e.target.value)
      }

    //   if(isLogged == false){
    //     return <Redirect to={toRedirect} />;
    //   }

        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Home</h3>
              <button onClick={Back.bind(this)} className="btn btn-info">Retour</button>
              <div className="col-12">
                <div className="form-group">
                    <label value={titre} className="label_form" for="examleInputEmail1">Titre</label>
                    <input onChange={setTitre_val.bind(this)} type="email" className="form-control" placeholder="Nom du type de signalement" />
                </div>

                <div className="form-group">
                <label className="label_form" for="examleInputEmail1">Region</label>
                    <select className="form-control">
                        <option>Vakinakaratra</option>
                        <option>Analamanga</option>
                    </select>
                </div>

                <div className="form-group">
                <label className="label_form" for="examleInputEmail1">Type de signalement</label>
                    <select className="form-control">
                        <option>Route</option>
                        <option>Infrastructure</option>
                    </select>
                </div>

                <div className="form-group">
                <label className="label_form" for="examleInputEmail1">Description</label>
                    <textarea onChange={setDescription_val.bind(this)} className="form-control">{description}</textarea>
                </div>

                <div className="form-group">
                <label className="label_form" for="examleInputEmail1">Status</label>
                    <select className="form-control">
                        <option>Nouveau</option>
                        <option>En cours</option>
                        <option>Fait</option>
                    </select>
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

export default connect(states,setAuth)(Home);
