import axios from "axios";


const login = (cqPath,{username,password})=>{
    return async (dispatch)=>{
        const config = {
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }

        try {
            let parentPath = cqPath.split("/").slice(0, -1).join("/");
            let loginServletResourcePath = parentPath + "/login.login.json";
            const res = await axios.post(loginServletResourcePath,{username,password},config);
            dispatch({
                type:"LOGIN_SUCCESS",
            });
            
            await dispatch(loadUser());
            return res.data;
        } catch (err) {
            console.log(err);
            if(err && err.response){
                return "error"
            }
            
            dispatch({
                type:"LOGIN_FAIL"
            })
        }
    }
}



const loadUser= ()=>{
    return async (dispatch)=>{
        try {
            let userServletResourcePath =  "/content/seekerstore/in/en/login/jcr:content/root/responsivegrid/profile.profile.json";
            const res = await axios.post(userServletResourcePath);
            if(res.data.msg) throw new Error(res.data.msg)
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




export {loadUser,login};