import React from "react";
import styled from "styled-components";
import { MyContext } from "../providers/Provider";

const Results = styled.div`
  width: 90%;
  position: absolute;
  top: 46px;
  z-index: 100;
  background: white;
  border-radius: 10px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3);

  button {
    width: 100%;
    text-align: left;
    font-size: 18px;
    display: block;
    border: none;
    background: none;
    font-weight: bold;
    padding: 10px 0 10px 20px;
    color: #333;
    text-transform: capitalize;

    &:hover {
      background: #eee;
    }
  }
`;

class SearchResults extends React.PureComponent {
  resultsRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.clickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.clickOutside, false);
  }

  clickOutside = e => {
    if (!this.resultsRef.current.contains(e.target)) {
      this.props.handleClickOutside();
    }
  };

  handleClick = (e, context) => {
    const pokemon = e.target.innerText.toLowerCase();
    context.changePokemon(pokemon);
  };

  renderResults = context => {
    const results = [];
    for (let i = 0; i < this.props.results.length && i < 10; i++) {
      results.push(
        <button
          key={this.props.results[i].Name}
          onClick={e => this.handleClick(e, context)}
        >
          {this.props.results[i].Name}
        </button>
      );
    }
    return results;
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Results ref={this.resultsRef}>{this.renderResults(context)}</Results>
        )}
      </MyContext.Consumer>
    );
  }
}

export default SearchResults;
