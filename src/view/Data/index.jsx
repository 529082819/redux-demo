import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let id = 0;

class DataPage extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const { count, list } = this.props;
        const str = JSON.stringify(list);
        return (
            <div >
                <h2>List:   <span style={{color:'red'}}>{str}</span></h2>
                <h2>Count:  <span style={{color:'red'}}>{count}</span></h2>
            </div>
        );
    }

};

DataPage.propTypes = {
	count : PropTypes.number,
    list : PropTypes.array,
}

function mapStateToProps(state) {
    return {
        count : state.count,
        list : state.personList.personList,
    }
}
function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(DataPage);



