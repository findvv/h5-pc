var React = require('react');
var Loader = require('./preload.js').resLoader;
var allImgs = [
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/18.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/15.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/20.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/2.jpg',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/12.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/17.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/14.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/19.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/16.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/21.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/13.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/7.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/mayer.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/number.png',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/n1.jpg',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/n2.jpg',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/n3.jpg',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/n4.jpg',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/n5.jpg',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/n6.jpg',
              'http://news.sohu.com/upload/shuzizhidaozzx/public/img/n7.jpg'
              ];
module.exports = React.createClass({
  getInitialState:function(){
    return{
      progress:'0%',
      show:true
    }
  },
  componentDidMount:function(){
    let that = this,
        loader = new Loader({
        resources: allImgs,
        onStart: function(total) {},
        onProgress: function(current, total) {
          var percent = parseInt(current / total * 100) + '%';
          that.setState({
            progress:percent
          });
        },
        onComplete: function(total) {
          that.props.hideLoading();
          that.setState({
            show:false
          });
        }
      });
    let loadImg = new Image();
    loadImg.src = baseURL+"loading.jpg";
    loadImg.onload = function() {
      loader.start();
    }  
  },
  render:function(){
    let style = {display:this.state.show?'block':'none'};
    return(
      <div className="loading" style={style}>
        <p>{this.state.progress}</p>
        <div className="loadingImg"></div>
      </div>
    )
  }
});
