import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import MenusFront from './menusFront.component';
import { useHistory } from "react-router-dom";
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
import configData from "../config.json";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay } from 'react-leaflet'


const containerStyle = {
    width: '1110px',
    height: '400px'
};


function EditSignalementFront(props) {

    const [id, setId] = useState(0);

    const [typeSignal, setTypeSignal] = useState('');
    const [descriptionSignal, setDescriptionSignal] = useState('');
    const [dateSignal, setDateSignal] = useState('');
    const [status, setStatusSignal] = useState('');
    const [image, setImage] = useState('');
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [img, setImg] = useState(0);


    const [sen, setSen] = useState(2);

    let history = useHistory();
    const token = props.isAuth;
    const isLogged = props.isAuth;

    useEffect(() => {
        if(isLogged == false){
            history.push('login')
            sessionStorage.removeItem('jwtToken');
        }

        async function getDatas(){

            const dataUser = props.signal;
            if(dataUser){
                setDescriptionSignal(dataUser.description);
                setDateSignal(dataUser.date);
                setStatusSignal(dataUser.status);
                setImage(dataUser.image);

                setLong(parseFloat(dataUser.longitude));
                setLat(parseFloat(dataUser.latitude));
                setId(parseInt(dataUser.id));
                setTypeSignal(dataUser.typeSignal[0].type)
                getImage(dataUser.typeSignal[0].type)
            }

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
        history.push("dashboard-front");
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

        if(status == "Terminé"){
            const requestOptions2 = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
            };

            const fetchData2= async () => {
                const result = await fetch(configData.SERVER_URL+"signal/clen/seenno?id="+id, requestOptions2);
                const data = await result.json();
            }
        }


        await fetchData();
        history.push("dashboard-front");

    }

    function changeStatusSignals(e){
        setStatusSignal(e.target.value);
    }

    function getImage(fileName){
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
        };
          fetch(configData.SERVER_URL+'signal/'+fileName, requestOptions)
          .then(response => response.blob())
          .then(blob =>{
            setImg(URL.createObjectURL(blob))
          })

      }


    return (
        <div className="container container_page">
            <div>
                <MenusFront />
            </div>

            <h3 className="title_signal">Modifier le Signalement</h3>
            <button onClick={Back.bind(this)} className="btn btn-info mb-4">Retour</button>
            <div className="">
                <div className="">
                    {mape}
                </div>
            </div>

            <div className="gridRow">
                <div className="img_container_signal">
                    <img width="100%" src={img} />
                </div>
                <div className="blackBoardCOntainer">

                    <div className="blackboard">
                        <div className="form">
                            <div className="formGrp">
                                <label className="label_form" >Description</label>
                                <input disabled="disabled" className="formInptextarea" value={descriptionSignal} />
                            </div>

                            <div className="formGrp">
                                <label  className="label_form" >Type</label>
                                <input disabled="disabled" value={typeSignal} type="text" className="formInpt" />
                            </div>

                            <div className="formGrp">
                                <label className="label_form" >Status</label>
                                <select onChange={changeStatusSignals.bind(this)} className="formInpt">
                                    <option selected={(status == 'Nouveau') ? "selected" : "" } >Nouveau</option>
                                    <option selected={(status == 'En cours de traitement') ? "selected" : "" }>En cours de traitement</option>
                                    <option selected={(status == 'Terminé') ? "selected" : "" }>Terminé</option>
                                </select>
                            </div>

                            <div className="formGrp">
                                <button onClick={Valider.bind(this)} className="bouton_update"><span className="text">Valider</span></button>
                            </div>

                        </div>
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

export default connect(states,setAuth)(EditSignalementFront);
