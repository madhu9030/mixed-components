import React, {useContext} from 'react'
import UseDataProvider from "../provider";
import './progressBar.scss'

const ProgressBar = ({steps})=> {
  const {currentStep} = useContext(UseDataProvider);
  console.log(currentStep)
  return (
    <div className='tabs'>
    <div className='tab'>
      {steps && steps.map(step=> {
        return <div className='tab-cart'>{step}</div>
      })}
    </div>
    <div className={`progress-bar ${currentStep}`}><span className={currentStep}></span></div>
    </div>
  )
}

export default ProgressBar