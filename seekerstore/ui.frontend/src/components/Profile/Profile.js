import {React, useEffect, useState} from "react";
import { MapTo } from "@adobe/aem-react-editable-components";
import {useDispatch, useSelector} from "react-redux";
import { loadUser,isPageProtected } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';
 
const ProfileEditConfig = {
    emptyLabel: "Profile component",
  
    isEmpty: function () {return AuthoringUtils.isInEditor() }
    
  };
  
 

const Profile = ({cqPath})=>{

    const store = useSelector((state)=>({
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticatedPage: state.auth.isAuthenticatedPage,
        loading: state.auth.loading,
        user: state.auth.user
    }));
    const isInEditor = AuthoringUtils.isInEditor();
    const dispatch = useDispatch();
   
    useEffect(()=>{
        !isInEditor && dispatch(loadUser())
        !isInEditor && dispatch(isPageProtected(cqPath));
    },[dispatch,cqPath])
    
    if (ProfileEditConfig.isEmpty()) { return null; }

    if(!isInEditor && store.isAuthenticatedPage && !store.isAuthenticated){
        return <Redirect to="/in/en/login.html"/>
    }

    return (
        <div className="Profile-component">
        </div>
    )
}

MapTo("seekerstore/components/profile")(Profile,ProfileEditConfig);
export default Profile;
