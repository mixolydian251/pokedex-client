import React from "react";
import styled from "styled-components";
import types from "../types.json";
import { MyContext } from "../providers/Provider";

const Wrapper = styled.button`
  width: 90%;
  height: 120px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 10px auto;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  border-bottom: 2px solid #eee;

  p {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 18px;
    margin-left: auto;
    min-width: 150px;
  }

  h1 {
    margin-left: 20px;
    min-width: 40px;
  }

  img {
    margin-left: auto;
  }

  &:focus {
    outline: none;
    border: 3px solid #6b9df9;
  }
`;

const Types = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
`;

const TypeTag = styled.div`
  height: 35px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.color};
  color: black;
  margin: 8px;
  border-radius: 100px;
`;

class Pokemon extends React.Component {
  renderTypes = () => {
    return this.props.types.map(type => {
      return (
        <TypeTag key={type} color={types[type].color}>
          {type}
        </TypeTag>
      );
    });
  };

  render() {
    const { number, name, img } = this.props;
    return (
      <MyContext.Consumer>
        {context => (
          <Wrapper onClick={() => context.changePokemon(name)}>
            <h1>{number}</h1>
            <p>{name}</p>
            <Types>{this.renderTypes()}</Types>
            <img src={img} alt={name} />
          </Wrapper>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Pokemon;
