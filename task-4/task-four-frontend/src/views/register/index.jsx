import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import constants, { axios_config } from '../../constants';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      Name: data.get('Name'),
      Email: data.get('Email'),
      Password: data.get('Password'),
    }
    const url = `${process.env.REACT_APP_REGISTER_USER}`;

    axios.post(url, payload, axios_config)
    .then(result => {
      if(result.status === 201){
        window.alert('Registered Successfully');
        sessionStorage.setItem(constants.k_id, result.data.id);
        sessionStorage.setItem(constants.k_token, result.data.token);
        navigate("/dashboard");
      }
      else if(result.status === 200 && result.data > 0){
        window.alert('Reactivated Account');
        sessionStorage.setItem(constants.k_id, result.data.id);
        sessionStorage.setItem(constants.k_token, result.data.token);
        navigate("/dashboard");
      }
      else{
        window.alert(result.data);
      }
    })
    .catch(error => {
      window.alert(error.response.data)
    });
  };

  return (
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="Name"
                label="Name"
                name="Name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="Email"
                label="Email Address"
                name="Email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item sm={12} md={12} display={'flex'} justifyContent={'center'}>
              OR
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="text"
            color='secondary'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/login', { replace: true })}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}