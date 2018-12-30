import React from "react";

const MyContext = React.createContext({});

class Provider extends React.Component {
  state = {
    pokemon: undefined
  };

  componentDidMount() {
    this.setState({ pokemon: "bulbasaur" });
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          changePokemon: pokemon => this.setState({ pokemon })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export { Provider as default, MyContext };
