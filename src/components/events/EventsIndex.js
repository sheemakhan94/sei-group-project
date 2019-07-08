import React, { Component } from 'react'
import axios from 'axios'
import EventsCard from './EventsCard'
import Filters from '../common/Filters'

class EventsIndex extends Component {
  constructor() {
    super()

    this.state = { events: null, params: { category: '' } }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    if (!this.props.location.search) {
      this.fetchEvents({})
    } else {
      const params = this.props.location.search.replace('?','').split('&').reduce((obj,queryArr) => {
        const split = queryArr.split('=')
        return { ...obj, [split[0]]: split[1] }
      }, {})
      console.log('Location:', params)
      //this.setState({ params: queryObj })
      this.fetchEvents(params)
    }
  }

  handleFilterChange(e){
    console.log(e.target.name, e.target.value)
    const params = { ...this.state.params, [e.target.name]: e.target.value }
    if (e.target.name === 'category') delete params.subcategory
    this.fetchEvents(params)
  }

  fetchEvents(params){
    //console.log('Filters on request', params )
    axios.get('/api/events', { params })
      .then(res => this.setState( { events: res.data, params }))
      .then(() => this.props.history.push('/events'))
      .catch(err => console.log(err))
  }


  render() {
    if (!this.state.events) return null
    console.log('Filters at render', this.state)
    return (
      <section className="section events-index">
        <div className="container filters">
          <Filters
            handleChange={this.handleFilterChange}
            data={this.state.params}
          />
        </div>
        <div className="container all-cards">
          {this.state.events.map(events => (
            <EventsCard
              key={events._id}
              {...events}
            />
          ))}
        </div>
      </section>

    )
  }
}

export default EventsIndex
