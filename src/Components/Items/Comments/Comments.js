import React, { Component } from 'react';
import Comment from './Comment/Comment';
import CommentForm from '../../Forms/CommentForm/CommentForm';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

const mapStateToProps = state => {
    return {
        token: state.token
    }
}


class Comments extends Component {
    render() {
        const { comments, item } = this.props;
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

        let commentForm = null;
        if (this.props.token != null) {
            commentForm = <CommentForm />
        } else {
            commentForm = (
                <div>
                    <Link to="/login">
                        <Button color="danger" className='m-2'>Login To Comment</Button>
                    </Link>
                </div>
            )
        }

        return (
            <div>
                <h5 style={{ fontWeight: 'bold' }}>Comments:</h5>

                {commentForm}

                <div className='m-2' style={{ border: "1px solid gray", borderRadius: "5px" }}>
                    {loadComment}
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps)(Comments);
