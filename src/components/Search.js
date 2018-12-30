import React from "react";
import styled from "styled-components";
import SearchResults from "./SearchResults";

const Wrapper = styled.div`
  width: 95%;
  height: 40px;
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 15px;

  input {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    border-radius: 100px;
    padding-left: 20px;
    font-size: 16px;

    &:focus {
      outline: none;
      border: 2px solid #6b9df9;
    }
  }
`;

class Search extends React.Component {
  state = {
    value: "",
    results: []
  };

  handleClickOutside = () => this.setState({ results: [] });

  handleChange = e => {
    const value = e.target.value;
    const prevVal = this.state.value;

    this.setState({ value }, () => {
      if (this.state.value && prevVal < this.state.value) {
        fetch(`http://localhost:8080/search/${this.state.value.toLowerCase()}`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({ results: data });
          });
      } else {
        this.setState({ results: [] });
      }
    });
  };

  render() {
    return (
      <Wrapper>
        <input
          onChange={this.handleChange}
          type="text"
          value={this.state.value}
          placeholder="Find a Pokemon.."
        />
        {this.state.results && (
          <SearchResults
            handleClickOutside={this.handleClickOutside}
            results={this.state.results}
          />
        )}
      </Wrapper>
    );
  }
}

export default Search;
