import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Bar = styled.span`
  width: ${props => props.l}px;
  height: 20px;
  background: ${props => {
    switch (true) {
      case props.l >= 100:
        return "#4CC256";
      case props.l >= 75 && props.l < 100:
        return "#A4C455";
      case props.l >= 50 && props.l < 75:
        return "#FCC758";
      case props.l >= 25 && props.l < 50:
        return "#F2864A";
      default:
        return "#E94241";
    }
  }};
  transition: 300ms ease;
  border-radius: 100px;
  margin: 7px 0;
`;

const Name = styled.p`
  min-width: 130px;
  margin: 0;
  color: #111;
  font-weight: 500;
`;

const Value = styled.p`
  margin: 0 0 0 10px;
  color: #111;
  font-weight: 500;
`;

class Stat extends React.Component {
  render() {
    const { name, value } = this.props;
    return (
      <Wrapper>
        <Name>{name}</Name>
        <Bar l={value} />
        <Value>{value}</Value>
      </Wrapper>
    );
  }
}

export default Stat;
