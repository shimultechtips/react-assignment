import React, { Component } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectedItemFunc } from '../../../Redux/actionCreators';
import { itemsUrl } from '../../../Redux/dataBase';

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedItemFunc: item => dispatch(selectedItemFunc(item)),
    }
};

class Item extends Component {

    handleButtonClick = () => {
        const { selectedItemFunc, item } = this.props;
        selectedItemFunc(item);
    };

    render() {

        const { item } = this.props;
        let stock;

        if (item.remainAmount === 0) {
            stock = (<div>
                <p style={{ fontWeight: "bold" }} className='text-danger'>Out Of Stock!</p>
            </div>);
        } else if (item.remainAmount <= 5) {
            stock = (<div>
                <p style={{ fontWeight: "bold", color: "orangered" }}>Low On Stock! Only {item.remainAmount} Items Left!</p>
            </div>);
        } else {
            stock = (
                (<div>
                    <p style={{ fontWeight: "bold" }} className='text-success'>Stock Available!</p>
                </div>)
            );
        }

        return (
            <div className='p-2'>
                <Card style={{ width: '18rem', border: "1px solid gray" }}>
                    <img alt="Sample" src={item.image} style={{ borderRadius: "5px 5px 0 0", aspectRatio: "16/9", objectFit: 'cover' }} />
                    <CardBody>
                        <CardTitle tag="h5">
                            {item.title}
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Category : {item.categoryName}
                        </CardSubtitle>
                        <CardText>
                            {item.details}
                        </CardText>
                        <CardText>
                            Price : {item.price} <span style={{ fontSize: "22px" }}>&#2547;</span>
                        </CardText>
                        {stock}
                        <Link to={itemsUrl + "/" + item.id}>
                            <Button color="primary" style={{ width: "100%" }} onClick={this.handleButtonClick}>See Details</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);