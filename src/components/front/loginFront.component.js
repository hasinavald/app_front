import React, {useState} from "react";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import configData from "../config.json";
import { useHistory } from "react-router-dom";


 function LoginFront(props) {

    const [username, setUsername] = useState('RegionAnalamanga');
    const [password, setPassword] = useState('P@ssword1');
    const [redirect, setRedirect] = useState('');
    const [toRedirect, setToRedirect] = useState('');
    let history = useHistory();
    async function login() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username, password: password })
        };
        const response = await fetch(configData.SERVER_URL+'auth/signin', requestOptions);
        const data = await response.json();
        if(data.username){
            if(data.roles[0] == "ROLE_MODERATOR"){
                if(data.region){
                    props.setUserRegion(data.region);
                }
                props.setAuth(data.accessToken);
                sessionStorage.setItem('jwtToken',data.accessToken);
                history.push("/dashboard-front");
            }else{
                alert('Compte invalide');
            }
        }else{
            alert('Username ou Mot de passe invalide');
        }
        
       
      }

      function onChageUserName(e){
        const username = e.target.value;
        setUsername(username)
      }

      function onChangePassword(e){
        const password = e.target.value;
        setPassword(password)
      }

        if (redirect) {
            return <Redirect to={toRedirect} />;
        }
        return (
            <div className="login_container">

                <div className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="grid-container">
                        <Link className="menu_front nav-link_left area" to={"/front/login"}>
                            
                            Signaler
                            
                           
                            
                            </Link>
                        <div className="menu_front nav-link_right">
                            <Link className="nav-link button-menu" to={"/front/login"}><div className="text">Login</div></Link>
                            <Link className="nav-link button-menu" to={"/login"}><div className="text">Admin</div></Link>
                        </div>
                        
                    </div>
                </div>
            
                <div className="auth-wrapper">
                    <div className="login-box">
                        <div>
                            <h3 className="tittle_form">Sign In</h3>

                            <div className="user-box">
                                <label className="label">Email address</label>
                                <input type="email" value={username} onChange={onChageUserName.bind(this)} className="input_field" placeholder="Enter email" />
                            </div>

                            <div className="user-box">
                                <label className="label">Password</label>
                                <input type="password" value={password} onChange={onChangePassword.bind(this)} className="input_field" placeholder="Enter password" />
                            </div>

                            <button onClick={login.bind(this)} className="button-64"><span className="text">Submit</span></button>

                            <a href="#">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
}
const states = (state) => {
    return {
      isAuth : state.isAuth,
      user_region : state.user_region
    }
  }
  const mapDispatchToProps = dispatch => ({
    setAuth : (val) => {dispatch({type : 'SET_SESSIONS',value : val})},
    setUserRegion : (val) => {dispatch({type : 'SET_USER_REGION',value : val})},
   });

export default connect(states,mapDispatchToProps)(LoginFront);
