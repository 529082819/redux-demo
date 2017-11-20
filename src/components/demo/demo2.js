import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button} from 'antd';


export default class Demo2 extends PureComponent{
        render() {
            console.log('Demo2 - Component');
            return (
                <Button>this is Demo2 - Component</Button>
            )
        }
}
