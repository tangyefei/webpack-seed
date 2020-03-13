import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'


class MyComponent  extends React.Component {
  render() {
    return <div>hello</div>
  }
}

ReactDOM.render(
  <MyComponent/>,
  document.getElementById('root')
)
