import {React, useState} from "react";
import { MapTo } from "@adobe/aem-react-editable-components";
import axios from "axios";

const HeaderEditConfig = {
    emptyLabel: "Header component",
  
    isEmpty: function (props) {return props?.usernameLabel?.trim().length < 1}
    
  };
  
 

const Header = (props)=>{

    const getUserDetails = async () => {
        const config = {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }
        let token = localStorage.getItem("access-token");
        const res = await axios.post(props.cqPath+".profile.json",{token},config);
        console.log("profile details: ",res.data);
        return res.data;
    }

    if (HeaderEditConfig.isEmpty(props)) { return null; }

    return (
        <div className="Header-component">
            <button onClick={getUserDetails}>Get User Details</button>
        </div>
    )
}

MapTo("seekerstore/components/profile")(Header,HeaderEditConfig);
export default Header;