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



// TODO remove, this demo shouldn't need to reset the theme.

const LoginEditConfig = {
    
    emptyLabel: "Login component",
    isEmpty: function (props) {return props?.usernameLabel?.trim().length < 1}
    
};

const defaultTheme = createTheme();

const Login = (props) => {


    const [formData,setFormData] = React.useState({
        username:"",
        password:"",
        error:false
    });

    const dispatch = useDispatch(); 
    
    const store = useSelector((state)=>({
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading
    }));

    if (LoginEditConfig.isEmpty(props)) { return null; }
    const {username,password,error} = formData;
    
    const onChange = (e)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }
    
    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            let cqPath = props.cqPath
            const data = await dispatch(login(cqPath,{username,password}));
        } catch (err) {
            console.log(err);
        }
    }

    if(store.isAuthenticated) return <Redirect to={props.dashboardLink}/>


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
              autoFocus
            />
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
            />
          
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