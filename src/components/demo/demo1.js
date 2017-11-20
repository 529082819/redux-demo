import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button} from 'antd';
import PropTypes from 'prop-types'

import {Map,is} from 'immutable'

const a = {d:1,c:3}
const b = {d:2}
console.log(is(a.b))

let map1 = Map({a:1, b:1, c:1});
let map2 = Map({a:1, b:1, c:2});
console.log(is(Map(a),Map(b)))
console.log(is(map1,map2))

class Demo1 extends React.Component{
        shouldComponentUpdate(nextProps, nextState) {
            const prevProps = Map(this.props);
            const nextProps2 = Map(nextProps);

            console.log('this',this.props)
            console.log('nextProps',nextProps2)
            console.log(is(Map(prevProps),Map(nextProps2)))
            console.log(is(prevProps,nextProps2));
            return !is(prevProps,nextProps2);
        }

        render() {
            console.log('Demo1 - Component');
            return (
                <Button>this is Demo111 - Component</Button>
            )
        }
}
export default Demo1;
