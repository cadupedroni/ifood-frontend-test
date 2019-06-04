import React, { Component } from 'react'
import styled from 'styled-components'
import Title from './title'

const Container = styled.section`
  flex-direction: column;
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
  @media (min-width: 992px) {
    width: 170px;
  }
`
const Option = styled.option`
  color: #737373;
  background-color: #fff;
`

export default class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: [
        {
          id: "locale",
          name: "Locale",
          values: 
          [
              {
                value: "en_AU",
                name: "en_AU"
              },
              {
                value: "de_DE",
                name: "de_DE "
              },
              {
                value: "pt_BR",
                name: "pt_BR"
              },
              {
                value: "fr_FR",
                name: "fr_FR"
              },
              {
                value: "en_US",
                name: "en_US"
              },
              {
                value: "es_AR",
                name: "es_AR"
              }
            ]
        },
        {
          id: "country",
          name: "País",
          values: 
          [
            {
              value: "AU",
              name: "Australia"
            },
            {
              value: "DE",
              name: "Alemanhã"
            },
            {
              value: "BR",
              name: "Brasil"
            },
            {
              value: "PT",
              name: "Portugal"
            },
            {
              value: "en_US",
              name: "EUA"
            },
            {
              value: "RU",
              name: "Rússia"
            }
          ]
        }
      ]
    }

  }
/*
  fetchFilters(){
    fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.filters.map(locale => (
        {
          id: `${locale.id}`,
          name: `${locale.name}`,
          values: `${locale.values[0]}`
        }
      ))
      )
      .then(locale => this.setState({
        locale
      }))
      .catch(error => console.log('parsing failed', error))
  }

  componentDidMount() {
    this.fetchFilters()
  }
*/
  render() {
    return(
      <Container>
        <Title type='h2' color='#3e3e3e' label='Filtros' />
        <Filters>
            {
              this.state.filters.map((filter, i) => 
                <Select key={filter.id}>
                  <Option>{filter.name}</Option>
                  {
                    (typeof(filter.values) == 'object')?
                      <>
                        {
                          filter.values.map((subitem, k) => 
                            <Option key={subitem.value}>{subitem.name}</Option>
                          )
                        }
                      </>
                    : null
                  }
                </Select>
              )
            }
        </Filters>
      </Container>
    )
  }
}


//https://www.youtube.com/watch?v=yh1DOKh4jas