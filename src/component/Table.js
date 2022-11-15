import React,{useState,useEffect,useRef} from 'react'
import axios from "axios"
import Tranection from './Tranection';

export default function Table() {
    const ref = useRef()
    const [type,setType] = useState("");
    const debit = ()=>{
        setType("Debit")
    }
    const credit = ()=>{
        setType("Credit")
    }
    const ammount = []
    const [data,setdata] = useState(ammount)
    const [transaction,setTransaction] = useState({
        ammount: "",desc: ""
    })
    let runningammount= 0
    const saveData = ()=>{
        let ammount = transaction.ammount
        let desc= transaction.desc
        if(data.length===0){
            runningammount = parseInt(transaction.ammount)
        }
        else if(type==="Credit"){
            runningammount = parseInt(data[data.length-1].runningammount)+parseInt(transaction.ammount)
            
        }else{
            runningammount = parseInt(data[data.length-1].runningammount)-parseInt(transaction.ammount)

        }
        console.log(runningammount)
        
        axios.post("http://localhost:5000/postdata",{ammount,desc,type,runningammount}).then((response)=>{
            setdata(data.concat(response.data))
        }).catch((err)=>{
            console.log(err)
        })
        ref.current.click()
    }
    

    useEffect(()=>{
        axios.get("http://localhost:5000/getData").then((response)=>{
            setdata(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    const handleData = (e)=>{
        setTransaction({...transaction,[e.target.name]: e.target.value})
    }
    return (
        <>
            {/* <!-- Button trigger modal --> */}



            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <p >New Transaction</p>
                                <form action="">
                                    <div className='d-flex' >
                                        <p className='mt-4' >Transaction Type</p>
                                        <div className="d-grid gap-2 mx-4"  >
                                            <button type="button" style={{ width: "18rem" }} onClick={credit} className="btn btn-outline-secondary">credit</button>

                                            <button type="button" style={{ width: "18rem" }} onClick={debit} className="btn btn-outline-secondary">Debit</button>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Ammount</label>
                                        <input type="text" name="ammount" className="form-control" onChange={handleData} id="exampleFormControlInput1" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                        <input className="form-control" onChange={handleData}  name="desc" id="exampleFormControlTextarea1" rows="3"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={saveData} >Save</button>
                            <button type="button" className="btn btn-secondary" ref={ref} data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-4' >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Office Transactions</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Transaction</button></th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Date</td>

                            <td>Description</td>
                            <td>credit</td>
                            <td>Debit</td>
                            <td>running Balance</td>

                        </tr>
                        {data.map((e)=>{
                            return <Tranection key={e._id} tranection={e}/>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
