import React, { Fragment, Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => this.setState({ robots: users }))
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot => {
      console.log(this.state.searchfield.toLowerCase())
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
  return !robots.length ? <h1 className="tc">Loading</h1> : (
      <Fragment>
      <body>
        <header>
          <title>RoboFriends</title>
        </header>
        <main className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
            <CardList robots={filteredRobots}/>
            </ErrorBoundry>
          </Scroll>
        </main>
        <footer>
        <p className="tc"> Made by <a href="https://github.com/LubosG12">Ľubomír Furinda</a> </p>
        </footer>
      </body>
      </Fragment>
    )
  }
}

export default App;
