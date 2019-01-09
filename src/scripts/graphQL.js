import axios from 'axios';

export function createMessage (authorId, content) {
  const queryToSend = {
    query: 'query CreateMessage($authorId: String!, $content: String!){createMessage(authorId: $authorId, content: $content){id}}',
    variables: {
      authorId: authorId,
      content: content,
    },
    headers: {
      'Content-type': 'application/json'
    }
  }

  return axios({
    url: 'https://test2-back-end.herokuapp.com/graphql',
    method: 'post',
    data: queryToSend
  })
  .then(response => response.data.data.createMessage)
  .catch(error => {
  })
}

export function deleteMessage(messageId, authorId){
  const queryToSend = {
    query: 'query DeleteMessage($messageId: String!, $authorId: String!){deleteMessage(messageId: $messageId, authorId: $authorId)}',
    variables: {
      messageId: messageId,
      authorId : authorId
    },
    headers: {
      'Content-type': 'application/json'
    }
  }

  return axios({
    url: 'https://test2-back-end.herokuapp.com/graphql',
    method: 'post',
    data : queryToSend
    })
    .then(response => response.data.data.deleteMessage)
    .catch(error => {
    })
}

export function getUser(userId){
  const queryToSend = {
    query: 'query GetUser($userId: String!){getUser(userId: $userId){username, image, email, following, followers, id}}',
    variables: {
      userId: userId,
    },
    headers: {
      'Content-type': 'application/json'
    }
  }

  return axios({
    url: 'https://test2-back-end.herokuapp.com/graphql',
    method: 'post',
    data : queryToSend
    })
    .then(response => response.data.data.getUser)
    .catch(error => {
    })
}

export function getMessages(authorId, offset) {
  const queryToSend = {
    query: 'query GetMessagesFromDB($authorId: String!, $offset: Int!){getMessagesFromDB(authorId: $authorId, offset: $offset){id, like, content, authorId}}',
    variables: {
      authorId: authorId,
      offset: offset,
    },
    headers: {
      'Content-type': 'application/json'
    }
  }

  return axios( {
    url: 'https://test2-back-end.herokuapp.com/graphql',
    method: 'post',
    data: queryToSend
  })
  .then(response => response.data.data)
  .catch(error => {
  });
}

export function createUser (email, username, password){
  const queryToSend = {
    query: 'query CreateUser($username: String!, $password: String!, $email: String!){createUser(username: $username, password: $password, email: $email){id}}',
    variables: {
      email: email,
      username: username,
      password: password,
    },
    headers: {
      'Content-type': 'application/json'
    }
  }

  return axios({
    url: 'https://test2-back-end.herokuapp.com/graphql',
    method: 'post',
    data : queryToSend
    })
    .then(response => response.data.data.createUser)
    .catch(error => {
    })
  }

  export function like(messageId, userId){
    const queryToSend = {
      query: 'query Like($messageId: String!, $userId: String!){like(messageId: $messageId, userId: $userId)}',
      variables: {
        messageId: messageId,
        userId: userId
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.like)
      .catch(error => {
      })
  }

  export function unlike(messageId, userId){
    const queryToSend = {
      query: 'query Unlike($messageId: String!, $userId: String!){unlike(messageId: $messageId, userId: $userId)}',
      variables: {
        messageId: messageId,
        userId: userId
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.unlike)
      .catch(error => {
      })
  }

  export function hasLike(messageId, userId){
    const queryToSend = {
      query: 'query HasLike($messageId: String!, $userId: String!){hasLike(messageId: $messageId, userId: $userId)}',
      variables: {
        messageId: messageId,
        userId: userId
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.hasLike)
      .catch(error => {
      })
  }

  export function follow(targetId, userId){
    const queryToSend = {
      query: 'query Follow($targetId: String!, $userId: String!){follow(targetId: $targetId, userId: $userId)}',
      variables: {
        targetId: targetId,
        userId: userId
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.follow)
      .catch(error => {
      })
  }


  export function unfollow(targetId, userId){
    const queryToSend = {
      query: 'query Unfollow($targetId: String!, $userId: String!){unfollow(targetId: $targetId, userId: $userId)}',
      variables: {
        targetId: targetId,
        userId: userId
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.unfollow)
      .catch(error => {
      })
  }

  export function hasFollow(targetId, userId){
    const queryToSend = {
      query: 'query HasFollow($targetId: String!, $userId: String!){hasFollow(targetId: $targetId, userId: $userId)}',
      variables: {
        targetId: targetId,
        userId: userId
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.hasFollow)
      .catch(error => {
      })
  }

  export function getUserByEmail(email){
    const queryToSend = {
      query: 'query  GetUserByEmail($email: String!){getUserByEmail(email: $email){id, username, email}}',
      variables: {
        email: email,
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.getUserByEmail)
      .catch(error => {
      })
  }

  export function getFollowers(userId){
    const queryToSend = {
      query: 'query  GetFollowers($userId: String!){getFollowers(userId: $userId){id}}',
      variables: {
        userId: userId,
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.getFollowers)
      .catch(error => {
      })
  }

  export function getFollowings(userId){
    const queryToSend = {
      query: 'query GetFollowings($userId: String!){getFollowings(userId: $userId){id}}',
      variables: {
        userId: userId,
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.getFollowings)
      .catch(error => {
      })
  }

  export function searchUser(pattern){
    const queryToSend = {
      query: 'query SearchUser($pattern: String!){searchUser(pattern: $pattern){username, image, email, following, followers, id}}',
      variables: {
        pattern: pattern,
      },
      headers: {
        'Content-type': 'application/json'
      }
    }
  
    return axios({
      url: 'https://test2-back-end.herokuapp.com/graphql',
      method: 'post',
      data : queryToSend
      })
      .then(response => response.data.data.searchUser)
      .catch(error => {
      })
  }
