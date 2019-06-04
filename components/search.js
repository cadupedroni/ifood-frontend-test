import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './title'

const Container = styled.section`
  flex-direction: column;
  display: flex;
`
const SearchField = styled.input`
  height: 36px;
  padding: 5px 20px;
  border: solid 1px #e5e5e5;
  border-radius: 8px;
  margin: 0 15px 10px 0;
  color: #737373;
  outline: none;
  font-size: 16px;
  background-color: #fff;
`
const Button = styled.button`
  background: #ea1d2c;
  font-size: 16px;
  color: #fff;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  height: 48px;
  cursor: pointer;
`

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }

    this.Search = this.Search.bind(this)
    this.Submit = this.Submit.bind(this)
  }

  Search(e){
    this.setState(
      {
        search: e.target.value
      }
    )
  }

  Submit(e){
    e.preventDefault();

    let url = ''

    fetch(url, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name
      })
    })
    .then( (response) => {
      alert('Busca realizada com sucesso!')
      //window.location.href = '/'
    })
    .catch(error => console.log('parsing failed', error))
  }

  render() {
    return(
      <Container>
        <Title type='h2' color='#3e3e3e' label='Busca' />
            <SearchField type='text' value={this.props.search} onChange={this.props.Search} placeholder='Digite o nome da playlist' />
            <Button type="submit">Buscar</Button>
      </Container>
    )
  }
}


//https://www.youtube.com/watch?v=yh1DOKh4jas