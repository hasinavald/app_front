import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";


function EditRegion(props) {

      const [toRedirect, setToRedirect] = useState('');
      
      const [nomRegion, setNomRegion] = useState('');
      const [longitude, setLongitude] = useState('');
      const [latitude, setLatitude] = useState('');
      let ids = (props.region) ? props.region :""
      let history = useHistory();
      const [idRegion, setIdRegion] = useState(0);
      const [username, setUsername] = useState("");
      const isLogged = props.isAuth;
      const token = props.isAuth;
      
      
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
  
            const user = await fetch(configData.SERVER_URL+'region/one?nomRegion='+ids, requestOptions);
            const dataUser = await user.json();
            // await setUrl_modif(dataUser._links.self.href);
            await setNomRegion(dataUser.nomRegion);
            await setLongitude(dataUser.longitude);
            await setLatitude(dataUser.latitude);
            await setIdRegion(dataUser.id);
            await setUsername(dataUser.username);
          }
          
          getDatas();
        }

      },[]);

      function Back(){
        history.push("gestion-region");
      }

      async function Valider(){

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
            body: JSON.stringify({  nomRegion: nomRegion,longitude : longitude,latitude : latitude,id : idRegion , username : username})
            };
        const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+"api/region/update?id="+idRegion, requestOptions);
            const data = await result.json();
            console.log(data);
        }
        await fetchData();
        history.push("/gestion-region");
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
      function changeUserName(e){
        setUsername(e.target.value)
      }

      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }

        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Edit Region</h3>
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
                <div className="form-group d-none">
                    <label>Username</label>
                    <input value={username} onChange={changeUserName.bind(this)} type="text" className="form-control" placeholder="username" />
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
    region : state.region
  }
}

export default connect(states)(EditRegion);
