var React = require('react');
var request = require('superagent');

var RankingList = require('./ranking_list.js');
var RankingDate = require('./ranking_date.js');
var YoutubePlayer = require('./youtube_player.js');


var RootView = React.createClass({
  getInitialState:function(){
    return {
      ranking_date: '',
      ranking_list: [],
      now_playing_video_id: ''
    };
  },
  componentDidMount:function(){
    // console.log('didMount');
    this.fetchRankingJson();
  },
  fetchRankingJson:function(){
    request.get('/ranking.json')
    .end(function(err, res){
      if (err) { alert(res.text); }
      // console.log(res.body);
      this.setState({ranking_date: res.body.date});
      this.setState({ranking_list: res.body.ranking});
      this.setState({now_playing_video_id: res.body.ranking[0].video_id});
    }.bind(this));
  },
  render:function(){
    // console.log(this.state.now_playing_video_id);
    return (
      <div className="root_view">
        <RankingDate ranking_date={this.state.ranking_date} />
        <YoutubePlayer now_playing_video_id={this.state.now_playing_video_id} />
        <RankingList ranking_list={this.state.ranking_list} />
      </div>
    );
  }
});

module.exports = RootView;