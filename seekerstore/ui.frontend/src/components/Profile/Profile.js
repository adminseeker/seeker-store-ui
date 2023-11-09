import {React, useEffect, useState} from "react";
import { MapTo } from "@adobe/aem-react-editable-components";
import {useDispatch, useSelector} from "react-redux";
import { loadUser } from "../../actions/auth";
 
const ProfileEditConfig = {
    emptyLabel: "Profile component",
  
    isEmpty: function (props) {return props?.usernameLabel?.trim().length < 1}
    
  };
  
 

const Profile = (props)=>{

    const store = useSelector((state)=>({
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading,
        user: state.auth.user
    }));

    const dispatch = useDispatch();
   
    useEffect(()=>{
        dispatch(loadUser())
    },[dispatch])
    
    
    if (ProfileEditConfig.isEmpty(props)) { return null; }

    return (
        <div className="Profile-component">
          
        </div>
    )
}

MapTo("seekerstore/components/profile")(Profile,ProfileEditConfig);
export default Profile;
