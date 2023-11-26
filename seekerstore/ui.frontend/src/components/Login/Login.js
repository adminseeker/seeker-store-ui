import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MapTo } from "@adobe/aem-react-editable-components";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import {login} from "../../actions/auth"
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';




const LoginEditConfig = {
    
    emptyLabel: "Login component",
    isEmpty: function (props) {return props?.usernameLabel?.trim().length < 1}
    
};

const defaultTheme = createTheme();

const Login = (props) => {


    const [formData,setFormData] = React.useState({
        username:"",
        password:"",
    });

    const [error,setError] = React.useState(null);
    const [emailError,setEmailError] = React.useState(null);
    const [passwordError,setPasswordError] = React.useState(null);

    const dispatch = useDispatch(); 
    const store = useSelector((state)=>({
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticatedPage: state.auth.isAuthenticatedPage,
        loading: state.auth.loading
    }));

    if (LoginEditConfig.isEmpty(props)) { return null; }
    const {username,password} = formData;
    
    const onChange = (e)=>{
        setError(null);
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(e.target?.name=="username"){
            if(e.target.value && e.target.value.match(isValidEmail)){
                setEmailError(null);
                setFormData({...formData , [e.target.name]:e.target.value})
              }else{
                setEmailError(props.invalidEmailError);
              }
        }else if(e.target?.name=="password"){
            if(e.target.value && e.target.value.length >= Number(props.minimumPasswordLength)){
                setPasswordError(null);
                setFormData({...formData , [e.target.name]:e.target.value})
              }else{
                setPasswordError(props.invalidPasswordError);
              }
        }
    }
    
    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            let cqPath = props.cqPath
            setError(null);
            if(!emailError && !passwordError){
                const data = await dispatch(login(cqPath,{username,password}));
                // console.log("errordata: ",data)
                if(data.msg){
                    if(data.statusCode===403){
                        setError(props.invalidCredsError);
                    }else{
                        setError(props.genericError);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!AuthoringUtils.isInEditor() && store.isAuthenticated) return <Redirect to={props.dashboardLink}/>


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={props.usernameLabel}
              name="username"
              autoComplete="email"
              onChange={onChange}
              error={error || emailError}
              autoFocus
            />
            {emailError && <Typography component={"span"} color="red">{emailError}</Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={props.passwordLabel}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              error={error || passwordError}
            />
            {passwordError && <Typography component={"span"} color="red">{passwordError}</Typography>}
            {!emailError && !passwordError && error && <Typography component={"span"} color="red">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {props.submitButtonLabel}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={props.forgotPasswordLink} variant="body2">
                {props.forgotPasswordLinkLabel}
                </Link>
              </Grid>
              <Grid item>
                <Link href={props.signUpLink}variant="body2">
                {props.signUpLinkLabel}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

MapTo("seekerstore/components/login")(Login,LoginEditConfig);
export default Login;