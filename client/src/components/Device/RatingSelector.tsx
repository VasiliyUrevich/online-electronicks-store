import React, { useState } from 'react'

export const RatingSelector = ({isActive, setIsActive}:{isActive:boolean, setIsActive:Function}) => {
    const [fillStar, setFillStar] = useState(0)
    const [fillStarHover, setFillStarHover] = useState(0)

    const [isRated, setIsRated] = useState(false)


    if (isRated)return(
        <div className={isActive?'raiting-selector active':'raiting-selector'} onClick={()=>setIsActive(false)}>
            <div className="raiting-selector__box"  onClick={e => e.stopPropagation()}>
                <h2 className='raiting-selector__title'>Ваша оценка</h2>
                <div className="raiting-selector__stars">
                {
                    Array(fillStar).fill("/star-filled.png").map((item, index) => 
                        <img src={item} onClick={()=>setIsRated(!isRated)}  key={index} alt="" className="raiting-selector__star" />
                    )
                }
                {
                    Array(5 - fillStar).fill("/star.png").map((item, index) => 
                        <img src={item} onClick={()=>setIsRated(!isRated)} key={index} alt="" className="raiting-selector__star" />
                    )
                }
                </div>
            </div>
        </div>
    )

  return (
    <div className={isActive?'raiting-selector active':'raiting-selector'} onClick={()=>setIsActive(false)}>
        <div className="raiting-selector__box" onClick={e => e.stopPropagation()}>
            <h2 className='raiting-selector__title'>Оцените продукт</h2>
            <div className="raiting-selector__stars">
                <div className="raiting-selector__stars-not-filled" onMouseOut={() => setFillStarHover(0)}>
                    {
                        Array(5).fill("/star.png").map((item, index) => 
                            <img src={item} onClick={()=>{setFillStar(index+1); setIsRated(!isRated)}} onMouseOver={() => setFillStarHover(index+1)} key={index} alt="" className="raiting-selector__star" />
                        )
                    }
                </div>
                <div className="raiting-selector__stars-filled">
                    {
                        Array(fillStarHover).fill("/star-filled.png").map((item, index) => 
                            <img src={item}  key={index} alt="" className="raiting-selector__star-filled" />
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
