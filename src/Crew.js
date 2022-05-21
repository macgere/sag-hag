// things to do: make 'over-budget' message work, make delete buttons work

import React from 'react';
import { useState, useEffect } from 'react';
import Call from './Call';

const Crew = () => {
    const [tooLowMessage, setMessage] = useState("")
    const [crewEntry, setCrewEntry] = useState([])
    const [name, setName] = useState("")
    const [dayRate, setDayRate] = useState(0)
    const [crewId, setCrewId] = useState(1)
    const [hours, setHours] = useState("")
    const [callTime, setCallTime] = useState(new Date())
    const [maxBudge, setMaxBudge] = useState(0)
    const [currBudge, setCurrBudge] = useState(0)

    useEffect(
        () => {
            setCurrBudge(crewEntry.map((e) => (e.dayRate)).reduce((acc, curr) => {
                return acc + curr
            }, 0))
        }, 
        [crewEntry]
    )

    let submit = () => {
        setMessage("")
        let hoursNum = parseInt(hours)
        if (dayRate <= 199) {
            setMessage("Sorry, that Day-Rate is too Low!")
        } else if (hoursNum > 12) {
            setMessage("Sorry, that's too many hours for one day!")
        } else if (maxBudge < currBudge + dayRate) {
            setMessage("Sorry, you're Over-Budget!")    
        } else {
            setCrewId(crewId + 1)
            const endTime = new Date(callTime.getTime() + (parseInt(hours) * 3600000))
            setCrewEntry([...crewEntry, {
                crewId, name, hours, endTime, dayRate
                }
            ])
        }
    }

    const deleteCrewById = (id) => {
        const filteredCrew = crewEntry.filter(crew => crew.crewId !== id)
        setCrewEntry(filteredCrew)
    }

    return (
        <>
            <Call setCallTime={setCallTime} callTime={callTime} />
            <h3>Max Budget:</h3>
            <input onChange={(e) => setMaxBudge(e.target.value)} className='maxBudget' id='maxBudget' type="number"></input>
            <h3 className='total' id='total'>SAG Budget for this day: ${currBudge}
            </h3>
            <h3 className='crewTotal' id='crewTotal'>Total Crew on Call: {crewId - 1}</h3>
            <div className='crewMember' id='crewMember'>
                <h3>Crew Member: </h3>
                <div className="nameContainer" id="nameContainer">
                    <p className="nameText">Name</p>
                    <input onChange={(e) => setName(e.target.value)} className="nameInput" id="nameInput"></input>
                </div>
                <div className="hourContainer" id="hourContainer">
                    <p className="hourText">Hours</p>
                    <input onChange={(e) => setHours(e.target.value)} className="hourInput" id="hourInput" type="number"></input>
                </div>
                <div className='rateContainer'>
                    <p className='rateText'>Day-Rate</p>
                    <input onChange={(e) => setDayRate(parseInt(e.target.value))} className="rateInput" id="rateInput" type="number"></input>
                    <p className='tooLowText' id='tooLowText'>{tooLowMessage}</p>
                </div>
                <button onClick={submit} className='submitBtn' id='submitBtn'>Submit</button>
            </div>
            <div className='crewList' id='crewList'>
                <table>
                    <tr>
                        {/* <th>Crew Member #</th> */}
                        <th>Name</th>
                        <th>Hours</th>
                        <th>End Time</th>
                        <th>Day-Rate</th>
                        <th>Remove?</th>
                    </tr>
                    {crewEntry.map((e) => (
                        <tr>
                            {/* <td>{e.crewId}</td> */}
                            <td>{e.name}</td>
                            <td>{e.hours}</td>
                            <td>{e.endTime.toLocaleTimeString()}</td>
                            <td>{e.dayRate}</td>
                            <td><button onClick={() => deleteCrewById(e.crewId)} className='deleteBtn' id='deleteBtn'>X</button></td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    )

}

export default Crew