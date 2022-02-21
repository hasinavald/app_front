import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
import configData from "./config.json";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay } from 'react-leaflet'


const containerStyle = {
  width: '1110px',
  height: '400px'
};


function EditSignalement(props) {

      const [id, setId] = useState(0);

      const [typeSignal, setTypeSignal] = useState('');
      const [region, setRegionSignal] = useState('');
      const [descriptionSignal, setDescriptionSignal] = useState('');
      const [dateSignal, setDateSignal] = useState('');
      const [status, setStatusSignal] = useState('');
      const [image, setImage] = useState('');
      const [long, setLong] = useState(0);
      const [lat, setLat] = useState(0);
      const [listRegion, setListRegion] = useState([]);
      
      let history = useHistory();
      const token = props.isAuth;      
      const isLogged = props.isAuth;
      
      useEffect(() => {
        if(isLogged == false){
          history.push('login')
          sessionStorage.removeItem('jwtToken');
        }

        async function getDatas(){

          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
          };

          const result = await fetch(configData.SERVER_URL+'region/all/', requestOptions);
          const data = await result.json();
          setListRegion(data);
          
          const dataUser = props.signal;

          setRegionSignal(dataUser.nom_Region);
          setDescriptionSignal(dataUser.description);
          setDateSignal(dataUser.date);
          setStatusSignal(dataUser.status);
          setImage(dataUser.image);

          setLong(parseFloat(dataUser.longitude));
          setLat(parseFloat(dataUser.latitude));
          setId(parseInt(dataUser.id));
          setTypeSignal(dataUser.typeSignal[0].type)

        }
        
        getDatas();
        
      },[]);
      if(lat !=0){
        var mape = (
                  <MapContainer center={[lat,long]} style={{width:"100%",height:"300px"}} zoom={5} scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[lat,long]}>
                  </Marker>
                </MapContainer>
        );
        
      }else{
        var mape = "";
      }
      function Back(){
        history.push("gerer-signalement");
      }
      
      async function Valider(){
       
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
          body: status
        };

        const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+"signal/update/"+id, requestOptions);
            const data = await result.json();
        }

        const requestOptions2 = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
          body: region
        };

        const fetchData2 = async () => {
            const result = await fetch(configData.SERVER_URL+"signal/updateRegion/"+id, requestOptions2);
        }
      
        await fetchData();
        await fetchData2();
        history.push("gerer-signalement");

      }

      function changeStatusSignals(e){
        setStatusSignal(e.target.value);
      }

      function changeRegion(e){
        setRegionSignal(e.target.value);
      }

        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>

              <h3>Edit Signalement</h3>
              <button onClick={Back.bind(this)} className="btn btn-info mb-4">Retour</button>
              <div className="row">
                <div className="col-md-12">
                {mape}
                {/* <LoadScript
                    googleMapsApiKey="AIzaSyCgl_vNtqaSla_nvtroCW47gyc_OXrYnfE"
                  >
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={10}
                    >
                      <></>
                    </GoogleMap>
                  </LoadScript> */}
                </div>
              </div>
              <div className="row mt-4 mb-4">
                <div className="col-6">
                  <img width="100%" src={"data:image/jpeg;base64,"+image} />
                </div>
              <div className="col-6">

              <div className="form-group">
                <label className="label_form" >Description</label>
                    <textarea disabled="disabled" className="form-control" value={descriptionSignal} />
              </div>

              <div className="form-group">
                  <label  className="label_form" >Type</label>
                  <input disabled="disabled" value={typeSignal} type="text" className="form-control" />
              </div>

                <div className="form-group">
                <label className="label_form" >Region</label>
                    <select defaultValue={region} onChange={changeRegion.bind(this)} className="form-control">
                    <option value="">-- Choisir --</option>

                      {listRegion.map((value,index) =>{
                        return(
                        <option key={index} selected={(value.nomRegion == region) ? "selected" : "" } value={value.nomRegion}>{value.nomRegion}</option>
                        )
                      })}
                    </select>
                </div>

                <div className="form-group">
                <label className="label_form" >Status</label>
                <select onChange={changeStatusSignals.bind(this)} className="form-control">
                        <option selected={(status == 'Nouveau') ? "selected" : "" } >Nouveau</option>
                        <option selected={(status == 'En cours de traitement') ? "selected" : "" }>En cours de traitement</option>
                        <option selected={(status == 'Terminé') ? "selected" : "" }>Terminé</option>
                    </select>
                </div>
                <div>
              
                </div>

                <div className="form-group">
                    <button onClick={Valider.bind(this)} className="btn btn-success">Valider</button>
                </div>
              </div>
              </div>
              
            </div>
            );
        }

const states = (state) => {
  return {
    isAuth : state.isAuth,
    signal : state.signal
  }
}

const setAuth = (dispatch) => {
  return {
    setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
  } 
}

export default connect(states,setAuth)(EditSignalement);
