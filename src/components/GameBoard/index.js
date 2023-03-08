import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class GameBoard extends Component {
  state = {
    playerChoice: '',
    opponentChoice: '',
    playingBoard: false,
    score: 0,
    result: '',
  }

  handleValue = event => {
    const {playingBoard} = this.state
    const playerChoice = event.target.alt
    const opponentChoice = this.getComputerChoice()
    console.log(playerChoice)
    this.setState({playerChoice, opponentChoice})

    if (playerChoice === opponentChoice) {
      this.setState({result: 'IT IS DRAW'})
    } else if (
      (playerChoice === 'ROCK' && opponentChoice === 'SCISSORS') ||
      (playerChoice === 'PAPER' && opponentChoice === 'ROCK') ||
      (playerChoice === 'SCISSORS' && opponentChoice === 'PAPER')
    ) {
      this.setState({result: 'YOU WIN'})
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      this.setState({result: 'YOU LOSE'})
      this.setState(prevState => ({score: prevState.score - 1}))
    }
    this.setState({playingBoard: !playingBoard})
  }

  getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    return choicesList[randomIndex].id
  }

  playAgain = () => {
    const {playingBoard} = this.state
    this.setState({playingBoard: !playingBoard})
  }

  renderResultCard = () => {
    const {playerChoice, opponentChoice, score, result} = this.state
    const playerChoiceImage = choicesList.filter(
      eachItem => eachItem.id === playerChoice,
    )
    const opponentChoiceImage = choicesList.filter(
      eachItem => eachItem.id === opponentChoice,
    )
    console.log(playerChoiceImage)
    console.log(opponentChoiceImage)

    const playerImage = playerChoiceImage.map(eachItem => eachItem.imageUrl)
    const opponentImage = opponentChoiceImage.map(eachItem => eachItem.imageUrl)

    return (
      <>
        <div className="result-button-container">
          <div className="result-container">
            <div className="result">
              <p className="result-para">You</p>
              <img src={playerImage} alt="your choice" className="image-size" />
            </div>
            <div className="result">
              <p className="result-para">Opponent</p>
              <img
                src={opponentImage}
                alt="opponent choice"
                className="image-size"
              />
            </div>
          </div>
          <p className="result-display">{result}</p>
          <button
            type="button"
            className="play-again-button"
            onClick={this.playAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </>
    )
  }

  renderScoreContainer = () => {
    const {score} = this.state
    return (
      <div className="score-container">
        <div className="header-container">
          <h1 className="heading-para">Rock Paper Scissors</h1>
        </div>
        <div className="score-display">
          <p className="score-head">score</p>
          <p style={{fontFamily: 'Roboto'}} className="scores">
            {score}
          </p>
        </div>
      </div>
    )
  }

  renderGameCards = () => (
    <div className="card">
      <button type="button" onClick={this.handleValue} data-testid="rockButton">
        <img
          src={choicesList[0].imageUrl}
          alt={choicesList[0].id}
          className="image-size"
        />
      </button>
      <button
        type="button"
        onClick={this.handleValue}
        data-testid="scissorsButton"
      >
        <img
          src={choicesList[1].imageUrl}
          alt={choicesList[1].id}
          className="image-size"
        />
      </button>
      <button
        type="button"
        onClick={this.handleValue}
        data-testid="paperButton"
      >
        <img
          src={choicesList[2].imageUrl}
          alt={choicesList[2].id}
          className="image-size"
        />
      </button>
    </div>
  )

  renderPop = () => (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="rules-btn">
            RULES
          </button>
        }
      >
        {close => (
          <div className="pop-container">
            <button type="button" className="rules-btn" onClick={() => close()}>
              <RiCloseLine />
            </button>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-image"
              />
            </div>
          </div>
        )}
      </Popup>
    </div>
  )

  render() {
    const {playerChoice, opponentChoice, playingBoard} = this.state

    return (
      <div className="bg-container">
        {this.renderScoreContainer()}
        <div className="cards-container">
          {playingBoard ? this.renderResultCard() : this.renderGameCards()}
        </div>
        {this.renderPop()}
      </div>
    )
  }
}

export default GameBoard
