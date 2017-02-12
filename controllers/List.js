const router = require('express').Router(),
  { List, Card } = require('../models')

router.post('/', (req, res) => {
  const body = req.body;

  req.assert('title', 'Title field is required').notEmpty();
  
  const errors = req.validationErrors();
  
  if (errors) {
    res.status(400).send(errors)
  } else {
  
    const list = new List({
      title : body.title,
      description: body.description,
      _board: body._board
    })

    list.save(function(err, list){
      if (err) {
        res.status(500).send('Something went wrong')
      }
      
      res.send({
        list
      })
    })
  }
})

module.exports = router