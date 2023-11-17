import axios from "axios";


const login = (cqPath,{username,password})=>{
    let res = {};
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }

        try {
            let parentPath = cqPath.split("/").slice(0, -1).join("/");
            let loginServletResourcePath = parentPath + "/login.login.json";
            res = await axios.post(loginServletResourcePath,{username,password},config);
            if(res.data.msg || !res.data.token) throw new Error(res.data.msg || "Action Error!")
            dispatch({
                type:"LOGIN_SUCCESS",
            });
            
            await dispatch(loadUser());
            return res.data;
        } catch (err) {
            console.log(err);
            dispatch({
                type:"LOGIN_FAIL"
            })
            return res.data;
        }
    }
}

const signup = (cqPath,body)=>{
    let res = {};
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }
        try {
            let parentPath = cqPath.split("/").slice(0, -1).join("/");
            let signupServletResourcePath = parentPath + "/signup.signup.json";
            res = await axios.post(signupServletResourcePath,body,config);
            if(res.data.msg || !res.data.token) throw new Error(res.data.msg || "Action Error!")
            dispatch({
                type:"LOGIN_SUCCESS",
            });
            
            await dispatch(loadUser());
            return res.data;
        } catch (err) {
            console.log(err);
            dispatch({
                type:"LOGIN_FAIL"
            })
            return res.data;
        }
    }
}



const loadUser= ()=>{
    return async (dispatch)=>{
        try {
            let userServletResourcePath =  "/content/seekerstore/in/en/login/jcr:content/root/profile.profile.json";
            const res = await axios.post(userServletResourcePath);
            if(res.data.msg || !res.data.userId) throw new Error(res.data.msg || "Action Error!")
            dispatch({
                type:"USER_LOADED",
                user:res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type:"AUTH_ERROR"
            })
        }
    }
}

const isPageProtected = (cqPath)=>{
    return async (dispatch)=>{
        try {
            let pagePropertiesPath =  cqPath.split("/root")[0]+".json";
            const res = await axios.get(pagePropertiesPath);
            if(res.data && res.data.isAuthenticatedPage==="true"){
                dispatch({
                    type:"PAGE_AUTHENTICATED",
                })
                return true; 
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}



export {loadUser,login,isPageProtected,signup};