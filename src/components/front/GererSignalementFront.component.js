import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import MenusFront from './menusFront.component';
import { useHistory } from "react-router-dom";
import ToggleSwitch from "../../components/partials/ToggleSwitch";
import PopupHover from "../PopupHover.component.js";
import { FaRegEye, FaEdit } from 'react-icons/fa';
import configData from "../config.json";

function GererSignalementFront(props) {

    const [toRedirect, setToRedirect] = useState('');
    const [affichage, setAffichage] = useState('liste');
    const [popupState, setPopupState] = useState();
    let affichage_to_render = "";
    const isLogged = props.isAuth;
    let history = useHistory();


    useEffect(() => {
        console.log(isLogged);
        if (isLogged == false) {
            setToRedirect('login')
            sessionStorage.removeItem('jwtToken');
        }
    });

    function Edit() {
        history.push("/edit-signalement");
    }
    function showModal(e) {
        let PopupHoverVar = (
            <span onMouseLeave={hideModal.bind(this)}>
                <PopupHover />

            </span>
        )
        setPopupState(PopupHoverVar)
    }
    function hideModal() {
        let PopupHoverVar = "";
        setPopupState(PopupHoverVar)
    }
    function onChangeAffichage(val) {
        if (val) {
            setAffichage('card')
        } else {
            setAffichage('liste')
        }
    }
    function goDetails(){
        history.push("/edit-signalement-front");
    }
    if (isLogged == false) {
        return <Redirect to={toRedirect} />;
    }
    if (affichage == 'liste') {
        affichage_to_render = (
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Nouveau</td>
                                <td>
                                    <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                                    <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>En cours</td>
                                <td>
                                    <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                                    <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>Fait</td>
                                <td>
                                    <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                                    <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else if (affichage == 'card') {
        affichage_to_render = (
            <div className="row">
                <div className="col-md-2" >
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nombre par region</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                            <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                        </div>
                    </div>
                </div>
                <div className="col-md-2" >
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nombre par region</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                            <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nombre par region</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <span onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                            <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                        </div>
                    </div>
                </div>
                <div className="col-md-2" >
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nombre par region</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                            <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                        </div>
                    </div>
                </div>
                <div className="col-md-2" >
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nombre par region</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                            <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                        </div>
                    </div>
                </div>
                <div className="col-md-2" >
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nombre par region</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <span onMouseLeave={hideModal.bind(this)} onMouseEnter={showModal.bind(this)}><FaRegEye className="icon_eye" /></span>
                            <span onClick={goDetails.bind(this)}><FaEdit className="icon_edit" /></span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className="container container_page">
            <div>
                <MenusFront />
            </div>
            <h4>Les signalements dans mes regions</h4>
            <div className="row">
                <div className="col-md-12">
                    <ToggleSwitch onChangeAffichage={onChangeAffichage.bind(this)} label="Affichage Carte" />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    Type de signalement
                    <select className="form-control">
                        <option>Route</option>
                        <option>Infrastructure</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-6">
                            Date de debut
                            <input className="form-control" type="date" />
                        </div>
                        <div className="col-md-6">
                            Date de fin
                            <input className="form-control" type="date" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    Status
                    <select className="form-control">
                        <option>Nouveau</option>
                        <option>En cours</option>
                        <option>Fait</option>
                    </select>
                </div>
            </div>
            {affichage_to_render}
            {popupState}
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

export default connect(states, setAuth)(GererSignalementFront);
