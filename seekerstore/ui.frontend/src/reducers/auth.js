
const initialState = {
    isAuthenticated:null,
    loading:true,
    user:null,
    isPageAuthenticated:null,
    forgotPasswordEmail:""
};

const authReducer = (state=initialState,action)=>{
    switch(action.type){
        case "USER_LOADED":
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.user
            }

        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            return{
                ...state,
                isAuthenticated:true,
                loading:false
            }
        case "PAGE_AUTHENTICATED":
            return{
                ...state,
                isAuthenticatedPage: true,
                loading:false
            }
        case "FORGOT_PASSWORD":
            return{
                ...state,
                forgotPasswordEmail:action.email
            }
        case "FORGOT_PASSWORD_ERROR":
            return{
                ...state,
                forgotPasswordEmail:""
            }
            
        case "REGISTER_FAIL":
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT":
            document.cookie="";
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                forgotPasswordEmail:""
            }
        default:
            return state;
    }
}

export default authReducer;