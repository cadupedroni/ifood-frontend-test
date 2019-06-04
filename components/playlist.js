import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './title'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()

const Container = styled.section`
  flex-direction: column;
  display: flex;
`
const Name = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  color: #3e3e3e;
  margin: 0;
`
const Search = styled.input`
  height: 36px;
  padding: 5px 20px;
  border: solid 1px #e5e5e5;
  border-radius: 8px;
  margin-bottom: 10px;
  color: #737373;
  outline: none;
  font-size: 16px;
  background-color: #fff;
`
const Login = styled.a`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  color: #fff;
  background: #ea1d2c;
  border: none;
  margin-bottom: 15px;
  padding: 0 20px;
  border: solid 1px #e5e5e5;
  border-radius: 4px;
  height: 48px;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  display: flex;
`
export default class Playlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlists: [],
      query: '',
      loggedIn: '',
      search: ''
    }

    this.getHashParams = this.getHashParams.bind(this)
    this.getPlaylists = this.getPlaylists.bind(this)

  }

  componentDidMount(){
    const params = this.getHashParams()
    const token = params.access_token

    if (token) {
      spotifyApi.setAccessToken(token)
    }

    this.setState({
      loggedIn: token ? true : false
    })

    //console.log('Token? ' + params.access_token)
    //console.log('Logado? ' + this.state.loggedIn)
    this.getPlaylists()
    
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        //console.log('hash ' + q)
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getPlaylists(){
    spotifyApi.getFeaturedPlaylists()
    .then(() => {
      this.fetchPlaylists()
    })
  }

  fetchPlaylists(token){
    const apiSpotify = 'https://api.spotify.com/v1/browse/featured-playlists'
    const accessToken = 'BQBR6d_JxKYqTgaGwjTE8f_npP-Z8ZvtDBXIc_u5NyI6zpXcctC4cFVDb5mZZBqOyF69hX57_tcW7zi7xdw7Bn3AP0EtWRqUlKO8Kx_UVcmmyBz02NrwzvB6wiw1PxoGrhkvjG6vIpNshl4XO-FJcnSet1_TAwOW09iXBbA5_NbPiaaD0q3gMOQ0niXBHrk5dKY3U-ZbJs4'
    //console.log('AccessToken? ' + accessToken)
    fetch(apiSpotify, {
      headers: {
        authorization: 'Bearer ' + accessToken
      }
    })
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.playlists.items.map(item => (
      {
        id: `${item.id}`,
        name: `${item.name}`
      }
    ))
    )
    .then(playlists => this.setState({
      playlists
    }))    
    .catch(error => console.log('parsing failed', error))
  }

  updateSearch(e){
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

/*
  
  startUpdating() {
    //this.timeout = setTimeout(() => this.fetchFilters(), 30000)
  }

  componentDidMount() {
    this.fetchPlaylists()
    //this.getHashParams()
  }
  componentWillUnmount() {
    //clearTimeout(this.timeout)
  }
*/
  render() {
    let playlists = this.state.playlists.filter((playlist) => {
      return playlist.name.toLowerCase().indexOf(
        this.state.search.toLowerCase()
      ) !== -1
    })
    return(
      <Container>
        { this.state.loggedIn &&
          <Login href='http://localhost:8888'> Login to Spotify </Login>
        }

        <Search type='text' value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder='Digite o nome da playlist' />
        
        <Title type='h2' color='#3e3e3e' label='Playlists' />

        {
          playlists.map(playlist => 
            <ul key={playlist.id}>
              <li>
                <Name>{playlist.name}</Name>
              </li>
            </ul>
          )
        }
       
      </Container>
    )
  }
}