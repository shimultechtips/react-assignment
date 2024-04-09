import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { categoriesUrl, itemsUrl } from '../../Redux/dataBase'

const FetchErrors = ({ errText }) => {
    return (
        <div className='col-12' style={{
            minHeight: "580px",
            textAlign: "center",
        }}>
            <div className='fgColor textColor' style={{
                border: "1px solid gray",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                margin: "10px 0px",
                width: "100%"
            }}>
                <h5 style={{ color: "#A34343" }}>{errText}</h5>
                <Link to={itemsUrl}>
                    <Button color="success" style={{ width: "150px", margin: "5px" }}>Items</Button>
                </Link>
                <Link to={categoriesUrl}>
                    <Button color="success" style={{ width: "150px", margin: "5px" }}>Categories</Button>
                </Link>
                <Button color="secondary" style={{ width: "150px", margin: "5px" }} onClick={() => window.location.reload(false)}>Reload/Refresh</Button>
            </div>
        </div >
    )
}

export default FetchErrors