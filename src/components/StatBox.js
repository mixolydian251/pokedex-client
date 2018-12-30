import React from "react";
import styled from "styled-components";
import Stat from "./Stat";
import typeMap from "../types";

const Wrapper = styled.div`
  width: 40vw;
  height: 100%;
  position: fixed;
  background: rgba(176, 0, 0, 0.86);
  overflow: auto;

  div {
    //position: relative;
  }

  .type1 {
    transition: 300ms ease;
    position: absolute;
    height: 130%;
    width: 50%;
    left: 0;
    top: 0;
    background: ${props => props.types[0].color};
    z-index: -1;

    p {
      min-width: 50px;
      text-align: center;
      background: rgba(255, 255, 255, 0.5);
      padding: 5px 10px;
      border-radius: 100px;
      margin: 10px 20px;
      font-weight: bolder;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .type2 {
    transition: 300ms ease;
    position: absolute;
    height: 130%;
    width: 50%;
    right: 0;
    top: 0;
    background: ${props =>
      props.types[1] ? props.types[1].color : props.types[0].color};
    z-index: -1;

    p {
      min-width: 50px;
      text-align: center;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 100px;
      padding: 5px 10px;
      margin: 10px 20px;
      font-weight: bolder;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  h1 {
    color: white;
    text-align: center;
    text-transform: capitalize;
  }
`;

const PokeView = styled.div`
  width: 80%;
  max-width: 500px;
  min-height: 200px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto 50px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  img {
    animation: enterLeft ease 500ms;
    transform: ${props => (props.loading ? "translateX(400px)" : "none")};
    opacity: ${props => (props.loading ? "0" : "1")};
    transition: 300ms ease;
    height: 160px;
  }

  @keyframes enterLeft {
    0% {
      transform: translateX(-400px);
      opacity: 0;
    }
    60% {
      transform: translateX(10px);
      opacity: 0.6;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Header = styled.h3`
  width: 73%;
  color: #fff;
  font-size: 18px;
  font-weight: bolder;
  margin: 10px auto 5px;
  text-align: left;
`;

const FlavorText = styled.div`
  width: 75%;
  max-width: 500px;
  color: #111;
  margin: 0 auto 50px;
  box-sizing: border-box;
  background: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: 500;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3);
`;

const StatsContainer = styled.div`
  width: 75%;
  max-width: 500px;
  margin: 0 auto 50px auto;
  box-sizing: border-box;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3);
`;

class StatBox extends React.PureComponent {
  state = {
    pokemon: undefined,
    data: undefined,
    loading: false,
    flavorTextIndex: 0,
    types: ["red"]
  };

  componentDidUpdate(prevProps) {
    if (this.props.pokemon !== prevProps.pokemon) {
      this.setState({ loading: true });

      let pkm = localStorage.getItem(this.props.pokemon);

      if (!pkm) {
        console.log("fetching " + this.props.pokemon);

        fetch(`http://localhost:8080/pokemon/${this.props.pokemon}`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({ pokemon: undefined });
            this.setState({
              pokemon: this.props.pokemon,
              loading: false,
              types: data.Types.map(t => typeMap[t.type.name]),
              data
            });
            localStorage.setItem(this.props.pokemon, JSON.stringify(data));
          });
      } else {
        setTimeout(() => {
          this.setState({ pokemon: undefined });
          this.setState({
            pokemon: this.props.pokemon,
            loading: false,
            types: JSON.parse(pkm).Types.map(t => typeMap[t.type.name]),
            data: JSON.parse(pkm)
          });
        }, 100);
      }
    }
    console.log(this.state);
  }

  generateStats = () => {
    return (
      this.state.data.Stats &&
      this.state.data.Stats.map(stat => {
        return (
          <Stat
            key={stat.stat.name}
            name={stat.stat.name}
            value={stat.base_stat}
          />
        );
      })
    );
  };

  nextFlavorText = () => {
    if (this.state.flavorTextIndex < this.state.data.Text.length) {
      this.setState(prevState => ({
        flavorTextIndex: prevState.flavorTextIndex++
      }));
    } else {
      this.setState({ flavorTextIndex: 0 });
    }
  };

  render() {
    const { pokemon, data, loading } = this.state;
    return (
      <Wrapper types={this.state.types}>
        <div>
          <h1>{this.props.pokemon}</h1>
          {data && (
            <React.Fragment>
              <PokeView loading={loading}>
                {pokemon && (
                  <React.Fragment>
                    <img
                      key={`${pokemon}-front`}
                      src={data.sprites.front_default}
                      alt={`${pokemon}-front`}
                    />
                    {data.sprites.back_default && (
                      <img
                        key={`${pokemon}-back`}
                        src={data.sprites.back_default}
                        alt={`${pokemon}-back`}
                      />
                    )}
                  </React.Fragment>
                )}
              </PokeView>
              <Header>Battle Stats:</Header>
              <StatsContainer>{this.generateStats()}</StatsContainer>
              <Header>Flavor Text:</Header>
              <FlavorText onClick={this.nextFlavorText}>
                {data.Text[0].Text}
              </FlavorText>
              <div className="type1">
                <p>{data.Types[0].type.name}</p>
              </div>
              <div className="type2">
                {data.Types[1] && <p>{data.Types[1].type.name}</p>}
              </div>
            </React.Fragment>
          )}
        </div>
      </Wrapper>
    );
  }
}

export default StatBox;
