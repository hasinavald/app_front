import React, { useState , useEffect } from "react";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";


function AddRegion(props) {

      const [toRedirect, setToRedirect] = useState('');
      const [nomRegion, setNomRegion] = useState('');
      const [longitude, setLongitude] = useState('');
      const [latitude, setLatitude] = useState('');
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

      function Back(){
        history.push("gestion-region");
      }

      async function Valider(){

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
          body: JSON.stringify({ nomRegion: nomRegion,longitude : longitude,latitude : latitude,username : "admin"})
        };

        const response = await fetch(configData.SERVER_URL+'region/save', requestOptions);
        const data = await response.json();
        
        if(data){
            history.push("/gestion-region");
        }else{
            alert('Login error');
        }

      }

      function changeNomRegion(e){
        setNomRegion(e.target.value)
      }
      function changeLatitudeRegion(e){
        setLatitude(e.target.value)
      }
      function changeLongitudeRegion(e){
        setLongitude(e.target.value)
      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }
        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Add Region</h3>
              <button onClick={Back.bind(this)} className="btn btn-info">Retour</button>
              <div className="col-12">
                <div className="form-group">
                    <label>Nom du region</label>
                    <input value={nomRegion} onChange={changeNomRegion.bind(this)} type="text" className="form-control" placeholder="Nom du region" />
                </div>
                <div className="form-group">
                    <label>Longiture</label>
                    <input value={longitude} onChange={changeLongitudeRegion.bind(this)} type="text" className="form-control" placeholder="Longitude" />
                </div>
                <div className="form-group">
                    <label>Latitude</label>
                    <input value={latitude} onChange={changeLatitudeRegion.bind(this)} type="text" className="form-control" placeholder="Latitude" />
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

export default connect(states,setAuth)(AddRegion);
