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
import { useDispatch, useSelector } from 'react-redux';
import { MapTo } from '@adobe/aem-react-editable-components';
import { signup } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';


const SignUpEditConfig = {
    
  emptyLabel: "SignUp component",
  isEmpty: function (props) {return props?.emailAddressLabel?.trim().length < 1}
  
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = (props) => {


  const [formData,setFormData] = React.useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    password2:"",
    phone: ""
});

const [error,setError] = React.useState(null);
const [emailError,setEmailError] = React.useState(null);
const [passwordError,setPasswordError] = React.useState(null);
const [phoneError,setPhoneError] = React.useState(null);

const {firstName,lastName,email,password,password2,phone} = formData;


const dispatch = useDispatch(); 
const store = useSelector((state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticatedPage: state.auth.isAuthenticatedPage,
    loading: state.auth.loading
}));

if (SignUpEditConfig.isEmpty(props)) { return null; }

if(!AuthoringUtils.isInEditor() && store.isAuthenticated) return <Redirect to={props.dashboardLink}/>

const onChange = (e)=>{
  if(e.target.name==="password"){
    if(e.target.value.length < props.minimumPasswordLength){
      setPasswordError(props.invalidPasswordError);
    }else if(e.target.value!==password2){
      setPasswordError(props.passwordMismatchError);
    }else{
      setPasswordError(null);
      setFormData({...formData , [e.target.name]:e.target.value})
    }
  }

  if(e.target.name==="password2"){
    if(e.target.value.length < props.minimumPasswordLength){
      setPasswordError(props.invalidPasswordError);
    }else if(e.target.value!==password){
      setPasswordError(props.passwordMismatchError);
    }else{
      setPasswordError(null);
      setFormData({...formData , [e.target.name]:e.target.value})
    }
  }
  
  if(e.target.name==="email" && !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(e.target.value)){
    setEmailError(props.invalidEmailError)
  }else{
    setEmailError(null);
    setFormData({...formData , [e.target.name]:e.target.value})
  }
  if(e.target.name==="phone" && !(/^[+]?(?:\d| ){10,10}$/.test(e.target.value))){
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      setPhoneError(props.invalidPhoneError)
  }else{
    setPhoneError(null);
    setFormData({...formData , [e.target.name]:e.target.value})
  }
  // setFormData({...formData , [e.target.name]:e.target.value})
}

const onSubmit = async (e)=>{
  e.preventDefault();
  setError(null);
 if(!error && !passwordError && !emailError && !phoneError){
      const data = await dispatch(signup(props.cqPath,{name:firstName+" "+lastName,email,password,role:props.role,phone}));
      if(data.msg && data.msg==="Email Already Exists!"){
          setEmailError(props.regesiteredEmailError);
      }else if (data.msg){
          setError(props.genericError)   
      }
  }
}

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
            {props.signupTitle}
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={props.firstNameLabel}
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={props.lastNameLabel}
                  name="lastName"
                  onChange={onChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={props.emailAddressLabel}
                  name="email"
                  onChange={onChange}
                  error={error || emailError}
                  autoComplete="email"
                />
              {emailError && <Typography component={"span"} color="red">{emailError}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  onChange={onChange}
                  label={props.passwordLabel}
                  type="password"
                  id="password"
                  error={error || passwordError}
                  autoComplete="new-password"
                />
              {passwordError && <Typography component={"span"} color="red">{passwordError}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  onChange={onChange}
                  label={props.confirmPasswordLabel}
                  type="password"
                  id="password2"
                  error={error || passwordError}
                  autoComplete="new-password"
                />
              {passwordError && <Typography component={"span"} color="red">{passwordError}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="signup-phone"
                  label={props.phoneLabel}
                  name="phone"
                  inputProps={{
                      maxLength: 10
                  }}
                  onChange={onChange}
                  error={error || phoneError}
                  autoComplete="phone"
                />
                {phoneError && <Typography component={"span"} color="red">{phoneError}</Typography>}
                {error && <Typography component={"span"} color="red">{error}</Typography>}
              </Grid>
            </Grid>
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
                <Link href={props.signUpLink} variant="body2">
                {props.signUpLinkLabel}
                </Link>
              </Grid>
              <Grid item>
                <Link href={props.signinLink} variant="body2">
                {props.signinLinkLabel}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

MapTo("seekerstore/components/signup")(SignUp,SignUpEditConfig);
export default SignUp;