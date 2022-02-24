import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import MenusFront from './menusFront.component';
import configData from "../config.json";
import * as L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay,Tooltip } from 'react-leaflet'
import { useHistory } from "react-router-dom";
import Pagination from '../partials/Pagination';

function Dashboard(props) {

      const [toRedirect, setToRedirect] = useState('');
      const [reloadDatas, setReloadDatas] = useState();
      const [signals, setListSignals] = useState([]);
      const token = props.isAuth;
      const [token_stored, setToken] = useState(token);
      const [signalsO, setListSignalsO] = useState([]);

      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(5);

      const [listTypeSignal, setListTypeSignal] = useState([]);

      const [typeFIlter, setTypeFilter] = useState('');
      const [statusFIlter, setStatusFilter] = useState('');
      const [dateFIlter, setDateFilter] = useState('');

      let history = useHistory();
      const LeafIcon = L.Icon.extend({
        options: {}
      });
         
      const isLogged = props.isAuth;
      const user_region = props.user_region;
      
      useEffect(() => {

        if (isLogged == false) {
          history.push('/front/login')
          sessionStorage.removeItem('jwtToken');
        } else {


          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
          };
    
          const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+'signal/findbyregion?nomRegion='+user_region, requestOptions);
            const data = await result.json();
            setListSignals(data);
            setListSignalsO(data)
            const resultTypeSignals = await fetch(configData.SERVER_URL+'typesignal/all', requestOptions);
            const dataTypeSignals = await resultTypeSignals.json();
            setListTypeSignal(dataTypeSignals);
          };
    
          setToken(token);
          fetchData();
    
        }
    
      }, [reloadDatas]);
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      if(!signals.message && signals.length != 0){
        console.log(signals,'tetssssss');
        var currentPosts = signals.slice(indexOfFirstPost, indexOfLastPost);
      }else{
        var currentPosts = [];
      }
        const paginate = pageNumber => setCurrentPage(pageNumber);

      function getIcons(color){
        var TrueColor = color.replace("#","");
        return new LeafIcon({
          iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"+TrueColor+"&chf=a,s,ee00FFFF"
        })
      }
     
      if(currentPosts != [] && currentPosts && !currentPosts.message){
        var markers = currentPosts.map((signal) =>
        <Marker eventHandlers={{
          click: (e) => {
            goDetails(signal)
          },
        }} key={signal.id} icon={getIcons(signal.typeSignal[0].couleur)}  position={[signal.latitude,signal.longitude]}>
          <Tooltip>
            <div>
              <img width="100%" src={getImage.bind(this,signal.image)} />
            </div>
            <div className="description">
              {signal.description}
            </div>
            <div className="date">
              {signal.date.split('T')[0]}
            </div>
            <div className="status">
              {signal.status}
            </div>
          </Tooltip>
        </Marker>
      );
      }else{
        var markers = "";
      }
     
      if(isLogged == false){
        return <Redirect to={toRedirect} />;
      }
        return (
            <div className="container container_page">
              <div>
                <MenusFront />
              </div>
                <h3 className="title_signal">Dashboard</h3>
                <div className="e">
                  <div className="e">
                  <MapContainer center={[-18.887626,47.3724275]} style={{width:"100%",height:"300px"}} zoom={5} scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {markers}
                </MapContainer>
                  </div>
                </div>
                <h1 className="title_signal">Gerer les signalements</h1>
                <div className="girdRow">
                  <select value={typeFIlter} onChange={changeFilter.bind(this,'type')} className="selectFilter classic">
                    <option>Type:</option>
                    {listTypeSignal.map((value, index) => {
                        return (
                          <option selected={(typeFIlter == value.type) ? "selected" : "" } value={value.type} key={index}>{value.type}</option>
                        )
                      })}
                  </select>

                  <input value={dateFIlter} className="selectFilter" placeholder="Date" type="date" onChange={changeFilter.bind(this,'date')}></input>
                  
                  {/* <select className="selectFilter classic">
                    <option>Date:</option>
                    <option>No external background image</option>
                    <option>No wrapper</option>
                  </select> */}

                  <select value={statusFIlter} onChange={changeFilter.bind(this,'status')}  className="selectFilter classic">
                      <option selected={(statusFIlter == 'Nouveau') ? "selected" : "" } >Nouveau</option>
                      <option selected={(statusFIlter == 'En cours de traitement') ? "selected" : "" }>En cours de traitement</option>
                      <option selected={(statusFIlter == 'Terminé') ? "selected" : "" }>Terminé</option>
                  </select>
                  <div className="buttonss">
                  <button onClick={resetFilter.bind(this)}>Reinitialiser</button>
                  </div>
                </div>
                <div className="">
                {/* <div className="text-right mb-3">
                  <div className="text-left">Type:</div>
                    <select className="form-control" value={typeFIlter} onChange={changeFilter.bind(this,'type')}>
                      <option value="">Tout</option>
                    {listTypeSignal.map((value, index) => {
                        return (
                          <option selected={(typeFIlter == value.type) ? "selected" : "" } value={value.type} key={index}>{value.type}</option>
                        )
                      })}
                    </select>
                </div> */}

                {/* <div className="text-right mb-3">
                    <div className="text-left" >Date:</div>
                    <input value={dateFIlter} className="form-control" placeholder="Date" type="date" onChange={changeFilter.bind(this,'date')}></input>
                </div>
                <div className="text-right mb-3">
                    <select value={statusFIlter} onChange={changeFilter.bind(this,'status')} className="form-control">
                      <option value="">Tous</option>
                      <option selected={(statusFIlter == 'Nouveau') ? "selected" : "" } >Nouveau</option>
                      <option selected={(statusFIlter == 'En cours de traitement') ? "selected" : "" }>En cours de traitement</option>
                      <option selected={(statusFIlter == 'Terminé') ? "selected" : "" }>Terminé</option>
                    </select>
                </div> */}
                  <div className="">
                  <table className="responstable">
                    <thead>
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
                              <button onClick={goDetails.bind(this,value)} className="bouton_update"><span className="text"> Modifier</span></button>
                              <button onClick={supprimer.bind(this,value)} className="bouton_update"><span className="text">Supprimer</span></button>
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
            </div>
        );

  
        async function supprimer(data){
          const requestOptions2 = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
            };
          const userDeleted = await fetch(configData.SERVER_URL+"signal/delete/"+data.id, requestOptions2);
          setReloadDatas(userDeleted)
        }
      
        function resetFilter(e){
          setTypeFilter('');
          setStatusFilter('');
          setDateFilter('');
          setListSignals(signalsO)
        }

        function changeFilter(type,val){
          var valuesFilters = val.target.value;
    
          if(type == 'type'){
            setTypeFilter(valuesFilters);
            var typeF = valuesFilters;
          }else{
            if(typeFIlter){
              var typeF = typeFIlter;
            }else{
              var typeF = "";
            }
          }

        

          if(type == 'date'){
            setDateFilter(valuesFilters);
            var dateF = valuesFilters;
          }else{
            if(dateFIlter){
              var dateF = dateFIlter;
            }else{
              var dateF =  "";
            }
          }

          if(type == 'status'){
            setStatusFilter(valuesFilters);
            var statuse = valuesFilters;
          }else{
            if(statusFIlter){
              var statuse = statusFIlter;
            }else{
              var statuse = "";
            }
          }

          var resultatFiltre = executeFilter(typeF,dateF,statuse);
          setListSignals(resultatFiltre);
        }
        function getImage(e,fileName){
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
        function executeFilter(type,dateF,statuse){
          if(signalsO.length !=0 && signalsO && !signalsO.message){
            var copyList = [...signalsO];
            var filtered = copyList.filter((dataM)=> {
                const regType = new RegExp(type, 'i');
                const regDate = new RegExp(dateF, 'i');
                const regStatus = new RegExp(statuse, 'i');
                return dataM.status.match(regStatus) && dataM.date.split("T")[0].match(regDate) && dataM.typeSignal[0].type.match(regType);
            });
          }else{
            var filtered = [];
          }
         

          return filtered;
        }

        function goDetails(data) {
          console.log(data,'cliiiiiiiiiiiiik');
          props.setSignal(data)
          history.push("/edit-signalement-front");
        }
}
const states = (state) => {
  return {
    isAuth : state.isAuth,
    user_region : state.user_region
  }
}
const mapDispatchToProps = dispatch => ({
  setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})},
  setSignal : (val) => {dispatch({type : 'SET_SIGNAL',value : val})},
 });
export default connect(states,mapDispatchToProps)(Dashboard);
