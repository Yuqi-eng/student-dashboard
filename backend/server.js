const express = require('express')
const app = express()
const cors = require('cors')
const port = 4001
const canvasAPI = require('node-canvas-api')
const { getDiscussions, flattenTopicAndReplies } = require('./canvasDiscussions')
//const readCSV = require('./readCSV')
const getCoursesByUser = require('node-canvas-api/src/getCoursesByUser')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

// Make API call to Canvas API here
canvasAPI.getSelf()
  .then(self => console.log(self))


// Make endpoint for getSelf here
app.get('/getSelf', async (req, res) => {
    // we need to now make a call to the Canvas API,
    // wait for the response, then send the result to the frontend
    const self = await canvasAPI.getSelf()
    res.json(self)
  })


// Make endpoint for getDiscussions here
app.get('/getDiscussions/:id', async (req, res) => {
    const id = req.params.id
    const discussions = await getDiscussions(id)
    const flatDiscussion = flattenTopicAndReplies(discussions)
    res.json(flatDiscussion)
  })


// make endpoint for getCourses
app.get('/getCourses', async (req, res) => {
    const self = await canvasAPI.getSelf()
    const courseID = await getCoursesByUser(self.id)
    res.json(courseID)
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
