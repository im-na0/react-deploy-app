import React from 'react'
import './Alert.css'

export const Alert = ({ type, text }) => {
  return <div className={`alert alert-${type}`}>{text}</div>
}
