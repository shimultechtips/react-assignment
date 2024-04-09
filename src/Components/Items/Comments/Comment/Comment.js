import React from 'react';
import dateFormat from "dateformat";

const Comment = ({ comment }) => {
    return (
        <div className='pe-2 ps-2 mt-2 mb-3'>
            <div className='p-2 border w-100 h-100'>
                <h6 style={{ fontSize: "18px" }}> {comment.userName}</h6>
                <p>{comment.comment}</p>
                <p>{dateFormat(comment.addTime, "dS mmmm yyyy, h:MM TT")}</p>
            </div>
        </div>
    )
}

export default Comment;