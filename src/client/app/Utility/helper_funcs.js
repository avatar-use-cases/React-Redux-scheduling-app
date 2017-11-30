export const parseEventJSON = (result, user, allUsers) => {
  let allEvents = [];
  result.map((node) => {
    let eventJSON = {};
    node["binding"].map((eventNode) => {
      if (eventNode["$"]["name"] == 'startTime' || eventNode["$"]["name"] == 'endTime') {
        eventJSON[eventNode["$"]["name"]] = eventNode["literal"][0]["_"];
      } else if (eventNode["$"]["name"] == 'organizers') {
        eventJSON[eventNode["$"]["name"]] = [];
        let organizer = findUsernameWithId(allUsers, eventNode["uri"][0].substring(30))
        eventJSON[eventNode["$"]["name"]].push(organizer)
      } else if (eventNode["$"]["name"] == 'interests') {
        eventJSON["interests"] = []
        eventJSON["interests"].push(eventNode["literal"][0]);
      } else if (eventNode["$"]["name"] == 'eventNode') {
        eventJSON["eventId"] = eventNode["uri"][0].substring(55)
      } else {
        eventJSON[eventNode["$"]["name"]] = eventNode["literal"][0];
      }
    })
    eventJSON["participants"] = []
    eventJSON["participants"].push(user)
    allEvents.push(eventJSON)
  })
  console.log(allEvents)
  return allEvents
}

export const parseUserJSON = (result) => {
  let overAll = [];
  result.map((node) => {
    let userJSON = {};
    node["binding"].map((userNode) => {

      if (userNode["$"]["name"] == 'user') {
        userJSON[userNode["$"]["name"]] = userNode["uri"][0].substring(30);
      } else {
        userJSON[userNode["$"]["name"]] = userNode["literal"][0];
      }
      console.log(userJSON)

    })
    if (userJSON["fullName"] != "" || userJSON["username"] != "") {
      overAll.push(userJSON)
    }
  })
  return overAll;
}

export const turnIdsToUsernames = (allUsers, event, key) => {
  let thisList = event[key].map((id) => {
    let this_person = allUsers.find((thisUser) => {
      return thisUser.user === id
    })
    return this_person.username;
  })
  return thisList
}

export const turnUsernamesToIds = (allUsers, event, key) => {
  let thisList = event[key].map((username) => {
    let person = allUsers.find((user) => {
      console.log(user)
      return user.username === username
    })
    console.log(person)
    return person.user;
  })
  console.log(thisList)
  return thisList
}

export const findContactsWithUserId = (allContacts, userId) => {
  let contactList = allContacts.find((contact) => {
    return contact.userId === userId
  })
  return contactList;
}

export const findUsernameWithId = (allUsers, id) => {
  let person = allUsers.find((user) => {
    return user.user === id
  })
  return person.username
}

export const findIdWithUsername = (allUsers, username) => {
  let person = allUsers.find((user) => {
    return user.username === username
  })
  return person.user
}
