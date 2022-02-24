import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'
import {connect} from 'react-redux';
import Menus from './menus.component';
import { useHistory } from "react-router-dom";
import Pagination from './partials/Pagination';
import configData from "./config.json";

function GestionUsers(props) {

      const [listUsers, setListUsers] = useState([]);
      const [reloadDatas, setReloadDatas] = useState();
      const [progressBar, setprogressBar] = useState();

      const isLogged = props.isAuth;
      let history = useHistory();
      const token = props.isAuth;
      const [token_stored, setToken] = useState(token);

      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(10);
      const [listUsersO, setListUsersO] = useState([]);

       useEffect(() => {

        console.log(isLogged);

        if(isLogged == false){
          history.push("/login");
          sessionStorage.removeItem('jwtToken');
        }else{
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token},
        };

          const fetchData = async () => {
            const result = await fetch(configData.SERVER_URL+'user/all', requestOptions);
            const data = await result.json();
            setListUsers(data);
            setListUsersO(data)
          };

          fetchData();
        }
      },[reloadDatas]);

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      console.log(listUsers,'fdfdfdfdfdfd');
      const currentPosts = listUsers.length != 0 ? listUsers.slice(indexOfFirstPost, indexOfLastPost) : [];

     function Edit(data){
        console.log(props);
        props.setUsers(data)
        history.push("/edit-user");
      }

      async function Supprimer(val){
        setprogressBar("<progress >...</progress>");
        // e.target.value.
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'Authorization' : "Bearer "+token_stored},
          };
        const user = await fetch(configData.SERVER_URL+'user/deleteuser?id='+val.id, requestOptions);
        const dataUser = await user.json();

        setReloadDatas(dataUser)

      }

      function changeSearch(e){
        let val = e.target.value;
        let copyList = [...listUsersO];
        console.log(copyList,'val');
        let filtered = copyList.filter(function(dataM) {
          const reg = new RegExp(val, 'i');
          return dataM.username.match(reg);
        });
        console.log(filtered);
        setListUsers(filtered);
      }
      if(listUsers != ""){
        console.log(listUsers);
      }
      const paginate = pageNumber => setCurrentPage(pageNumber);
      // console.log(props.users,'usersss');
        return (
            <div className="container container_page">
              <div>
                <Menus />
              </div>
              
              <h3>Gestion des utilisateurs</h3>
              {/* <div className="col-md-12">
              <button onClick={goAdd.bind(this)} className="btn btn-primary mb-3">Ajouter</button>

              </div> */}
              <div className="row">
              <div className="col-md-6 text-right mb-3">
                <button className="btn btn-info" onClick={goAdd.bind(this)}>Ajouter</button>
              </div>
              <div className="col-md-6 text-right mb-3">
              <input placeholder="Recherche" type="text" onChange={changeSearch.bind(this)}></input>
              </div>
              </div>
              
              <div className="col-12">
              <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    {/* <th scope="col">Region</th> */}
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                  {currentPosts.map((value,index) =>{
                    // if(value.roles[0].name != "ROLE_ADMIN"){
                      return(
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{value.username}</td>
                        {/* <td>{value.roles[0].name != "ROLE_ADMIN" ? "" : value.nomRegion}</td> */}
                        <td>
                            <button disabled={value.roles[0].name == "ROLE_ADMIN" || value.roles[0].name == "ROLE_USER"  ? "disabled" : ""} onClick={() =>Edit(value.username)} className="btn btn-info mr-2">Modifier</button>
                            <button disabled={value.roles[0].name == "ROLE_ADMIN" || value.roles[0].name == "ROLE_USER"  ? "disabled" : ""} onClick={()=>Supprimer(value)} className="btn btn-danger">
                              Supprimer</button>
                        </td>
                      </tr>
                      )
                    // }
                    })}
                </tbody>
                </table>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={listUsers.length}
                  paginate={paginate}
                />
              </div>
            </div>
        );

        function goAdd(e){
          history.push("/add-users");
        }
}
const states = (state) => {
  return {
    isAuth : state.isAuth,
    users : state.users
  }
}

const setUsers = (dispatch) => {
  return {
    setUsers : (val) => {dispatch({type : 'SET_USER_DATA',value : val})}
  } 
}

export default connect(states,setUsers)(GestionUsers);
