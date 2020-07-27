import React, { Component, createContext } from "react";
import { client } from "../index";
export const UserContext = createContext();

export class UserContextProvider extends Component {
  // FIXME: Convert to function!

  // componentDidUpdate() {
  //   this.checkAuthentication();
  // }

  componentDidMount() {
    // FIXME: This can be useEffect?
    this.checkAuthentication();
  }

  // REVIEW: Also , I don't think you need to export/import. That's what the context is for, no?
  //  See https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext
  //  Hmm maybe not: https://www.robinwieruch.de/react-context/

  signInUser = () => {
    // let parsedUserToken = {};
    const storedUserToken = localStorage.getItem("authToken");
    if (storedUserToken) {
      const parsedUserToken = JSON.parse(
        window.atob(storedUserToken.split(".")[1])
      );
      this.setState((state) => ({
        user: {
          name: `${parsedUserToken.first_name} ${parsedUserToken.last_name}`,
          role: parsedUserToken.role,
          signedIn: true,
        },
      }));
    }
  };

  signOutUser = () => {
    localStorage.removeItem("authToken");
    client.resetStore();
    this.setState((state) => ({
      user: this.signedOutUser,
    }));
  };

  signedOutUser = {
    name: null,
    role: "unregistered",
    signedIn: false,
  };

  state = {
    user: this.signedOutUser,
    signInUser: this.signInUser,
    signOutUser: this.signOutUser,
  };

  async checkAuthentication() {
    this.signInUser();
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
