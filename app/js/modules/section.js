let React = require('react');
let Page = require('./page.js');
module.exports = React.createClass({
  getInitialState(){
    return{
        playBgm:false
      }
  },
  playMusic(){
    this.setState({
      playBgm:true
    });
  },
  render(){
    return(
      <div className="main">
        <Page playBgm={this.state.playBgm}/>
      </div>
    )
  }
});