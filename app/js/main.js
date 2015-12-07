var React = require('react'),
    ReactDom = require('react-dom'),
    Loading = require('./modules/loading.js'),
    Main = require('./modules/section.js');
var App = React.createClass({
  getInitialState:function(){
    return{
      showMain:false
    }
  },
  hideLoading:function(){
    this.setState({
      showMain:true
    });
  },
  render:function(){
    return(
      <div className="wrap">
        <Loading hideLoading={this.hideLoading}/>
        <Main showMain={this.state.showMain}/>
      </div>
    )
  }
});
ReactDom.render(<App />,document.getElementById('all'));