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

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import constants from "../../constants";

export default function Login() {
  const navigate = useNavigate();
  if (sessionStorage.getItem(constants.k_id)) {
    navigate('/dashboard', { replace: true });
    return;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      Email: data.get('email'),
      Password: data.get('password'),
    }

    axios.post(process.env.REACT_APP_LOGIN_URL, payload).then(result => {
      if (result.status === 200) {
        // login success
        console.log('login success');
        console.log(result.data);
        sessionStorage.setItem(constants.k_id, result.data.id);
        sessionStorage.setItem(constants.k_token, result.data.token);
        navigate('/dashboard', { replace: true });
      }
      else {
        window.alert(result.data)
      }
    })
      .catch(error => {
        window.alert(error.response.data);
      })
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
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
            onClick={() => navigate('/resigter', { replace: true })}
          >
            Resigter
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
