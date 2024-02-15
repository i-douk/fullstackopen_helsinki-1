import React from 'react'

const  Course = ({courses}) => {
    return(<div>
              {courses.map((course)=>
                (
                <div key={course.id}>
                <h1>{course.name}</h1>
                  {course.parts.map((part)=>
                      <p key={part.id}>{part.name} {part.exercises}</p>
                    )}
                  <b>total of {course.parts.reduce((acc,sum)=>(acc+sum.exercises),0)} exercices</b>                
              </div>
              )
              )
            }
       </div>
    )
  }

export default Course