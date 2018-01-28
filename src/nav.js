import React, {Component} from 'react';
import { Link } from 'react-router-dom';



class NavLink extends Component {
    
    render() {
        return (
          <li className={"nav-item " + (this.props.isActive ? "active": "")}>
                    <Link 
                      className="nav-link" 
                      to={this.props.path}
                      onClick={() => this.props.onClick()}
                    >
                {this.props.text}</Link>
          </li>
        );
    }
  
  }
  
class NavBarLinks extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        links: props.links
        }
    }

    handleClick(i) {
        const links = this.state.links.slice();
        for (let k in links) {
        if (i === Number(k)) {
            links[k].isActive = true;
        } else {
            links[k].isActive = false;
        }
        }
        this.setState({links: links});
    }

    render() {
        return (
        <ul className="navbar-nav">
            {this.state.links.map((link, i) => 
                <NavLink 
                path={link.path} 
                text={link.text} 
                isActive={link.isActive}
                key={link.path} 
                onClick={() => this.handleClick(i)}
                /> 
                )}        
        </ul>
        );

    }
}

export default NavBarLinks;