import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './title'

const Container = styled.section`
  display: flex;
`
export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
  }

  fetchToken(){
    const apiURL = 'https://accounts.spotify.com/api/token'
    const apiToken = 'BearerBQAydibyCtZdgcmA0L3eDjJuU60ZgEJvm5BO351nmVCbUAfizQWIYvxsh-VZK9er-kZMYenICvh8bY7jG9Haf23lHYUp36ch0P10ofhnU-metKS_nivXkU32pQqGi4rLHhR9R6wVCVWBpTK2BxwzJC23hGm_LUBqFyDokg'
    const clientID = '9120a482f28548c389c3dadc373f1acb'
    const clientSecret = '68793805c2104a758001dde1d5f7d504'
  }

  fetchPlaylists(){
    const apiSpotify = 'https://api.spotify.com/v1/browse/featured-playlists'
    const accessToken = 'BearerBQAydibyCtZdgcmA0L3eDjJuU60ZgEJvm5BO351nmVCbUAfizQWIYvxsh-VZK9er-kZMYenICvh8bY7jG9Haf23lHYUp36ch0P10ofhnU-metKS_nivXkU32pQqGi4rLHhR9R6wVCVWBpTK2BxwzJC23hGm_LUBqFyDokg'
    fetch(apiSpotify, {
      headers: {
        authorization: 'Bearer ' + accessToken
      }
    })
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.playlists.map(playlist => (
      {
        id: `${playlist.id}`,
        name: `${playlist.name}`
      }
    ))
    )
    .then(playlists => this.setState({
      playlists
    }))    
    .catch(error => console.log('parsing failed', error))
  }

  startUpdating() {
    //this.timeout = setTimeout(() => this.fetchFilters(), 30000)
  }

  componentDidMount() {
    this.fetchPlaylists()
  }
  componentWillUnmount() {
    //clearTimeout(this.timeout)
  }
  render() {
    return(
      <Container>
        <Title type='h2' color='#3e3e3e' label='Playlists' />
        {
          this.state.playlists.map(playlist => 
            <ul key={playlist.id}>
              <li>{playlist.name}</li>
            </ul>
          )
        }
      </Container>
    )
  }
}