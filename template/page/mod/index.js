<%if(isWeb === true){%>
import React,{Component} from 'react';
<%}else{%>
import {Component,createElement} from 'rax';
import {View} from 'rax-components';
import Style from '../index.less';
<%}%>
class <%=classedName%> extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }
    render() {
        return (
        <%if(isWeb === true){%>
        <div className="<%= classname %>-page">
        <%= pname %> hello world
        </div>
        <%}else{%>
        <View style={Style.<%= classname %>Page}>
        <%= pname %> hello world
        </View>
        <%}%>

    );
    }
    componentDidMount(){}
}

export default <%=classedName%>;

