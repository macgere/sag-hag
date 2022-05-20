import React from 'react';
import DateTimePicker from 'react-datetime-picker';

const Call = (props) => {
    const {callTime, setCallTime} = props
    return (
        <div className='callTime'>
            <h3>Call Time:</h3>
            <DateTimePicker onChange={setCallTime} value={callTime}/>
        </div>
    )
}

export default Call