import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    TextField,
    Button,
    Grid,
} from '@mui/material';

const Controls = ({ region, setRegion, errorRate, setErrorRate, seed, setSeed }) => {
    const handleErrorRateChange = (event, newValue) => {
        setErrorRate(newValue);
    };

    const handleErrorRateInputChange = (event) => {
        if(Number(event.target.value) > 1000){
            setErrorRate(1000);
            return;
        }
        setErrorRate(event.target.value === '' ? '' : Number(event.target.value));
    };

    const generateRandomSeed = () => {
        setSeed(Math.floor(Math.random() * 1000000));
    };

    const menuItems = [
        <MenuItem key='mexico' value="mexico">Mexico</MenuItem>,
        <MenuItem key='uk' value="uk">UK</MenuItem>,
        <MenuItem key='russia' value="russia">Russia</MenuItem>,
    ];

    return (
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs={12} sm={2.4}>
                <FormControl fullWidth>
                    <InputLabel>Region</InputLabel>
                    <Select label={'Region'} value={region} onChange={(e) => setRegion(e.target.value)}>
                        {menuItems}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <Slider
                    value={errorRate}
                    onChange={handleErrorRateChange}
                    aria-labelledby="error-rate-slider"
                    valueLabelDisplay="auto"
                    step={0.01}
                    marks
                    min={0}
                    max={10}
                />
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <TextField
                    fullWidth
                    label="Error Rate"
                    value={errorRate}
                    onChange={handleErrorRateInputChange}
                    inputProps={{
                        step: 0.1,
                        min: 0,
                        max: 1000,
                        type: 'number',
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={2.4}>
                <TextField
                    fullWidth
                    label="Seed"
                    value={seed}
                    onChange={(e) => setSeed(Number(e.target.value))}
                    type="number"
                />
            </Grid>
            <Grid item xs={0} sm={2.4}>
                <FormControl fullWidth>
                    <Button size='large' variant="contained" onClick={generateRandomSeed}>
                        Random Seed
                    </Button>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Controls;
