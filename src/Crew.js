import React from 'react';
import { useState } from 'react';

const Crew = () => {
    const [tooLowMessage, setMessage] = useState("")
    const [crewEntry, setCrewEntry] = useState([])
    const [name, setName] = useState("")
    const [dayRate, setDayRate] = useState(0)
    const [crewId, setCrewId] = useState(1)

    let submit = () => {
        setMessage("")
        if (dayRate <= 200) {
            setMessage("Sorry, that Day-Rate is too Low!")
        } else {
            setCrewId(crewId + 1)
            setCrewEntry([...crewEntry, {
                crewId, name, dayRate
            }
            ])
        }
    }

    return (
        <>
            <div className='crewMember' id='crewMember'>
                <h3>Crew Member</h3>
                <div className="nameContainer" id="nameContainer">
                    <p className="nameText">Name</p>
                    <input onChange={(e) => setName(e.target.value)} className="nameInput" id="nameInput"></input>
                </div>
                <div className='rateContainer'>
                    <p className='rateText'>Day-Rate</p>
                    <input onChange={(e) => setDayRate(parseInt(e.target.value))} className="rateInput" id="rateInput"></input>
                    <p className='tooLowText' id='tooLowText'>{tooLowMessage}</p>
                </div>
                <button onClick={submit} className='submitBtn' id='submitBtn'>Submit</button>
            </div>
            <div className='crewList' id='crewList'>
                <table>
                    <tr>
                        <th>Crew Member #</th>
                        <th>Name</th>
                        <th>Day-Rate</th>
                    </tr>
                        {crewEntry.map((e) => (
                            <tr>
                                <td>{e.crewId}</td>
                                <td>{e.name}</td>
                                <td>{e.dayRate}</td>
                            </tr>
                        ))}
                </table>
                <h3 className='total' id='total'>$:{crewEntry.map((e) => (e.dayRate)).reduce((acc, curr) => {
                    return acc + curr
                }, 0)} </h3>
            </div>
        </>
    )

}

export default Crew