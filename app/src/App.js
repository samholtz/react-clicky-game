import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";
import Nav from "./components/Navbar";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    currentScore: 0,
    topScore: 0,
    data: friends.map(friend => {

      friend.clicked = false

      return friend
    })
  };
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You Win..That's What She Said" });
    }
    this.handlePictureClicked();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "Start Over!",
      clicked: []
    });
    this.handlePictureClicked();
  };

  handlePictureClicked = (friendId) => {
    const { data } = this.state

    let shuffledFriends = data
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((friend) => {

        const friendObject = friend.value
        const { id } = friendObject
        if (friendId === id) {
          console.log(friendObject.id)
          console.log(friendObject.clicked)
          friendObject.clicked = !friendObject.clicked
        }

        return friendObject
      })
    console.log(shuffledFriends)
    this.setState({
      data: shuffledFriends
    })
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Nav
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong} />
        <Title>Rick and Morty Mind Blasters Game
          <p>
            Don't click the same character twice!
            </p>
        </Title>
        {this.state.data.map(friend => (
          <FriendCard
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            handleClick={() => this.handlePictureClicked(friend.id)}
            handleIncrement={this.handleIncrement}
            handleReset={this.handleReset}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
