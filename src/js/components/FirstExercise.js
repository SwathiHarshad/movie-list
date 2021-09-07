import React from 'react';

export default function FirstExercise(props){
  return(
    <>
      <div className="exercise-header">
        <h2>Exercise 1 - Testimonial Block</h2>
      </div>

      <div>
        <div className="display-flex help--container">
          <div className="help">
            <span className="quotation">&#8220;</span>
            <p className="font-normal">Gingerbread tart cupcake cake muffin cookie liquorice tiramisu. Toffee cupcake cake cake croissant icing carrot cake cookie. Dessert chocolate bar apple pie sesame snaps liquorice carrot cake cookie danish.</p>
            <span className="endBlock">Indiana Jones, Archaeologist</span>
            <span className="point-style-css">&nbsp;</span>
          </div>
          <a className="font-normal">Tell Me More</a>
        </div>
      </div>
      <div className="exercise-header">
        <h2>Exercise 2 - Filterable Content</h2>
      </div>

      <div className="curser-pointer" onClick={()=>props.setExercise()}>Click Here for Exercise 2 </div>
    </>
  )
}