import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'

const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
  // {props.expeses, props.handleDelete} = props => 구조분해할당
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return <ExpenseItem expense={expense} key={expense.id} handleDelete={handleDelete} handleEdit={handleEdit} />
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          목록 지우기
        </button>
      )}
    </>
  )
}
export default ExpenseList
