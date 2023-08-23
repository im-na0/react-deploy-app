import React from 'react'
import './ExpenseItem.css'
import { MdEdit, MdDelete } from 'react-icons/md'

const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{expense.charge}</span>
        <span className="amount">{expense.amount} 원</span>
        <button
          className="edit-btn"
          onClick={() => {
            handleEdit(expense.id) // 콜백으로 아이디값 가져옴
          }}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            handleDelete(expense.id) // 콜백으로 아이디값 가져옴
          }}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  )
}
export default ExpenseItem
