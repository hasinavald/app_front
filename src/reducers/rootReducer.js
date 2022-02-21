const initState = {
    posts : [],
    isAuth : false,
    user : null,
    users : null,
    regions : null,
    region : null,
    type : null,
    signal : null,
    user_region : null
}

const rootReducer = (state = initState,action) => {
    
    if(action.type == "SET_SESSIONS"){
        state.isAuth = action.value;
    }

    if(action.type == "SET_USER_DATA"){
        state.user = action.value;
    }

    if(action.type == "SET_USER_LISTS"){
        state.users = action.value;
    }

    if(action.type == "SET_REGION_LIST"){
        state.regions = action.value;
    }

    if(action.type == "SET_REGION"){
        state.region = action.value;
    }
    
    if(action.type == "SET_Type"){
        state.type = action.value;
    }

    if(action.type == "SET_SIGNAL"){
        state.signal = action.value;
    }

    if(action.type == "SET_USER_REGION"){
        state.user_region = action.value;
    }

    return state;
}

export default rootReducer;