import React, { Component } from 'react';
import { Item } from './item-elements';

let MAX_ITEMS_PER_PAGE = 20;


class ListElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      isLoading: false,
      stopAt: MAX_ITEMS_PER_PAGE,
      numLoaded: 0,
      scrolled: 0
    }
    this.rows = [];
  }

  componentDidMount() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleLoadMore() {
    console.log('load more!');
    let currentState = Object.assign(this.state);
    currentState.numLoaded = this.state.stopAt;
    currentState.stopAt = this.state.stopAt + MAX_ITEMS_PER_PAGE;
    this.setState(currentState);
  }

  handleScroll(event) {
    if ((event.timeStamp - this.state.scrolled) < 500) {
      
      return;
    }
    let currentState = Object.assign(this.state);
    currentState.scrolled = event.timeStamp;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 0.7 ) ) {
      this.handleLoadMore();
    }
  }

  render() {
    let stopAt = this.state.stopAt;
    if (stopAt > this.props.data.length) {
      stopAt = this.props.data.length;
    }
    for (let i = this.state.numLoaded; i < stopAt; i++) {
      if (this.props.noComments) {
        this.rows.push(<Item id={this.props.data[i]} key={this.props.data[i]} noComments={true}/>)
      } else {
        this.rows.push(<Item id={this.props.data[i]} key={this.props.data[i]} />)
      }
    }

    return (
      <div>
        <div>{this.rows}</div>

      </div>
    );
  }
}




export default ListElement;
