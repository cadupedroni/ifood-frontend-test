import React, { Component } from 'react'
import styled from 'styled-components'
import Filter from '../components/filter'
import Playlist from '../components/playlist'
import Title from '../components/title'

const Container = styled.section`
  flex-direction: column;
  display: flex;
`
export default class Home extends Component {
 render() {
    return (
      <Container>
        <Title color='#ea1d2c' align='center' label='Spotifood' />

        <Filter />
        <Playlist />
      </Container>
    )
  }
}