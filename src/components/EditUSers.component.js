import React, { Component,useEffect,useState } from "react";
import Menus from './menus.component';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import configData from "./config.json";

function EditUSers (props) {

    const [nom, setNom] = useState("" );
    const [newPassword, setNewPassword] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");
    const [email, setEmail] = useState("");
    const [listRegion, setListRegion] = useState([]);
    let ids = (props.user) ? props.user :""
    let history = useHistory();
    const [idUser, setUserId] = useState(0);
    const isLogged = props.isAuth;
    const token = props.isAuth;
    
    function changeNom(e){
        setNom(e.target.value);
    }

    function changeRegion(e){
        setRegion(e.target.value);
    }

    function changeEmail(e){
      setEmail(e.target.value);
    }

    function changePassword(e){
        setPassword(e.target.value);
    }

    async function saveUSer(){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
            body: JSON.stringify({ username: nom,password : password ,email : email,id : idUser,region : region})
            };
        const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+"user/updateuser/"+idUser, requestOptions);
            const data = await result.json();
            console.log(data);
        }
        await fetchData();
        history.push("/gestion-users");
    }
    
    function back(){
        history.push("/gestion-users");
    }

    function showFormAct(){
      setShowForm(!showForm)
    }

    function chacheNewPassword(e) {
      setNewPassword(e.target.value);
    }

    async function changePassword(){
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
        body: newPassword
        };
    const fetchData = async () => {
        const result = await fetch(configData.SERVER_URL+"user/updatepassword/"+idUser, requestOptions);
        const data = await result.json();
        console.log(data);
    }
    await fetchData();
    history.push("/gestion-users");
    }

    useEffect(() => {

        if(isLogged == false){
          history.push("/login");
            sessionStorage.removeItem('jwtToken');
        }else{
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
            };
          
          const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+'region/all', requestOptions);
            const data = await result.json();
            setListRegion(data);
            

            const user = await fetch(configData.SERVER_URL+'user/findbyusername?username='+ids, requestOptions);
            const dataUser = await user.json();
            const requestOptions2 = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
            };
            const regionsL = await fetch(configData.SERVER_URL+'region/all', requestOptions2);
            const resultRegion = await regionsL.json();
            
            await setNom(dataUser.username);
            await setPassword(dataUser.password);
            await setUserId(dataUser.id);
            await setEmail(dataUser.email);
            console.log(dataUser,'datauserrr');
            await setRegion(dataUser.region);
            await setListRegion(resultRegion)

          };

          fetchData();
        }
      },[]);
      if(showForm == true){
        var showFormContent = (
          <div className="containerForm container">
            <input className="form-control" onChange={chacheNewPassword.bind(this)} type="password" value={newPassword} />
            <div className="btn btn-success" onClick={changePassword.bind(this)}>Modifier mot de passe</div>
          </div>
        )
      }else{
        var showFormContent = "";
      }
      

        return (
            <div className="container container_page">
                <div>
                    <Menus />
                </div>
                <h3>Modifier un compte</h3>
                <button className="btn btn-primary" onClick={back.bind(this)}>Retour</button>
                <div className="form-group">
                    <label>Nom</label>
                    <input value={nom} onChange={changeNom.bind(this)} type="text" className="form-control" placeholder="Nom" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input onChange={changeEmail.bind(this)} value={email} type="email" className="form-control" placeholder="Email" />
                </div>

                <div className="form-group">
                    <label>Mot de passe : <div onClick={showFormAct.bind(this)} className="btn btn-info">Modifier mot de passe</div></label>
                    {/* <input onChange={changePassword.bind(this)} value={password} type="password" className="form-control" placeholder="Enter password" /> */}
                </div>
                <div className="form-group">
                    <label>Région</label>
                    <select value={region} onChange={changeRegion.bind(this)} className="form-control">
                    <option value="">Selectionner un region</option>
                    {listRegion.map((value,index) =>{
                      return(
                      <option key={index} selected={(region == value.nomRegion) ? "selected" : "" } value={value.nomRegion}>{value.nomRegion}</option>
                      )
                    })}
                        
                    </select>
                </div>
                {showFormContent}

                <button type="submit" onClick={saveUSer.bind(this)} className="btn btn-primary btn-block">Modifier</button>
            </div>
        );
    
}
const style = StyleSheet
const states = (state) => {
    return {
      isAuth : state.isAuth,
      user : state.user
    }
  }
  
  const setAuth = (dispatch) => {
    return {
      setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})}
    } 
  }
export default connect(states,setAuth)(EditUSers);
