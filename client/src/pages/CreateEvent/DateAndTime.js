import React from 'react'
import Input from '../../components/ui/Input'

function DateAndtime({startDate, onChangeStartDate, endDate, onChangeEndDate, startTime, onChangeStartTime, endTime, onChangeEndTime}) {
    return (
        <section className='form-section'>
            <h2 className='heading'>Data e hora</h2>
            <div className='input-group'>
                <Input className="half-w" type="date" name="startDate" label="Start date" onChange={onChangeStartDate} value={startDate} required />
                <Input className="half-w" type="date" name="endDate" label="End date" onChange={onChangeEndDate} value={endDate}/>
            </div>
            <div className='input-group'>
                <Input className='half-w' type="time" name="startTime" label="Start time" onChange={onChangeStartTime} value={startTime} required />
                <Input className='half-w' type="time" name="endTime" label="End time" onChange={onChangeEndTime} value={endTime}/>
            </div>
        </section>
    )
}

export default DateAndtime