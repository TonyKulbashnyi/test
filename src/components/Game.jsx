import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestion, setVote } from "../actions/game";
import Final from "./Final";

class Game extends Component{
  componentWillMount() {
    this.props.getQuestionAction();
  };

  onAnswerSelect = (event) => {
    event.preventDefault();
    const {affect, value} = event.currentTarget.dataset;

    this.props.setVoteAction(affect, value);
    this.props.getQuestionAction();
    window.scrollTo(0, 0);
  };

  render () {
    let content = null;
    const { currentQuestion, final } = this.props.game;

    if(currentQuestion){
      content = (
        <div className="question-content">
          <div className="title">{currentQuestion.title}</div>
          <ul>
            {currentQuestion.answers.map((el) => (
              <li key={el.title}>
                <a href="#" onClick={this.onAnswerSelect} data-affect={el.affect} data-value={el.value}>{el.title}</a>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    if(final){
      content = <Final />;
    }

    return(
      <div>{content}</div>
    );
  }
}

const mapStateToProps = state => ({ game: state.game });

const mapDispatchToProps = dispatch => ({
  getQuestionAction: () => dispatch(getQuestion()),
  setVoteAction: (affect, value) => dispatch(setVote(affect, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
