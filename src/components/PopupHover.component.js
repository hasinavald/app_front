import React, {useState} from "react";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


 function PopupHover(props) {
        return (
            <div className="popup_container">
                <div className="row">
                  <div className="col-md-4"><span className="labelPopup">Titre : </span></div>
                  <div className="col-md-8">Route abimé</div>
                </div>
                <div className="row">
                  <div className="col-md-4"><span className="labelPopup">Region : </span></div>
                  <div className="col-md-8">Analamanga</div>
                </div>
                <div className="row">
                  <div className="col-md-4"><span className="labelPopup">Date : </span></div>
                  <div className="col-md-8">12 novembre 2021</div>
                </div>
                <div className="row">
                  <div className="col-md-4"><span className="labelPopup">Status :</span> </div>
                  <div className="col-md-8">En cours</div>
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
export default connect(states,setAuth)(PopupHover);
