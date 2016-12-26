<%if(isWeb=== true){%>
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import <%=classedName%> from './mod/index';
ReactDOM.render(<<%=classedName%> />, document.getElementById('container'));
<%}else{%>
import {createElement,render} from 'rax';
import Index from './mod/index';
render(<Index />);
<%}%>
