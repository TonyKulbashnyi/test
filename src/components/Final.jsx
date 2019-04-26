import React, { Component } from "react";
import { connect } from "react-redux";
import { newGame } from "../actions/game";

class Final extends Component{
  state = {
    message: null,
    winner: null
  };

  componentDidMount () {
    this.getMessage();
  }

  shareFb = (event) => {
    event.preventDefault();

    FB.ui(
      {
        method: 'share',
        href: window.location.href,
        quote: `${this.stripTags(this.state.message.title)}\n${this.stripTags(this.state.message.content)}`,
      });
  };

  getMessage = () => {
    const { votes, finalMessages } = this.props.game;
    let message;
    const eco = [];
    let ecoSum = 0;
    let noneco = null;
    const nonecoLimit = 7;
    let winner = {};
    for (var item in votes) {
      if(item !== 'noneco'){
        eco.push({id: item, value: votes[item]});
      } else {
        noneco = votes[item];
      }
    }

    eco.sort(function (a, b) {
      return b.value - a.value;
    });

    eco.map((i) => {
      ecoSum += parseInt(i.value);
    });

    if( (ecoSum > noneco) && (noneco < nonecoLimit) ){
      winner = eco[0];
    } else {
      winner.id = 'noneco';
    }

    message = finalMessages.filter((el) => {
      if(el.id === winner.id){
        return el;
      }
    });

    if(message.length > 0) {
      this.setState(() => ({message: message[0], winner}));
    }
  };

  stripTags = (el) => el.replace(/(<([^>]+)>)/ig,"");

  render () {
    let heroRow = null;
    let messageRow = null;
    let titleRow = null;
    let newGameTitle = 'Ще раз';
    let hero;
    const { heroes } = this.props.game;

    const { message, winner } = this.state;

    if(winner){
      hero = heroes.filter((el) => {
        if(el.id === winner.id){
          return el;
        }
      });
      if(hero.length > 0){
        hero = hero[0];
        heroRow = (
          <div className="col-12 col-md-5" style={{textAlign: 'center'}}>
            <img src={hero.image} width={320} className="img-fluid" />
          </div>
        );
      } else {
        newGameTitle = 'Перескласти';
        heroRow = (
          <div className="col-12 col-md-5" style={{textAlign: 'center'}}>
            <div className="details-sprite c06" />
          </div>
        );
      }
    }

    if(message){
      messageRow = (
        <div className="col-12 col-md-7 desc">
          <div dangerouslySetInnerHTML={{ __html: message.content }} />
          <div className="social-wrapper">
            <a target="_blank" onClick={this.shareFb} rel="noopener noreferrer" href="" className="soc-icon">
              <img src="/images/fb_logo.svg" width={20} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${this.stripTags(message.title)}`} className="soc-icon">
              <img src="/images/twitter_logo.svg" width={40} />
            </a>
          </div>
          <div className="row">
            <div className="col-12" style={{marginTop: '20px', textAlign: 'center'}}>
              <p className="sponsor-desc">Створено Благодійною організацією «Благодійним Фондом "Klitschko Foundation"» за підтримки Фундації «Coca-Cola»</p>
              <img src="/images/kf_logo.png" height={50} style={{marginRight: '30px'}} />
              <img src="/images/cc_foundation.png" height={50} />
            </div>
            <div className="col-12" style={{marginTop: '20px'}}>
              <button type="button" className="button" onClick={this.props.newGameAction}>
                {newGameTitle}
              </button>
            </div>
          </div>
        </div>
      );
      titleRow = (
        <div className="col-12 title">{message.title}</div>
      );
    }

    return(
      <div className="row final-content">
        {titleRow}
        {heroRow}
        {messageRow}
      </div>
    );
  }
}

const mapStateToProps = state => ({ game: state.game });

const mapDispatchToProps = dispatch => ({
  newGameAction: () => {
    window.scrollTo(0, 0);
    return dispatch(newGame());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Final);
