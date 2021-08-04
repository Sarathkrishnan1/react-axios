// src/App.js

import React from "react";

import API from "../src/utils/API";
import User from "./User";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      name: null,
      avatar: null,
      email: null
    };
  }

  render() {
    const { isLoading, name, avatar, email } = this.state;

    return (
      <User isLoading={isLoading} name={name} avatar={avatar} email={email} />
    );
  }

  async componentDidMount() {

    // ...

    try {
      // Load async data from an inexistent endpoint.
      // Load async data.
      let userData = await API.get('/', {
        params: {
          results: 2,
          inc: 'name,email,picture'
        }
      });

      // Parse the results for ease of use.
      userData = userData.data.results[0];

      // Update state with new data and re-render our component.
      const name = `${userData.name.first} ${userData.name.last}`;
      const avatar = userData.picture.large;
      const email = userData.email;

      this.setState({
        ...this.state, ...{
          isLoading: false,
          name,
          avatar,
          email
        }
      });
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }

    // ...


  }
}

export default App;
