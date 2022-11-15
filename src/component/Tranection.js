import React from 'react'

export default function Tranection(props) {
    return (
        <tr>
            <td>{new Date(props.tranection.createAt).toDateString()}</td>

            <td>{props.tranection.desc}</td>
            {props.tranection.type==="Credit"?<td>{props.tranection.ammount}</td>:<td>---</td>}
            {props.tranection.type==="Debit"?<td>{props.tranection.ammount}</td>:<td>---</td>}
            <td>{props.tranection.
runningammount}</td>

        </tr>
    )
}
