import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ErrorBoundry from './components/FaceRecognition/ErrorBoundry';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Server from './ServerURL';

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFace.map(element => {
        return {
          leftCol: element.region_info.bounding_box.left_col * width,
          topRow: element.region_info.bounding_box.top_row * height,
          rightCol: width - element.region_info.bounding_box.right_col * width,
          bottomRow: height - element.region_info.bounding_box.bottom_row * height,
  
        }
      })
    
  }

  displayFaceBox = (boxes) => this.setState({boxes: boxes});

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});

    fetch(`${Server}/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch(`${Server}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
        }

        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch(error => console.log('error', error));
  }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, boxes, imageURL, route} = this.state;
    return(
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <Logo />
        { route === 'home'
          ? <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <ErrorBoundry>
                <FaceRecognition 
                  boxes={boxes}
                  imageURL={imageURL}
                />
              </ErrorBoundry>
            </div>
          
          : ( route === 'register'
              ? <Register
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}
                />
              : <SignIn
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}
                />
            )
          
        }
      </div>
    )
  };
}

export default App;