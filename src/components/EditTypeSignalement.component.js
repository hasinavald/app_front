import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";


function EditTypeSignalement(props) {

      const [nomType, setNomType] = useState('');
      const [couleur, setCouleur] = useState('');
      const [idType, setIdType] = useState(0);
      const isLogged = props.isAuth;
      let history = useHistory();
      const token = props.isAuth;
      let ids = (props.type) ? props.type :""
      useEffect( () => {

        if(isLogged == false){
          history.push("/login");
          sessionStorage.removeItem('jwtToken');
        }else{

          async function getDatas(){

            const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
              };
  
            const user = await fetch(configData.SERVER_URL+'typesignal/one?type='+ids, requestOptions);
            const dataUser = await user.json();
             setIdType(dataUser.id);
             setNomType(dataUser.type);
             setCouleur(dataUser.couleur);

          }
          
          getDatas();
        }

      },[]);

      function Back(){
        history.push("gerer-type-signalement");
      }

      function setNomTypeFunc(e){
        setNomType(e.target.value)
      }

      function setCouleurTypeFunc(e){
        setCouleur(e.target.value)
      }

      async function Valider(){
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
          body: JSON.stringify({ type: nomType,couleur : couleur,id:idType })
        };

        const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+"typesignal/update/"+idType, requestOptions);
            const data = await result.json();
        }
      
      await fetchData();
      history.push("/gerer-type-signalement");

      }

        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Edit type Signalement</h3>
              <button onClick={Back.bind(this)} className="btn btn-info">Retour</button>
              <div className="col-12">
                <div className="form-group">
                    <label>Nom du type de signalement</label>
                    <input onChange={setNomTypeFunc.bind(this)} value={nomType}  type="email" className="form-control" placeholder="Nom du type de signalement" />
                </div>
                <div className="form-group text-left">
                    <label className="label_color">Couleur du type de signalement</label>
                    <input onChange={setCouleurTypeFunc.bind(this)} value={couleur} type="color" className="color_input" />
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
    isAuth : state.isAuth,
    type : state.type
  }
}

const setAuth = (dispatch) => {
  return {
    setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
  } 
}

export default connect(states,setAuth)(EditTypeSignalement);
