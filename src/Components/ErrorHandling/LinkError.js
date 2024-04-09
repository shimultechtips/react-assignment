import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { categoriesUrl, itemsUrl } from '../../Redux/dataBase'

const LinkError = ({ errText }) => {
    return (
        <div style={{ minHeight: "580px" }}>
            <div className='col-12 bgColor fgColor' style={{
                border: "1px solid gray",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                margin: "10px 0px",
                textAlign: "center",
            }}>
                <h4>You Haven't Selected Any {errText} Or Visited An Invalid Link. Use Below Links To Browse Items Or Categories! </h4>
                <Link to={itemsUrl}>
                    <Button color="success" style={{ width: "120px", margin: "5px" }}>Items</Button>
                </Link>
                <Link to={categoriesUrl}>
                    <Button color="success" style={{ width: "120px" }}>Categories</Button>
                </Link>
            </div>
        </div>
    )
}

export default LinkError