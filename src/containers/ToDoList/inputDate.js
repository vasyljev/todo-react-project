import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const datePickerContainer = (props) => {
    return(
        <DatePicker onChange={props.myOnChange} {...props}/>
    )
}

export default datePickerContainer;
