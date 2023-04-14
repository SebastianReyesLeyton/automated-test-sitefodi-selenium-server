import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';

const InputDate = (props) => {

    const handleOnChange = (e) => {
        
        let d = new Date(e),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        props.onChange({ target: { name: props.name, value: [year, month, day].join('/') } });
    }

    return ( 
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DatePicker 
                disableFuture
                label = {props.label}
                value = {props.value}
                onChange = {handleOnChange}
                openTo="year"
                views={['year', 'month', 'day']}
                renderInput={(params) => <TextField value={props.value} className = {props.className} variant={props.variant} {...params} />}
            />
        </LocalizationProvider>
    )
}

export default InputDate;