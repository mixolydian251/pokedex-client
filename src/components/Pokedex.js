import React, { Component } from "react";
import styled from "styled-components";
import Pokemon from "./Pokemon";
import StatBox from "./StatBox";
import Provider, { MyContext } from "../providers/Provider";
import masterBall from "../master-ball.png";
import "../style.css";
import Search from "./Search";

const Wrapper = styled.div`
  display: flex;
`;

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f8f8;
  min-height: 100vh;
  width: 60vw;
  margin-left: auto;
  padding: 20px 0 0;
  position: relative;
`;

const NavButtons = styled.div`
  display: flex;
  position: sticky;
  z-index: 10;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8%;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.8);

  .btn {
    padding: 15px 32px;
    text-align: center;
    -webkit-transition-duration: 0.4s;
    transition-duration: 250ms;
    margin: 20px 0;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 3px;
    background-color: white;
    color: black;
    border: 2px solid #555555;
  }
  .btn:hover {
    color: white;
    background: #555555;
  }

  .next {
    margin-left: auto;
  }

  .back {
    margin-right: auto;
  }
`;

const Loading = styled.img`
  margin: 40px auto;
  animation: spin 1s linear infinite;
  transform-origin: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    20% {
      transform: rotate(5deg) translateX(6px);
    }
    40% {
      transform: rotate(-15deg) translateX(-10px);
    }
    60% {
      transform: rotate(10deg) translateX(8px);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

class Home extends Component {
  state = {
    group: 1,
    loading: true,
    pokemon: localStorage.getItem("pokemon")
      ? JSON.parse(localStorage.getItem("pokemon"))
      : []
  };

  fetchData = (start, end) => {
    this.setState({ loading: true });
    const { group } = this.state;

    let cache = localStorage.getItem(`group-${group}`);

    if (!cache) {
      if (!start && !end) {
        start = group * 50 - 49;
        end = group * 50;
      }

      fetch(`http://localhost:8080/pokemon?start=${start}&end=${end}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          localStorage.setItem(`group-${group}`, JSON.stringify(data));
          this.setState({ loading: false, pokemon: data });
        });
    } else {
      this.setState({ loading: false, pokemon: JSON.parse(cache) });
    }
    window.scroll(0, 0);
  };

  renderPokemon = () => {
    return this.state.pokemon.map(p => {
      return (
        <Pokemon
          key={p.id}
          number={p.id}
          name={p.name}
          types={p.types}
          img={p.sprite}
        />
      );
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  nextPage = () => {
    if (this.state.group < 16) {
      this.setState(
        prevState => ({ group: prevState.group + 1 }),
        this.fetchData
      );
    } else if (this.state.group === 16) {
      this.setState(
        prevState => ({ group: prevState.group + 1 }),
        () => this.fetchData(10001, 10147)
      );
    }
  };

  prevPage = () => {
    if (this.state.group > 1) {
      this.setState(
        prevState => ({ group: prevState.group - 1 }),
        this.fetchData
      );
    }
  };

  render() {
    return (
      <Provider>
        <Wrapper>
          <PokemonContainer>
            <Search />
            {!this.state.loading && this.renderPokemon()}
            {this.state.loading ? (
              <Loading src={masterBall} alt="loading" />
            ) : (
              <NavButtons>
                <button className="btn back" onClick={this.prevPage}>
                  Back
                </button>
                <button className="btn next" onClick={this.nextPage}>
                  Next
                </button>
              </NavButtons>
            )}
          </PokemonContainer>
          <MyContext.Consumer>
            {context => <StatBox pokemon={context.state.pokemon} />}
          </MyContext.Consumer>
        </Wrapper>
      </Provider>
    );
  }
}

export default Home;
