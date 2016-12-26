var pageJson = require('./package.json');
module.exports = {
  name: pageJson.name,
  version: '@branch@',
  options: {
     <%if(isWeex){%>
    //以amd的模式忽略模块 也支持可以数组['rax','rax-components'] 可通过xxx平台合成忽略链接
    externalModules: {
      rax: 'rax',
          'rax-components': 'rax-components',
      //'universal-env': 'universal-env'
    }
    <%}else{%>
    isWeb: true,
    commonModules: ['react','react-dom']
    <%}%>
  }
};
