import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCount, addPerson, deletePerson, refresh } from '../../redux/actions/helloAction';
import {Button, Table} from 'antd';
import PropTypes from 'prop-types';
import './index.scss';

let id = 0;

class IndexPage extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
              title: 'id',
              dataIndex: 'id',
              key: 'id',
            }, {
              title: 'name',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: 'age',
              dataIndex: 'age',
              key: 'age',
            }, {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <a href="javascript:void(0);" style={{color: 'red'}} onClick={this.delete.bind(this, record.id)}>delete</a>
              ),
            }]
        };
        this.add = this.add.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addCount = this.addCount.bind(this);
    }

    render () {
    	console.log('index--this.props',this.props)
        const { count, list, loaded } = this.props;
        return (
            <div id="reactPage" style={{padding: '0px 10px'}}>
                <Button type="primary" onClick={this.add}>add person</Button>
                <Table columns={this.state.columns} dataSource={list} pagination={false}  rowKey={record => record.id} ></Table>

                <p><Button onClick={this.refresh}>异步加载数据</Button><span>{loaded}</span></p>
                <br />
                <span>show me the current count : {count || 0}</span>
                <div><Button onClick={this.addCount}>Add Count</Button></div>
            </div>
        );
    }

    addCount() {
        this.props.addCount();
    }

    add() {
        this.props.addPerson({"id": ++id, "name": "tome", age: 25});
    }

    delete(index) {
        console.log(index)
        this.props.deletePerson(index);
    }

    refresh() {
        this.props.refresh();
    }

};

IndexPage.propTypes = {
	count : PropTypes.number,
    list : PropTypes.array,
    loaded : PropTypes.string
}

function mapStateToProps(state) {
    return {
        count : state.count,
        list : state.personList.personList,
        loaded : state.personList.loaded
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addPerson: bindActionCreators(addPerson, dispatch),
        deletePerson: bindActionCreators(deletePerson, dispatch),
        refresh: bindActionCreators(refresh, dispatch),
        addCount: bindActionCreators(addCount, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);



