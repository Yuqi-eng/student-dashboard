import React, { useState, useEffect } from 'react'

function Dropdown ({handleSelect}) {
    const [selected, setSelected] = useState([])
    const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('http://localhost:4001/getCourses')
      .then(res => res.json())
      .then(data => setCourses(data))
  }, [])

  useEffect(() => {
    if (courses.length > 0){
        //console.log(courses)
        const currentCourses = courses.filter(course => !course.access_restricted_by_date)
        console.log(currentCourses)
        const options = currentCourses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)
        const firstID = currentCourses[0].id
        handleSelect(firstID)
        setSelected(options)
    }
}, [courses, handleSelect])

function change (e){
    handleSelect(e.target.value)
    //console.log(e.target.value)
}

return (
    <div>
        <label htmlFor='courses'>Choose a course:
        </label>
        <select id='courses' onChange={change}>
            {selected}
        </select>
    </div>
)
    
}

export default Dropdown
