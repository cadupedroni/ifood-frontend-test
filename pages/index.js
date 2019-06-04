import React, { Component } from 'react'
import styled from 'styled-components'
import Filter from '../components/filter'
import Playlist from '../components/playlist'
import Search from '../components/search'
import Title from '../components/title'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()

const Container = styled.section`
  flex-direction: column;
  display: flex;
`
export default class Home extends Component {
  constructor(props) {
    super(props)
    const token = 'BQCzT8X58spk4f4V6yuauxpLzr7br7344xGsUv19rWzD9l0MmnsaSWiAjwPrNQtAOPwskjqNGbPxXodYScTJE-NPX92BjufSMRI4zvk4TXIvWTg19fwmgJqmSOXdP5KKsDUIjrlN2QFJNgfbNiuFVKPvhSfA97dJakTRLOCsh65iYz2R2Sjpa1xD7MakQg'

    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      query: '',
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }

    this.getHashParams = this.getHashParams.bind(this)

  }

  getHashParams() {
    let query = window.location.hash.substring(1)
    let params = query.split(/([^&;=]+)=?([^&;]*)/g) 
    console.log('access_token: ' + params[2])
    console.log('refresh_token: ' + params[5])
  }

  componentDidMount() {
    this.getHashParams()
  }

  render() {
    return (
      <Container>
        <Title color='#ea1d2c' align='center' label='Spotifood' />

        <a href='http://localhost:8888'> Login to Spotify </a>
        
        <Filter />
        <Search />
        <Playlist />
      </Container>
    )
  }
}