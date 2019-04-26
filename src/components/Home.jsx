import React, { Component } from "react";
import { connect } from "react-redux";

import Welcome from "./Welcome";
import Game from "./Game";

class Home extends Component{

  state = {
    imageUrls: [
      {name: 'robot', src: 'images/robot.png'},
      {name: 'spider', src: 'images/spider.png'},
      {name: 'worm', src: 'images/worm.png'},
      {name: 'mermaid', src: 'images/mermaid.png'},
      {name: 'pigeon', src: 'images/pigeon.png'},
      {name: 'bg', src: 'images/bg.svg'},
      {name: 'button', src: 'images/button.svg'},
      {name: 'star', src: 'images/star.png'},
      {name: 'title', src: 'images/title.png'},
      {name: 'cc', src: 'images/cc_foundation.png'},
      {name: 'kf', src: 'images/kf_logo.png'},
      {name: 'details_sprite', src: 'images/details_sprite.png'},
      {name: 'twitter_logo', src: 'images/twitter_logo.svg'},
      {name: 'fb_logo', src: 'images/fb_logo.svg'},
    ],
    images: []
  };

  componentWillMount() {
    this.state.imageUrls.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc.src;
      img.onload = () => {
        this.setState((state) => {
          const {images} = state;
          images.push({...imgSrc});
          return ({ images });
        });
      };
    });

  };

  render () {
    let content;
    const { game } = (this.props);
    const { images, imageUrls } = this.state;

    if (game.started) {
      content = <Game />;
    } else {
      content = <Welcome />;
    }


    if (images.length !== imageUrls.length) {
      return (
        <div className="loader">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return(
        <div className="container-fluid">
          <div className="main-content">
            <div className="row">
              <div className="col">
                <h1 className="main-title">Еко-екзамен</h1>
                {content}
              </div>
            </div>
          </div>
          <div className="details-sprite c01" />
          <div className="details-sprite c02" />
          <div className="details-sprite c03" />
          <div className="details-sprite c04" />
          <div className="details-sprite c05" />
          <div className="details-sprite c06" />
          <div className="details-sprite c07" />
          <div className="details-sprite c08" />
          <div className="details-sprite c09" />
          <div className="details-sprite c10" />
          <div className="details-sprite c11" />
          <div className="details-sprite c12" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({ game: state.game });

export default connect(
  mapStateToProps,
  undefined
)(Home);
