import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme:Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '300px',
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
}));

const Form: React.FC = () => {
    const navigate= useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    Name: '',
    phone: '',
    email: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(formData.Name==='' || formData.phone===''|| formData.email===''){
        alert("Please fill all the details");
        navigate("/");
    }
    localStorage.setItem('formData', JSON.stringify(formData));
    navigate("/component1")
  };

  return (
    <Container>
      <Typography variant="h5">Enter the details</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          label="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          type="email"
          required
        />
        <Button type="submit" variant="contained" color="primary" >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Form;
