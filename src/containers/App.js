import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
  return isPending ? <h1 className="tc">Loading</h1> : (
      <Fragment>
      <div>
        <header>
          <title>RoboFriends</title>
        </header>
        <main className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
            <CardList robots={filteredRobots}/>
            </ErrorBoundry>
          </Scroll>
        </main>
        <footer>
        <p className="tc"> Made by <a href="https://github.com/LubosG12">Ľubomír Furinda</a> </p>
        </footer>
      </div>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
