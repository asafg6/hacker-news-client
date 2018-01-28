import React, { Component } from 'react'
import ListElement from './hackernews/list-elements'
import { User } from './hackernews/item-elements'
import HackerNewsApi from './hackernews/api-handler'
import { Route, Switch } from 'react-router-dom'
import NavBarLinks from './nav'
import './App.css'

class ListPage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false
    }
  }

  componentDidMount () {
    let currentState = Object.assign(this.state)
    currentState.isLoading = true
    this.setState(currentState)
    this.getItems()
      .then(response => response.json())
      .then(data => {
        let currentState = Object.assign(this.state)
        currentState.isLoading = false
        currentState.data = data
        this.setState(currentState)
      })
  }

  render () {
    return (
      <div className='container'>
        <div className='App'>
          <ListElement data={this.state.data} />
        </div>
      </div>
    )
  }
}

class TopStories extends ListPage {
  getItems () {
    return HackerNewsApi().getTopStories()
  }

}

class AskStories extends ListPage {
  getItems () {
    return HackerNewsApi().getAskStories()
  }
}

class NewStories extends ListPage {
  getItems () {
    return HackerNewsApi().getNewStories()
  }
}

class ShowStories extends ListPage {
  getItems () {
    return HackerNewsApi().getShowStories()
  }
}

class JobStories extends ListPage {
  getItems () {
    return HackerNewsApi().getJobStories()
  }

  render () {
    return (
      <div className='container'>
        <div className='App'>
          <ListElement data={this.state.data} />
        </div>
      </div>
    )
  }
}

class Users extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      data: null
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    HackerNewsApi().getUser(this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        let currentState = Object.assign(this.state)
        currentState.data = data
        currentState.isLoading = false
        this.setState(currentState)
      })
  }

  render () {
    if (this.state.data != null) {
      return (
        <div className='container'>
          <div className='App'>
            <User { ...this.state.data }/>
          </div>
          <div>
            <h4>Submitted</h4>
          </div>
          <div className='ml-4'>
            <ListElement data={this.state.data.submitted} noComments={true} />
          </div>
        </div>
      )
    }
    return (
      <div className='container'>
        <div className='App'>
          ...
        </div>
      </div>
    )
  }
}

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={TopStories} />
      <Route exact path='/top' component={TopStories} />
      <Route exact path='/ask' component={AskStories} />
      <Route exact path='/new' component={NewStories} />
      <Route exact path='/show' component={ShowStories} />
      <Route exact path='/jobs' component={JobStories} />
      <Route path='/users/:id' component={Users} />
    </Switch>
  </main>
)

class Header extends Component {

  constructor (props) {
    super(props)
    this.state = { 
      navCollapsed: true
    };
  }

  onToggleNav () {
    this.setState({ navCollapsed: !this.state.navCollapsed });
  }

  render () {
    let links = [
      {path: '/top', text: 'Top', isActive: false},
      {path: '/new', text: 'New', isActive: false},
      {path: '/ask', text: 'Ask', isActive: false},
      {path: '/show', text: 'Show', isActive: false},
      {path: '/jobs', text: 'Jobs', isActive: false}
    ]
    let navbarLinks = <NavBarLinks links={links} />
    return (
      <div>
        <nav className={'navbar navbar-expand-md navbar-toggleable-md navbar-dark sticky-top'} 
            style={{backgroundColor: '#000000'}}>   
          <a className='navbar-brand' href='/'><b>Techies HN</b></a>
          <button
            className='navbar-toggler navbar-toggler-left'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => this.onToggleNav()}>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className={(this.state.navCollapsed ? 'collapse' : '') + ' navbar-collapse'} 
            id='navbarSupportedContent' onClick={() => this.onToggleNav()}>
            {navbarLinks}
          </div>
        </nav>
      </div>
    )
  }
}

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App
