import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { addCount, addPerson, deletePerson, refresh } from '../../redux/actions/helloAction';

class AboutPage extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {};
        this.count = this.count.bind(this);
    }

    count(){
        const { dispatch } = this.props;
        dispatch(addCount());
    }

    render () {
        console.log('about this.props:', this.props )
        const { count, list } = this.props;
        return (
            <div >
                <h2>改变Count的值:{count}</h2>
                <Button type="primary" onClick={this.count}>add count</Button>
            </div>
        );
    }

};

AboutPage.propTypes = {
	count : PropTypes.number,
    list : PropTypes.array,
}

function mapStateToProps(state) {
    return {
        count : state.count,
        list : state.personList.personList,
    }
}
export default connect(mapStateToProps)(AboutPage);

