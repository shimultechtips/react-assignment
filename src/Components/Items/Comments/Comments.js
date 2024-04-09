import React from 'react'
import Comment from './Comment/Comment'
import CommentForm from '../../Forms/CommentForm/CommentForm';

const Comments = ({ comments, item }) => {

    let loadComment = [];

    let reverseComment = [...comments].reverse();

    reverseComment.forEach(comment => {
        if (comment.itemId === item.id) {
            loadComment.push(
                <Comment comment={comment} key={comment.id} />
            );
        }
    });

    if (loadComment.length === 0) {
        loadComment = (
            <div><p style={{ fontWeight: "bold", padding: "5px" }}>Be The First One To Comment On This Item.</p></div>
        )
    }

    return (
        <div>
            <h5 style={{ fontWeight: 'bold' }}>Comments:</h5>
            <CommentForm />
            <div className='m-2' style={{ border: "1px solid gray", borderRadius: "5px" }}>
                {loadComment}
            </div>

        </div>
    );
}
export default Comments