import React from 'react';
import Calendar from 'react-calendar';
export default function Calender(props) {
	return (
		<Calendar
			className='responsive hoverable m-auto'
			onChange={props.onChange}
			value={props.date}
			onClickDay={props.onClickDay}
		/>
	);
}
