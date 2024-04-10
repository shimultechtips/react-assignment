import React, { Component } from 'react'
import { connect } from 'react-redux';
import { success } from "../../notify";
import { Button } from "reactstrap"
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        items: state.items,
        itemLoading: state.itemLoading,
        itemErr: state.itemErr,
        selectedItem: state.selectedItem,
        selectedCategory: state.selectedCategory,
        comments: state.comments,
        commentLoading: state.commentLoading,
        categoryLoading: state.categoryLoading,
        commentErr: state.commentErr,
        categoryErr: state.categoryErr
    }
}

class Home extends Component {
    componentDidUpdate() {
        if (!this.props.itemLoading && !this.props.commentLoading && !this.props.categoryLoading && !this.props.categoryErr && !this.props.itemErr && !this.props.commentErr) {
            success("Database Updated...", true);
        }
    }
    render() {
        return (
            <div >
                <div>
                    <div className='p-2 m-2 d-flex align-items-center' style={{ height: "400px", backgroundColor: "white", textAlign: "center", borderRadius: "10px" }}>
                        <div>
                            <h1>The Great Ever Photo Gallary</h1>
                            <p style={{ fontSize: "20px", color: "grey" }}>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.
                            </p>
                            <Link to="/items">
                                <Button color="primary" className='m-2'>Browse Items</Button>
                            </Link>
                            <Link to="/categories">
                                <Button color="secondary" className='m-2'>Browse Categories</Button>
                            </Link>
                        </div>
                    </div>
                    <div className='p-2 m-2 d-flex align-items-center' style={{ height: "600px", backgroundColor: "white", textAlign: "center", borderRadius: "10px" }}>

                    </div>
                    <div className='p-2 m-2 d-flex align-items-center' style={{ height: "600px", backgroundColor: "white", textAlign: "center", borderRadius: "10px" }}>


                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home);