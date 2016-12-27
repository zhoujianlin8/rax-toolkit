<%if(isWeb === true){%>
import React,{Component} from 'react';
import './index.less';
<%}else{%>
import {Component,createElement} from 'rax';
import {View} from 'rax-components';
import Style from './index.less';
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
            <div className="<%= classname %>-component">
                <%= classname %> hello world
            </div>
            <%}else{%>
            <View style={Style.<%= classname %>Component}>
            <%= classname %> hello world
            </View>
        <%}%>

        );
    }
    componentDidMount(){}
}

export default <%=classedName%>;

