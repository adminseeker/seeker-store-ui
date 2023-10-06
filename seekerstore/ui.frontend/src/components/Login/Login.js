import {React, useState} from "react";
import { MapTo } from "@adobe/aem-react-editable-components";
import axios from "axios";

const LoginEditConfig = {
    emptyLabel: "Login component",
  
    isEmpty: function (props) {return props?.usernameLabel?.trim().length < 1}
    
  };
  
 

const Login = (props)=>{

    const [formData,setFormData] = useState({
        username:"",
        password:"",
        error:false
    });
    
    
    const {username,password,error} = formData;
    
    const onChange = (e)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }
    
    const onSubmit = async (e)=>{
        e.preventDefault();
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body = JSON.stringify({username,password});
        try {
            const res = await axios.post("https://dev-apis.seeker-store.k8s.aravindweb.com/authservice/api/v1/auth/login",body,config);
            let userDetails = await getUserDetails(res.data.token);
            console.log(userDetails);

        } catch (err) {
            console.log(err);
        }
    }

    const getUserDetails = async (token) => {
        const config = {
            headers:{
                "Authorization": "Bearer "+token
            }
        }
        const res = await axios.get("https://dev-apis.seeker-store.k8s.aravindweb.com/userservice/api/v1/users/me",config);
        return res.data;
    }

    if (LoginEditConfig.isEmpty(props)) { return null; }

    return (
        <div className="login-component">
            <form id="loginForm" onSubmit={onSubmit}>
                {props.usernameLabel}  <input type="text" id="username" onChange={onChange} name="username" />
                {props.passwordLabel}  <input type="password" id="password" onChange={onChange} name="password"/>
                <button type="submit">{props.submitButtonLabel}</button>
            </form>
        </div>
    )
}

MapTo("seekerstore/components/login")(Login,LoginEditConfig);
export default Login;