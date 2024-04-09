import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { selectedCategoryFunc } from '../../../Redux/actionCreators';
import { categoriesUrl } from '../../../Redux/dataBase';
import '../../../Stylesheets/AppInfo.css'

const mapStateToProps = state => {
    return {
        selectedCategory: state.selectedCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedCategoryFunc: category => dispatch(selectedCategoryFunc(category)),
    }
};

class Category extends Component {

    handleButtonClick = () => {
        const { selectedCategoryFunc, category } = this.props;
        selectedCategoryFunc(category);
    };

    render() {
        const { category } = this.props;
        return (
            <div className='p-2 col-12 col-sm-6'>
                <Card style={{ border: "1px solid gray" }}>
                    <img alt="Sample" src={category.image} style={{ borderRadius: "5px 5px 0 0", aspectRatio: "16/9", objectFit: 'cover' }} />
                    <CardBody>
                        <CardTitle tag="h5">
                            {category.title}
                        </CardTitle>
                        <CardText>
                            {category.details}
                        </CardText>
                        <Link to={categoriesUrl + "/" + category.title}>
                            <Button color="primary" style={{ width: "100%" }} onClick={this.handleButtonClick}>Browse</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Category);