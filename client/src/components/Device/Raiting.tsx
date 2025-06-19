import React from 'react'

const Raiting = ({raiting}:{raiting:number}) => {
  return (
    <div className='device__raiting'>
        {
            Array(raiting).fill("/star-filled.png").map((item, index) => 
                <img src={item} key={index} alt="" />
                
            )
        }
        {
            Array(5 - raiting).fill("/star.png").map((item, index) => 
                <img src={item} key={index} alt="" />
            )
        }
    </div>
  )
}

export default Raiting