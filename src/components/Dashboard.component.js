import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import configData from "./config.json";

import { VictoryPie, VictoryLabel } from 'victory';


function Dashboard(props) {

  const [toRedirect, setToRedirect] = useState('');
  const [reloadDatas, setReloadDatas] = useState();

  const [allSignals, setAllSignals] = useState([]);
  const [signalsEncours, setEncours] = useState([]);
  const [signalNouveau, setNouveau] = useState([]);
  const [signalTermine, setTermine] = useState([]);

  let history = useHistory();
  const token = props.isAuth;
  const [token_stored, setToken] = useState(token);

  const isLogged = props.isAuth;

  useEffect(() => {

    if (isLogged == false) {
      history.push('/login')
      sessionStorage.removeItem('jwtToken');
    } else {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
      };

      const fetchData = async () => {
        const result = await fetch(configData.SERVER_URL + 'signal/all', requestOptions);
        const data = await result.json();
        let all = data;
        if(all.length != 0){
          let enCours = all.filter(function (dataM) {
            return dataM.status == 'En cours de traitement';
          });
          let nouveau = all.filter(function (dataM) {
            return dataM.status == 'Nouveau';
          });
          let termine = all.filter(function (dataM) {
            return dataM.status == 'Terminé';
          });
          setEncours((enCours.length * all.length) / 100)
          setNouveau((nouveau.length * all.length) / 100)
          setTermine((termine.length * all.length) / 100)
          setAllSignals(all.length);
        }
        

        
        
      };
      setToken(token);
      fetchData();

    }

  }, [reloadDatas]);


  return (
    <div className="container container_page">
      <div>
        <Menus />
      </div>

      {/* <h3>Dashboard</h3> */}
      {/* <div className="row">
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Nombre par region</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Nombre par status</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Nombre total</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>

              </div> */}

      <div className="row">
        <div className="col-md-12">
        <div className="w-75 m-auto text-center">
          <svg viewBox="0 0 400 400" >
            <VictoryPie
              standalone={false}
              width={400} height={400}
              data={[
                { x: "Nouveau(" + (signalNouveau / allSignals) * 100 + ")", y: signalNouveau },
                { x: "En cours(" + (signalsEncours / allSignals) * 100 + ")", y: signalsEncours },
                { x: "Terminé(" + (signalTermine / allSignals) * 100 + ")", y: signalTermine }
              ]}
              innerRadius={70} labelRadius={100}
              style={{ labels: { fontSize: 10, fill: "white" } }}
              colorScale={["blue", "orange", "green"]}
            />
            <circle cx="200" cy="200" r="65" fill="none" stroke="black" strokeWidth={3} />
            <circle cx="200" cy="200" r="155" fill="none" stroke="black" strokeWidth={3} />
            <VictoryLabel
              textAnchor="middle" verticalAnchor="middle"
              x={200} y={200}
              style={{ fontSize: 15, fill: "white" }}
              text={allSignals + " signals"}
            />
          </svg>
        </div>
        </div>
        
        <div className="col-md-6">

         
        </div>

      </div>


    </div>
  );
}
const states = (state) => {
  return {
    isAuth: state.isAuth
  }
}
const setAuth = (dispatch) => {
  return {
    setAuth: (val) => { dispatch({ type: 'SET_SESSIONS', value: val }) }
  }
}
export default connect(states, setAuth)(Dashboard);
