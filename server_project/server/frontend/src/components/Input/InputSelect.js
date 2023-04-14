import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"

const InputSelect = (props) => {

	return (
		<FormControl className={props.className}>
			<InputLabel id={props.labelID}>{props.label}</InputLabel>
			<Select
				labelId={props.labelID}
				name={props.name}
				label={props.label}
				value={props.value}
				variant={props.variant}
				required={props.required}
				onChange={props.onChange}
			>
				{
					props.options.map((item, index) => (
						<MenuItem key={index} value={item.value}>{item.text}</MenuItem>
					))
				}
			</Select>
		</FormControl>
	)
}

export default InputSelect;