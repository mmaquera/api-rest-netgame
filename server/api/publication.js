'use strict'

const express = require('express')
const moment = require('moment')
const async = require('async')

const Publication = require('../models/publication')
const Comment = require('../models/comment')
const UserComment = require('../models/userComment')
const UserPublication = require('../models/userPublication')
const User = require('../models/user')

let objResponse = require('../utils')

const router = express.Router()

router.post('/game/publication/create', (req, res) => {

  let publication = new Publication()
  publication.title = req.body.title
  publication.description = req.body.description
  publication.dateRegister = moment().format()
  publication.idGame = req.body.idGame
  publication.idUser = req.sessionInformation.idUser

  publication.save((err, publicationStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
    
    res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
  })

})

router.get('/game/publication/:idPublication', (req, res) => {
  Publication.findOne({_id: req.params.idPublication},'_id title description dateRegister', (err, publication) => {

    let resp = {
        publication: publication,
        comments: []
      }

    Comment.find({idPublication: req.params.idPublication}, (err, comments) => {

      async.eachSeries(comments, (comment, callback) => {

        async
        .series({
          getUser: callback => {
            User.findOne({_id: comment.idUser}, (err, user) => {
              callback(null, user)
            })
          },
          getUserComment: callback => {
            UserComment.findOne({idUser: comment.idUser}, (err, userComment) => {
              callback(null, userComment)
            })
          }
        }, (err, results) => {
          const userInfo = results.getUser
          const userComment = results.getUserComment

          let objUserComment = {
            userName: userInfo.userName,
            description: comment.description,
            like: 0,
            flag: 0,
            dateRegister: comment.date
          }

          if (userComment) {
            objUserComment.like = userComment.like
          }

          if(req.sessionInformation.idUser == comment.idUser) {
            objUserComment.flag = 1
          }

          resp.comments.push(objUserComment)
          callback()

        })

      }, (err, results) => {
        res.status(200).send(objResponse.ok(resp, 'Realizado satisfactoriamente'))
      })

    })

  })
})

router.get('/game/publications/:idGame', (req, res) => {

  async.series({
    publications: callbackAsync => {
      Publication.find({idGame: req.params.idGame}, (err, publications) => {
        if (err) return callbackAsync(new Error('El codigo del usuario y del juego'))
        callbackAsync(null, publications)
      })
    }
  }, (err, results) => {

    let publications = results.publications

    let publicationResult = []

    async.eachSeries(publications, (publication, callback) => {

      UserPublication.findOne({idUser: req.sessionInformation.idUser, idPublication: publication._id}, (err, userPublication) =>{
        
        let obj = {
          _id: publication._id,
          title: publication.title,
          description: publication.description,
          dateRegister: publication.dateRegister,
          like: 0,
          favorite: 0
        }

        if (userPublication) {
          obj.like = userPublication.like
          obj.favorite = userPublication.favorite
        }

        publicationResult.push(obj)
        callback()
      })
      
    }, (err, result) => {
      res.status(200).send(objResponse.ok(publicationResult, 'Realizado satisfactoriamente'))
    })

  })

})

router.post('/game/publication/like', (req, res) => {

  UserPublication.findOne({idUser: req.sessionInformation.idUser, idPublication: req.body.idPublication}, (err, userPublication) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    if (userPublication){
      userPublication.like = req.body.like
      userPublication.save((err, userPublicationUpdate) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
      })

    } else {
      const userPublicationInsert = new UserPublication()
      userPublicationInsert.like = req.body.like
      userPublicationInsert.favorite = 0
      userPublicationInsert.idUser = req.sessionInformation.idUser
      userPublicationInsert.idPublication = req.body.idPublication
      userPublicationInsert.save((err, userPublicationStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
      })
    }

  })

})

router.post('/game/publication/favorite', (req, res) => {
  UserPublication.findOne({idUser: req.sessionInformation.idUser, idPublication: req.body.idPublication}, (err, userPublication) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    if (userPublication){
      userPublication.favorite = req.body.favorite
      userPublication.save((err, userPublicationUpdate) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
      })

    } else {
      const userPublicationInsert = new UserPublication()
      userPublicationInsert.like = 0
      userPublicationInsert.favorite = req.body.favorite
      userPublicationInsert.idUser = req.sessionInformation.idUser
      userPublicationInsert.idPublication = req.body.idPublication
      userPublicationInsert.save((err, userPublicationStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
      })
    }

  })
})

module.exports = router