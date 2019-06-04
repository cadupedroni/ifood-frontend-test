import React, { Component } from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.0625rem;
  line-height: 2.0625rem;
  color: ${props => props.color};
  text-align: ${props => props.align};
`
const H2 = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: ${props => props.color};
`
export default class Title extends Component {
  render() {
    const { type, label, color, align } = this.props
    
    switch(type) {
      default:
        return <H1 color={color} align={align}>{label}</H1>
      case 'h2':
        return <H2 color={color}>{label}</H2>
    }
  }
}