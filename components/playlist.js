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
const Filters = styled.div`
  padding: 10px 0;
`
const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 5px 20px;
  border: solid 1px #e5e5e5;
  border-radius: 8px;
  margin: 0 15px 10px 0;
  color: #737373;
  outline: none;
  font-size: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: #fff;
`
const Option = styled.option`
  color: #737373;
  background-color: #fff;
`
export default class Playlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlists: [],
      filters: [],
      search: ''
    }

    this.getHashParams = this.getHashParams.bind(this)
    this.fetchPlaylist = this.fetchPlaylist.bind(this)

  }

  updateFilter(e){
    this.setState({
      country: e.target.value
    })
    this.fetchPlaylist()
  }

  updateSearch(e){
    this.setState({
      search: e.target.value.substr(0, 20)
    })
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  fetchFilters(){
    const apiMocky = 'http://www.mocky.io/v2/5a25fade2e0000213aa90776'
    fetch(apiMocky)
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.filters.map(filter => (
        {
          id: `${filter.id}`,
          name: `${filter.name}`,
          values: filter.values
        }
      ))
      )
      .then(filters => this.setState({
        filters
      }))
      .catch(error => console.log('parsing failed', error))
  }

  fetchPlaylist(){
    const params = this.getHashParams()
    const token = params.access_token
    
    if (token) {
      spotifyApi.setAccessToken(token)
    }

    this.setState({
      loggedIn: token ? true : false
    })

    spotifyApi.getFeaturedPlaylists()
    .then(() => {
        console.log('País ' + this.state.country)
        const apiSpotify = 'https://api.spotify.com/v1/browse/featured-playlists?country=' + this.state.country
        const accessToken = token

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
    ) 
  }

  componentDidMount(){
    this.fetchFilters()
    this.fetchPlaylist()
  }

  startUpdating() {
    this.timeout = setTimeout(() => this.fetchPlaylist(), 30000)
  }

  render() {
    let playlists = this.state.playlists.filter((playlist) => {
      return playlist.name.toLowerCase().indexOf(
        this.state.search.toLowerCase()
      ) !== -1
    })

    clearTimeout(this.timeout)

    return(
      <Container>
        { this.state.loggedIn === true
          ? null
          : <Login href='http://localhost:8888/login'>Entrar no Spotify</Login>
        }

        <Filters>
          <Select onChange={this.updateFilter.bind(this)}>
            <Option>Selecione um país</Option>
            {
              this.state.filters.map(filter => {
                if(filter.id === "country")
                  return (
                    filter.values.map(item =>
                      <Option key={item.value} value={item.value}>{item.name}</Option>
                    )
                  )
                  return null
                }
              )
            }
          </Select>
        </Filters>

        <Search type='text' value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder='Buscar playlists' />
        
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