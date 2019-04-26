import React, { Component } from "react";
import { connect } from "react-redux";
import { startGame } from '../actions/game';
import Modal from './Modal';

class Welcome extends Component{
  state = {
    modal: null
  };

  showHeroInfo = (id) => {
    const elm = this.props.heroes.filter((el) => {
      return (el.id === id);
    });

    this.setState(() => ({ modal: elm[0] }));
    window.scrollTo(0, 0);
  };

  showGameInfo = (event) => {
    event.preventDefault();
    this.setState(() => ({ modal: this.props.gameInfo }));
    window.scrollTo(0, 0);
  };

  hideModalInfo = (event) => {
    event.preventDefault();
    this.setState(() => ({ modal: null }));
  };

  render () {
    let modal = null;
    if(this.state.modal){
      modal = (
        <Modal show wrapperClass="scroll">
          <div className="col-12">
            <h1 className="title">{this.state.modal.title}</h1>
          </div>
          {this.state.modal.image && (
            <div className="col-12 col-sm-6" style={{textAlign: 'center'}}>
              <img src={this.state.modal.image} className={`img-fluid`} alt="" style={{maxWidth: '235px', margin: '0 auto'}} />
            </div>
          )}
          <div className={`col-12 ${this.state.modal.image ? `col-sm-6`: `` }`}>
            <div className="content" dangerouslySetInnerHTML={{__html: this.state.modal.text}} />
          </div>
          <div className="col-12">
            <div className="close-modal">
              <a className="button" href="" onClick={this.hideModalInfo}>Сховати</a>
            </div>
          </div>
        </Modal>
      );
    }

    return (
      <div>
        {modal}
        <p className="main-desc">
          <span>Важко дихати від смогу?</span> На рибалці впіймали пластикову пляшку? У лісі доводилося шукати гриби під кульками? <span>Так далі не піде!</span> Скликається спеціальна <span>комісія</span>, що <span>проведе екзамен на екологічність</span> населення. До неї входять:
        </p>
        <div className="row main-hero-row">
          {this.props.heroes.map((el) => {
            return(
              <div className="col-6 col-md" key={el.id}>
                <div className={`main-hero-item ${el.id}`} onClick={() => this.showHeroInfo(el.id)}>
                  <img src={el.image} className={`img-fluid`} alt="" />
                  <div className="name">{el.title}</div>
                  <div className="desc" dangerouslySetInnerHTML={{ __html: el.desc }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="animation-after-heroes">
          <p className="main-desc">Квіз-екзамен від цієї високоповажної комісії покаже, <span>наскільки ви екологічні</span>. Почнемо?</p>

          <button type="button" className="button" onClick={this.props.startGameClick}>
            Почати
          </button>
          <a href="#" className="game-rules" onClick={this.showGameInfo}>?</a>
        </div>
      </div>
    );

  }
};

const mapStateToProps = state => ({ heroes: state.game.heroes, gameInfo: state.game.gameInfo });

const mapDispatchToProps = dispatch => ({
  startGameClick: () => {
    window.scrollTo(0, 0);
    return dispatch(startGame());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
