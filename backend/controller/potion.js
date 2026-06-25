import model from "../model/potion.js"

function getPotions(request, response) {
    model.findAll().then(
    function (results) {
        response.json(results).status(200)
    }).catch(function (e) { console.log(e) })
}

function getPotionById(request, response) {
    model.findByPk(request.params.id).then(
    function (result) {
        response.json(result).status(200)
    }).catch(function (e) { console.log(e) })
}

function createPotion (request, response) {
    model.create(
        { 
            name: request.body.name, 
            description: request.body.description, 
            photo: request.body.photo, 
            value: request.body.value 
        }
    ).then(function (result) {
        response.status(201).json(result)
    }).catch(function (e) { console.log(e) })
}

function deletePotion(request, response) {
  model.destroy({ where: { id: request.params.id } })
    .then(function (res) {
      response.status(200).send()
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}

function updatePotion(request, response) {
  model.update(
      {
        name: request.body.name, 
        description: request.body.description, 
        photo: request.body.photo,
        value: request.body.value
      },
      { where: { id: request.params.id } },
    )
    .then(function (res) {
      response.status(200).send()
    }).catch(e =>  {
      response.json(e).status(500)
    })
}

export default {
  getPotions,
  getPotionById,
  createPotion,
  deletePotion,
  updatePotion
}