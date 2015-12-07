let React = require('react');
let IScroll = require('iscroll');
let allItems = require('./data');
let allNames = [];
let len = allItems.length;
for(let i=0;i<len;i++){
  allNames.push(allItems[i].name);
}
let musicList = [];
for (let i=0;i<7;i++){
  musicList[i] = new Audio();
  musicList[i].src = baseURL+(i+1)+".mp3";
}
let doubleItems = allNames.concat(allNames);
module.exports = React.createClass({
  componentDidMount(){
    let that = this;
    let myScroll = new IScroll('#scrollWrap',{
      snap: 'li',
      bounce:false,
      mouseWheel: true
    });
    myScroll.goToPage(0,len/2,0);
    myScroll.on('scrollEnd', function(){
      let currentPageY = this.currentPage.pageY;
      if (currentPageY<len/2) {
        currentPageY+=len;
        myScroll.goToPage(0, currentPageY,0);
      }
      if (2*len-currentPageY<len) {
        currentPageY-=len;
        myScroll.goToPage(0,currentPageY ,0);
      }
      that.setState({
        currentNum:currentPageY,
      });  
    });
  },
  getInitialState(){
    return{
      lis:doubleItems,
      currentNum:len/2,
      playBgm:true,
      hideAuthor:true,
      hideEwm:true
    }
  },
  playMusic(num){
    musicList[num].play();
  },
  componentWillReceiveProps(){
    this.refs.bgm.play();  
  },
  changeMusic(){
    if (this.state.playBgm) {
      this.setState({
        playBgm:false
      });
      this.refs.bgm.pause();
    }
    else{
      this.setState({
        playBgm:true
      });
      this.refs.bgm.play();
    }
  },
  changeAuthor(){
    if (this.state.hideAuthor) {
      this.setState({
        hideAuthor:false,
        hideEwm:true
      });
    }
    else{
      this.setState({
        hideAuthor:true,
        hideEwm:true
      });
    }
  },
  changeEwm(){
    if (this.state.hideEwm) {
      this.setState({
        hideAuthor:true,
        hideEwm:false
      });
    }
    else{
      this.setState({
        hideAuthor:true,
        hideEwm:true
      });
    }
  },
  render(){
    let that = this,
        num = that.state.currentNum + 5,
        h = num%len,
        height = (allItems[h].num-1)*2 + 'px',
        highStyle = {transform:`translate3d(0,${height},0)`,WebkitTransform:`translate3d(0,${height},0)`},
        hn = allItems[h].num,
        hs = String(hn),
        rankClass="",
        initLis = that.state.lis.map(function (data,index) {
          var isFocus = (index == num);
          return (
            <li key={index} className={isFocus?'isFocus':''}>{data}</li>
          );
        }),
        isHideAuthor = {display:this.state.hideAuthor?'none':'block'},
        isHideEwm = {display:this.state.hideEwm?'none':'block'},
        musicClass = this.state.playBgm?'music-btn-on':'music-btn';
    if (hs.length == 1) {hs = '00' + hs}
    if (hs.length == 2) {hs = '0' + hs}
    switch(true){
      case hn==1:
        rankClass = "rank1";
        that.playMusic(0);
        break;
      case hn==2:
        rankClass = "rank2";
        that.playMusic(1);
        break;
      case hn==3:
        rankClass = "rank3";
        that.playMusic(2);
        break;
      case hn<30:
        rankClass = "rank4";
        that.playMusic(3);
        break;
      case hn<50:
        rankClass = "rank5";
        that.playMusic(4);
        break;
      case hn<80:
        rankClass = "rank6";
        that.playMusic(5);
        break;
      default:
        rankClass = "rank7";
        that.playMusic(6);
        break;
    }
    return(
      <section className="section2">
        <img src={baseURL+"12.png"} className="main-top"/>
        <audio src={baseURL+"bgm.mp3"} ref="bgm" loop="loop"/>
        <div className="nav-border" ref="navBorder" id="scrollWrap">
          <ul className="navs">
            {initLis}
          </ul>
          <img src={baseURL+"mayer.png"} className="mayer"/>
        </div>
        <img src={baseURL+"13.png"} className="focus-img"/>
        <div className={musicClass} onClick={this.changeMusic}/>
        <img src={baseURL+"16.png"} className="scoll-info"/>
        <img src={baseURL+"17.png"} className="author-names" onClick={this.changeAuthor}/>
        <img src={baseURL+"18.png"} className="ewm-img" onClick={this.changeEwm}/>
        <img src={baseURL+"21.png"} className="ewm-big" style={isHideEwm}/>
        <div className="authors" style={isHideAuthor}>
          <div className="line"><b>策划：</b>王茜</div>
          <div className="line"><b>设计：</b>阿毛</div>
          <div className="line"><b>制作：</b>张兆翔</div>
          <div className="line"><b>小编寄语：</b>虽然离全面实现“带头大哥”的道路还有距离，但是我们还是坚信未来的未来祖国一定会更加的繁荣富强的！</div>
        </div>
        <div className="rank">
          <p className={`rn rn1 num${hs[0]}`}></p>
          <p className={`rn rn2 num${hs[1]}`}></p>
          <p className={`rn rn3 num${hs[2]}`}></p>
        </div>
        <div className="detail">
          <p className="d-title">{allItems[h].name}</p>
          <p className="d-content">{allItems[h].des}</p>
        </div>
        <div className="zhu">
          <img src={baseURL+"2.jpg"} className="zhu-1"/>
          <div className="zhu-2" style={highStyle}>
            <div className={"person "+rankClass}></div>
            <img src={baseURL+"14.png"}/>
          </div>
        </div>
      </section>
    )
  }
})