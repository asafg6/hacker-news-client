import React, { Component } from 'react';
import HackerNewsApi from './api-handler';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';



export class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openChildren: false
        };
    }

    handleClickComments() {
      this.setState({openChildren: !this.state.openChildren});
    }

    render() {
        return (
          <div>
            <div className="card mt-5">
                <div className="card-header">
                  <h6>
                   Comment by <Link to={"/users/" +  this.props.by }>{this.props.by} </Link> at { new Date(this.props.time * 1000).toLocaleString('en-US' ) }
                  </h6>
                </div>
                <div className="card-body">
                  <div className="card-text p-4">
                    { ReactHtmlParser(this.props.text)} 
                  </div>
                </div>
                <div className="card-footer">
                  <span className="clickable"  onClick={(() => this.handleClickComments())}>
                    {('kids' in this.props) &&
                      <span >Comments: {this.props.kids.length}</span>
                    }
                    {('kids' in this.props) &&
                      <span className="ml-2">
                          {!this.state.openChildren &&
                            <i className="arrow right"></i>
                          }
                          {this.state.openChildren &&
                            <i className="arrow down"></i>
                          }  
                      </span>
                    }
                  </span>
                </div>

            </div>
            {this.state.openChildren &&
              <div className="ml-4">
                {this.props.kids.map((kid, i) => <Item id={kid} key={kid} />) }
              </div>
            }
            </div>
        );
    }

}


export class Ask extends Component {

    constructor(props) {
      super(props);
      this.state = {
        openChildren: false
      };
    }

    handleClickComments() {
      this.setState({openChildren: !this.state.openChildren});
    }

    render() {
      return (
        <div className="mb-4 mt-5">
          <div className="row">
            <div className="col-lg-12">
              <h5>{this.props.title}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
            
              { ReactHtmlParser(this.props.text)} 
             </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <span >By <Link to={"/users/" +  this.props.by }>{this.props.by} </Link></span>
              <span className="ml-2">
                at { new Date(this.props.time * 1000).toLocaleString('en-US' )}
              </span>
            </div>
            <div className="col-md-6" >
              <span>{this.props.score} points</span>
              <span onClick={(() => this.handleClickComments())} className="clickable ml-2">
                <span className="ml-2">Comments {this.props.descendants}</span>
                <span className="ml-2">
                    {!this.state.openChildren &&
                      <i className="arrow right"></i>
                    }
                    {this.state.openChildren &&
                      <i className="arrow down"></i>
                    }  
                </span>
              </span>
            </div>
          </div>
          {this.state.openChildren &&
            <div className="ml-4">
              {this.props.kids.map((kid, i) => <Item id={kid} key={kid} />) }
            </div>
          }
          
        </div>
      );
    }
  }

export class Story extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openChildren: false
    };
  }

  handleClickComments() {
    this.setState({openChildren: !this.state.openChildren});
  }

  render() {
    return (
      <div className="mb-4 mt-5">
        <div className="row">
          <div className="col-lg-12">
            <h5><a href={this.props.url} target="_blank">{this.props.title}</a></h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <span >By <Link to={"/users/" + this.props.by}>{this.props.by}</Link></span>
            <span className="ml-2">
              at { new Date(this.props.time * 1000).toLocaleString('en-US' )}
            </span>
          </div>
          <div className="col-md-6" >
            <span>{this.props.score} points</span>
            <span onClick={(() => this.handleClickComments())} className="clickable ml-2">
              <span className="ml-2">Comments {this.props.descendants}</span>
              <span className="ml-2">
                  {!this.state.openChildren &&
                    <i className="arrow right"></i>
                  }
                  {this.state.openChildren &&
                    <i className="arrow down"></i>
                  }  
              </span>
            </span>
          </div>
        </div>
        {this.state.openChildren &&
          <div className="ml-4">
            {this.props.kids.map((kid, i) => <Item id={kid} key={kid} />) }
          </div>
        }
        
      </div>
    );
  }
}

export class Job extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openText: false
    };
  }

  handleClickText() {
    let currentState = Object.assign(this.state);
    currentState.openText = !this.state.openText;
    this.setState(currentState);
  }

  render() {
    return (
      <div className="mb-4 mt-5">
        <div className="row">
          <div className="col-lg-12">
            <h5><a href={this.props.url} target="_blank">{this.props.title}</a></h5>
          </div>
        </div>
        {this.state.openText &&
          <div onClick={() => this.handleClickText()} className="clickable-text">
            <div className="row" >
              <div className="col-lg-12">
                { ReactHtmlParser(this.props.text)} 
              </div>
            </div>
          </div>
        }
        {this.props.text != null && this.props.text.length > 0 && !this.state.openText &&
          <div onClick={() => this.handleClickText()} className="clickable-text">
            <div className="row" >
              <div className="col-lg-12 text-truncate"  style={{'max-height': '50px'}}>
                { ReactHtmlParser(this.props.text)} 
              </div>
            </div>
            <div>
              Read More....
            </div>
          </div>
        }

        
        <div className="row">
          <div className="col-sm-6">
            <span >By <Link to={"/users/" + this.props.by}>{this.props.by}</Link></span>
            <span className="ml-2">
              at { new Date(this.props.time * 1000).toLocaleString('en-US' )}
            </span>
          </div>
          <div className="col-md-6" >
            <span>{this.props.score} points</span>
          </div>
        </div>
        
      </div>
    );
  }
}


export class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          data: null
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        HackerNewsApi().getItem(this.props.id)
          .then(response => response.json())
          .then(data => {
            this.setState({ data: data, isLoading: false });
          })
      }
    
      render() {
        if (this.state.data != null) {
          switch (this.state.data.type) {
            case 'story':
              if (this.state.data.title != null ) {
                if (this.state.data.title.startsWith("Ask HN:")) {
                  return (
                    <Ask { ...this.state.data } />
                  );
                }
                return (
                  <Story { ...this.state.data } />
                );
              }
              return null;
            case 'comment':
              if (this.props.noComments) {
                return null;
              }
              return  (
                <Comment { ...this.state.data } />
              );
            case 'job':
              return (
                <Job { ...this.state.data } />
              );
            default:
              return null;
          }
        }
        return (
          <div style={{display: 'none'}}></div>
        );
          
      }
  }


export class User extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <h2>User: {this.props.id}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1 col-3">
            <b>Created:</b>
          </div>
          <div className="col-md-11 col-9">
            { new Date(this.props.created * 1000).toLocaleString('en-US' )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-1 col-3">
            <b>Karma:</b>
          </div>
          <div className="col-md-11 col-9">
            { this.props.karma}
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
            <b>About:</b>
          </div>
          <div className="col-md-11" style={{'word-wrap': 'break-word'}}>
            { ReactHtmlParser(this.props.about) }
          </div>
        </div>

      </div>
    );
  }
  

}