import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

import Comment from '../common/Comment'
import CommentForm from '../common/CommentForm'

class EventsShow extends React.Component {
  constructor() {
    super()

    this.state = { event: null, comment: { text: '' } }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAttend = this.handleAttend.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res. data }))
      .catch(err => console.log(err))
  }

  handleAttend() {
    axios.get(`/api/events/${this.props.match.params.id}/attend`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  handleCommentSubmit(e){
    e.preventDefault()
    // console.log('trying to submit comment')
    axios.post(`/api/events/${this.props.match.params.id}/comments`, this.state.comment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.setState({ comment: { text: '' } }, ()=>this.getData()))
      .catch(err => console.log(err.response))
  }

  handleCommentDelete(comment) {
    axios.delete(`/api/events/${this.props.match.params.id}/comments/${comment._id}`, {
      headers: { 'Authorization': Auth.getToken() }
    })
      .then(() => this.getData())
      .catch(err => console.log(err.response))
  }

  handleCommentChange({ target: { name, value } }) {
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })
  }

  isOwner() {
    return Auth.getPayload().sub === this.state.event.user._id
  }

  isOwnerComment(comment) {
    console.log()
    return Auth.getPayload().sub === comment.user._id
  }

  isAttending() {
    return this.state.event.attendees.some(attendee => attendee.user._id === Auth.getPayload().sub)
  }

  handleDelete() {
    axios.delete(`/api/events/${this.props.match.params.id}  `, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/index'))
      .catch(err => console.log(err.response))
  }


  render() {
    if (!this.state.event) return null
    console.log('State:',this.state)
    const { event } =  this.state
    return (
      <section className="event-show form-container">
        <div className="container">
          <h2 className="title form-title">
            <img src={`../assets/img/${event.category}-${event.subcategory}-${event.imageId}.jpeg`} className="event-photo" />
            {event.name}
          </h2>
          <div className="event-owner">
            <Link to={`/users/${event.user._id}`} className="link">
              <img className="avatar" src={event.user.picture} title={event.user.username}/>
            </Link>
            <Link to={`/users/${event.user._id}`} className="link username">
              {event.user.username}
            </Link>
            {this.isOwner() &&
              <button onClick={this.handleDelete}  className="button">Delete</button>
            }
            {this.isOwner() &&
              <Link className="button" to={`/events/${event._id}/edit`}>Edit</Link>
            }
          </div>
          <h4 className="title">Description</h4>
          <p>{event.description}</p>
          <hr />

          <div className="event-section">
            <div>
              <h4 className="title">Date</h4>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="title">Location</h4>
              <p>{event.postcode}</p>
            </div>
            <div>
              <h4 className="title">Cost</h4>
              <p>{event.priceTBC ? 'Price to be confirmed' : event.price ? `£${event.price}` : 'Free' }</p>
            </div>
          </div>

          <hr />

          <div className="event-section">
            <div>
              <h4 className="title popup dotted">
                {event.attendees.length > 0 &&
                  <div className="popup-content">
                    {event.attendees.map((attendee,i) =>
                      <Link to={`/users/${attendee.user._id}`} key={i} className="link">
                        {attendee.user.username}
                        <img className="attendee-avatar" src={attendee.user.picture}/>
                      </Link>
                    )}
                  </div>
                }
                <span className="dotted">
                  {event.attendees.length} {event.attendees.length === 1 ? 'attendee' : 'attendees'}
                </span>
              </h4>
              <p>{event.totalAttendees - event.attendees.length} spaces remaining</p>
            </div>
            { !this.isOwner() &&
              Auth.isAuthenticated() &&
              event.totalAttendees - event.attendees.length > 0 &&
              <button onClick={this.handleAttend} className="button">
                {this.isAttending() ? 'Leave this event' : 'Attend this event'}
              </button>
            }
            { this.isAttending() &&
              Auth.isAuthenticated() &&
              event.totalAttendees - event.attendees.length === 0 &&
              <button onClick={this.handleAttend} className="button">
                {this.isAttending() ? 'Leave this event' : 'Attend this event'}
              </button>
            }
          </div>

          { (this.isAttending() || this.isOwner()) && Auth.isAuthenticated() && <hr />}
          { (this.isAttending() || this.isOwner()) && Auth.isAuthenticated() &&
            event.comments.map(comment =>
              <Comment
                key={comment._id}
                comment={comment}
                isOwnerComment={this.isOwnerComment}
                handleCommentDelete={this.handleCommentDelete}
              />)
          }
          { (this.isAttending() || this.isOwner()) && Auth.isAuthenticated() &&
            <CommentForm
              text={this.state.comment.text}
              handleCommentChange={this.handleCommentChange}
              handleCommentSubmit={this.handleCommentSubmit}
            />
          }

        </div>
      </section>
    )
  }
}

export default EventsShow
