import React, { useState, useEffect } from 'react'
import Heatmap from './Heatmap'
import Dropdown from './Dropdown'

function Discussion () {
  const [discussion, setDiscussion] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [selected, setSelected] = useState(null)

  // add useEffect here for discussion
  useEffect(() => {
    if (selected){
      fetch('http://localhost:4001/getDiscussions/'+selected)
      .then(res => res.json())
      .then(data => setDiscussion(data))
    }
  }, [selected])

  useEffect(() => {
    if (discussion.length > 0) {
      const discussionTimestamps = discussion
        .map(discussion => discussion.timestamp)

      setTimestamps(discussionTimestamps)
    }
  }, [discussion])

  return (
    <div> 
      <Heatmap timestamps={timestamps} />
      <Dropdown handleSelect={setSelected} />
    </div>
  )
}

export default Discussion
