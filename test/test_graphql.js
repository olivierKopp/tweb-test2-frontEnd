import graphql, { createUser, createMessage, deleteMessage, like, unlike, follow,unfollow, getUserByEmail, getFollowers, getFollowings, getUser, getMessages } from '../src/scripts/graphQL';
import { assert,should,expect } from "chai";
import { string } from 'prop-types';


describe("We tests all our graphQL queries",  () =>{

  let userAId;
  let userBId;
  let messageId;
  
  it("Should be possible to retrieve a user from the database",(done) => {
    const userEmail = "toto@tutu.tata";
    getUserByEmail(userEmail).then(data => {
      const email = data.email
      userAId = data.id;
      assert.equal(userEmail, email)
      done()
    })
  })

  it("Should be possible to create a new user", (done) => {
    const email = "testing@test.com";
    const username = "test";
    const password = "test";
    createUser("testing@test.com","test","test")
    .then(data => {
      userBId = data.id;
      assert.isNotNull(data)
      getUser(data.id)
      .then(data => {
        assert.equal(data.username, username);
        assert.equal(data.email, email);
        done()
      })
    })
  })

  it("Should not create a new user in the DB if he already exist", (done) => {
    createUser("testing@test.com","test","test").then(data => {
      assert.isNull(data)
      done()
    })
  })


  it("Should be possible to create a message", (done) =>{
    const messageContent = "Testing";
    createMessage(userBId,messageContent).then(data => {
      assert.isNotNull(data);
      messageId = data.id;
      getMessages(userBId, 0)
      .then(data => {
        data = data.getMessagesFromDB;
        assert.equal(data.length, 1)
        assert.equal(data[0].content, messageContent);
        done();
      })
    })
  })
  
  it("should be possible to like a message",(done) =>{
    like(messageId,userBId).then(data =>{
      assert.isTrue(data)
      getMessages(userBId, 0)
      .then(data => {
        data = data.getMessagesFromDB;
        assert.equal(data[0].like.length, 1);
        assert.equal(data[0].like[0], userBId);
        done();
      })
    })
  })
  
  it("should be possible to unlike a message",(done) =>{
    unlike(messageId,userBId).then(data =>{
      assert.isTrue(data)
      getMessages(userBId, 0)
      .then(data => {
        data = data.getMessagesFromDB;
        assert.equal(data[0].like.length, 0);
        done();
      })
    })
  })

  
  it("should be possible to follow another user",(done) =>{
    follow(userAId,userBId).then(data =>{
      assert.isTrue(data)
      getUser(userAId)
      .then(data => {
        assert.equal(data.followers.length, 1);
        assert.equal(data.followers[0], userBId);
        getUser(userBId)
        .then(data => {
          assert.equal(data.following.length, 1);
          assert.equal(data.following[0], userAId);
          done()
        })
      })
    })
  })

  it("should be possible to unfollow a user",(done) =>{
    unfollow(userAId,userBId).then(data =>{
      assert.isTrue(data)
      getUser(userAId)
      .then(data => {
        assert.equal(data.followers.length, 0);
        getUser(userBId)
        .then(data => {
          assert.equal(data.following.length, 0);
          done()
        })
      })
    })
  })

  
  it("should be possible to delete a message", (done) => {
    deleteMessage(messageId,userBId).then(data => {
      assert.isTrue(data)
      getMessages(userBId, 0)
      .then(data => {
        data = data.getMessagesFromDB;
        assert.isNull(data);
        done();
      })
    })
  })

})
