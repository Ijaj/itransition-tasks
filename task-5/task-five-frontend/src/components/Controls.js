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
    <MenuItem key='af_ZA' value="af_ZA">Afrikaans (South Africa)</MenuItem>,
    <MenuItem key='ar' value="ar">Arabic</MenuItem>,
    <MenuItem key='az' value="az">Azerbaijani</MenuItem>,
    <MenuItem key='base' value="base">Base</MenuItem>,
    <MenuItem key='cs_CZ' value="cs_CZ">Czech (Czechia)</MenuItem>,
    <MenuItem key='da' value="da">Danish</MenuItem>,
    <MenuItem key='de' value="de">German</MenuItem>,
    <MenuItem key='de_AT' value="de_AT">German (Austria)</MenuItem>,
    <MenuItem key='de_CH' value="de_CH">German (Switzerland)</MenuItem>,
    <MenuItem key='dv' value="dv">Maldivian</MenuItem>,
    <MenuItem key='el' value="el">Greek</MenuItem>,
    <MenuItem key='en' value="en">English</MenuItem>,
    <MenuItem key='en_AU' value="en_AU">English (Australia)</MenuItem>,
    <MenuItem key='en_AU_ocker' value="en_AU_ocker">English (Australia Ocker)</MenuItem>,
    <MenuItem key='en_BORK' value="en_BORK">English (Bork)</MenuItem>,
    <MenuItem key='en_CA' value="en_CA">English (Canada)</MenuItem>,
    <MenuItem key='en_GB' value="en_GB">English (Great Britain)</MenuItem>,
    <MenuItem key='en_GH' value="en_GH">English (Ghana)</MenuItem>,
    <MenuItem key='en_HK' value="en_HK">English (Hong Kong)</MenuItem>,
    <MenuItem key='en_IE' value="en_IE">English (Ireland)</MenuItem>,
    <MenuItem key='en_IN' value="en_IN">English (India)</MenuItem>,
    <MenuItem key='en_NG' value="en_NG">English (Nigeria)</MenuItem>,
    <MenuItem key='en_US' value="en_US">English (United States)</MenuItem>,
    <MenuItem key='en_ZA' value="en_ZA">English (South Africa)</MenuItem>,
    <MenuItem key='eo' value="eo">Esperanto</MenuItem>,
    <MenuItem key='es' value="es">Spanish</MenuItem>,
    <MenuItem key='es_MX' value="es_MX">Spanish (Mexico)</MenuItem>,
    <MenuItem key='fa' value="fa">Farsi/Persian</MenuItem>,
    <MenuItem key='fi' value="fi">Finnish</MenuItem>,
    <MenuItem key='fr' value="fr">French</MenuItem>,
    <MenuItem key='fr_BE' value="fr_BE">French (Belgium)</MenuItem>,
    <MenuItem key='fr_CA' value="fr_CA">French (Canada)</MenuItem>,
    <MenuItem key='fr_CH' value="fr_CH">French (Switzerland)</MenuItem>,
    <MenuItem key='fr_LU' value="fr_LU">French (Luxembourg)</MenuItem>,
    <MenuItem key='fr_SN' value="fr_SN">French (Senegal)</MenuItem>,
    <MenuItem key='he' value="he">Hebrew</MenuItem>,
    <MenuItem key='hr' value="hr">Croatian</MenuItem>,
    <MenuItem key='hu' value="hu">Hungarian</MenuItem>,
    <MenuItem key='hy' value="hy">Armenian</MenuItem>,
    <MenuItem key='id_ID' value="id_ID">Indonesian (Indonesia)</MenuItem>,
    <MenuItem key='it' value="it">Italian</MenuItem>,
    <MenuItem key='ja' value="ja">Japanese</MenuItem>,
    <MenuItem key='ka_GE' value="ka_GE">Georgian (Georgia)</MenuItem>,
    <MenuItem key='ko' value="ko">Korean</MenuItem>,
    <MenuItem key='lv' value="lv">Latvian</MenuItem>,
    <MenuItem key='mk' value="mk">Macedonian</MenuItem>,
    <MenuItem key='nb_NO' value="nb_NO">Norwegian (Norway)</MenuItem>,
    <MenuItem key='ne' value="ne">Nepali</MenuItem>,
    <MenuItem key='nl' value="nl">Dutch</MenuItem>,
    <MenuItem key='nl_BE' value="nl_BE">Dutch (Belgium)</MenuItem>,
    <MenuItem key='pl' value="pl">Polish</MenuItem>,
    <MenuItem key='pt_BR' value="pt_BR">Portuguese (Brazil)</MenuItem>,
    <MenuItem key='pt_PT' value="pt_PT">Portuguese (Portugal)</MenuItem>,
    <MenuItem key='ro' value="ro">Romanian</MenuItem>,
    <MenuItem key='ro_MD' value="ro_MD">Romanian (Moldova)</MenuItem>,
    <MenuItem key='ru' value="ru">Russian</MenuItem>,
    <MenuItem key='sk' value="sk">Slovak</MenuItem>,
    <MenuItem key='sr_RS_latin' value="sr_RS_latin">Serbian (Serbia, Latin)</MenuItem>,
    <MenuItem key='sv' value="sv">Swedish</MenuItem>,
    <MenuItem key='th' value="th">Thai</MenuItem>,
    <MenuItem key='tr' value="tr">Turkish</MenuItem>,
    <MenuItem key='uk' value="uk">Ukrainian</MenuItem>,
    <MenuItem key='ur' value="ur">Urdu</MenuItem>,
    <MenuItem key='vi' value="vi">Vietnamese</MenuItem>,
    <MenuItem key='yo_NG' value="yo_NG">Yoruba (Nigeria)</MenuItem>,
    <MenuItem key='zh_CN' value="zh_CN">Chinese (China)</MenuItem>,
    <MenuItem key='zh_TW' value="zh_TW">Chinese (Taiwan)</MenuItem>,
    <MenuItem key='zu_ZA' value="zu_ZA">Zulu (South Africa)</MenuItem>,
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
