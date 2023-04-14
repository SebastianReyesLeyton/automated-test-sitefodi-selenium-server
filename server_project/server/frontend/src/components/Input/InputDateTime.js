import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';

const InputDateTime = (props) => {

    const handleOnChange = (e) => {
        
        let d = new Date(e),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            seconds = d.getSeconds(),
            minutes = d.getMinutes(),
            hours = d.getHours();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (seconds.length < 2) seconds = '0' + seconds;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (hours.length < 2) hours = '0' + hours;
        
        props.onChange({ target: { name: props.name, value: `${[year, month, day].join('/')} ${hours}:${minutes}:${seconds}` } });
    }

    return ( 
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DateTimePicker 
                disablePast
                label = {props.label}
                value = {props.value}
                onChange = {handleOnChange}
                openTo="year"
                renderInput={(params) => <TextField value={props.value} className = {props.className} variant={props.variant} {...params} />}
            />
        </LocalizationProvider>
    )
}

export default InputDateTime;