# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project

# #3: Buddle

## Overview

The third project is to  **build a full-stack React application** that comprises of a **back-end and front-end**.

### Technical Requirements

Before we started the project we were given this brief, we were told that our app must:

* **Have a back-end** – this had to be created using node.js and Express.
* **Have several components** - At least one classical and one functional.
* **Include a router** - with several "pages".
* **Be deployed online** and accessible to the public.
---
# Software Engineering Immersive: Project 3
This is my third project during the General Assembly Software Engineering Immersive course. The project was made in collaboration with Tom Tidswell (https://github.com/tomtidswell) and Sim Brar (https://github.com/simbrar1). In total we had eight days to complete this project and used collaborative tools such as Slack and Trello to work together.

---

# Buddle

An app where users can share events they are planning to attend or host. Other users can then choose whether to attend those events.

## Built using

1. HTML5
2. SCSS
3. JavaScript
4. React.js
5. Consumes the Random User Generator API via the HTTP client Axios.


## Deployment

This app is deployed on Heroku and it can be found here: https://buddle-sst.herokuapp.com/


### Building the API

We seeded a number of events in our back end using our event model schema and used Axios to make requests. We also used an open source API from randomuser.me to generate user placeholders which each had profiles created for them.


### Functionality

Without being logged in, users can only navigate events by either viewing them all or using the filter function. They can see who has created events and attendees as well as access their profiles but are unable to create events or opt to attend them. Once registered, they are assigned a profile to fill in with an image and a short bio and can then unlock the ability to create/edit/delete events and attend others' events. Once attending, they can then create and delete comments on events. We chose to include a comment function so that the address of the event can be shared privately rather than being shown to even non-attendees.

### Contribution, blockers and wins

I contributed towards building the back-end, creating the information for the events to be seeded. I also found the API we used to generate random users. In React, I created the forms we used throughout the app using the React Select package for the conditional dropdown component. This was a real challenge as I was not used to building a form input in such a way; the options for the inputs had be written as an array, with each option corresponding to a value which was changed using a handleChange function, like so: 

``` 
  const EventsForm = ({ data, handleChange, handleCatChange, handleSubCatChange, handleAttChange, handleSubmit, buttonText }) => {

  const category = [
    { value: 'sports', label: 'Sports/Leisure' },
    { value: 'skills', label: 'Skills' },
    { value: 'experiences', label: 'Experiences' },
    { value: 'pet-playdates', label: 'Pet Playdates' }
  ]

  const subcategory = [
    { value: 'football', label: 'Football', link: 'sports' },
    { value: 'tennis', label: 'Tennis', link: 'sports' },
    { value: 'hockey', label: 'Hockey', link: 'sports' },
    { value: 'basketball', label: 'Basketball', link: 'sports' },
    { value: 'other', label: 'Other', link: 'sports' },
    { value: 'languages', label: 'Languages', link: 'skills' },
    { value: 'music', label: 'Music', link: 'skills' },
    { value: 'art', label: 'Art', link: 'skills' },
    { value: 'other', label: 'Other', link: 'skills' },
    { value: 'museum', label: 'Museum', link: 'experiences' },
    { value: 'gallery', label: 'Gallery', link: 'experiences' },
    { value: 'wildlife', label: 'Zoo/Wildlife', link: 'experiences' },
    { value: 'tours', label: 'Tours', link: 'experiences' },
    { value: 'other', label: 'Other', link: 'experiences' },
    { value: 'dogs', label: 'Dogs', link: 'pet-playdates' },
    { value: 'cats', label: 'Cats', link: 'pet-playdates' },
    { value: 'other', label: 'Other', link: 'pet-playdates' }
  ]

  const invites = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ]

  let filteredOptions = null

  if (data.category)
    filteredOptions = subcategory.filter(o => o.link === data.category) ```
    

I was also responsible for most of the styling of the app and decided on a simple, modern palette of black, white and pink. I mapped each event's main information onto cards on the index page and gave each card a slight box shadow in order to improve readability and make it look as if the cards had been placed on top of the page. I made the filter option a sticky element so that it moves along vertically when the user scrolls past the bottom of the page. I also installed a burger menu package and implemented it with the help of my group.

## Future Scope
In order to further improve Buddle we could delete events once they have taken place. We could also add the option of sharing any images from the event between the attendees. Instead of any user being able to attend any event, we could also have them apply for a place instead so that the host can decide whether they want to allow the user to attend or not.

## Key Learnings
This was my first experience of working in a group where we were all working on the app at the same time but not allowed to work on the same files for fear of disrupting the branch merges. It was a very good exercise in communicating with the rest of a team in order to ensure the app was built as smoothly as possible.

