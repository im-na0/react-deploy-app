import './App.css'
import React, { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import { Alert } from './components/Alert'

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 1600 },
    { id: 2, charge: '여가비', amount: 2500 },
    { id: 3, charge: '식비', amount: 500 },
  ])

  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState(0)

  const [edit, setEdit] = useState(false)
  const [id, setId] = useState('')

  const [alert, setAlert] = useState({ show: false, type: '', text: '' })

  const clearItems = () => {
    setExpenses([])
  }

  const handleEdit = (id) => {
    // id로 해당 객체 찾기
    const expense = expenses.find((item) => item.id === id)
    const { charge, amount } = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
    // setCharge(expense.charge)
    // setAmount(expense.amount)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      // 5초 뒤에 경고창 사라지기
      setAlert({ show: false, type: '', text: '' })
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (charge !== '' && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          // 새로 수정한 값으로 바꾸기
          return item.id === id ? { ...item, charge, amount } : item
        })

        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' })
      } else {
        // expense state에 새로운 객체를 만들어서 추가해주기 = state Update
        // state update 할 때는 항상 불변성을 지켜야한다.
        // 불변성을 지킨다는 것은 원본은 수정하지 않고 새로운 값을 만들어서 교체.

        // 1. 새로운 객체 생성
        const newExpense = { id: crypto.randomUUID(), charge, amount }
        const newExpenses = [...expenses, newExpense] // 복사 ===> spread operator 이용
        setExpenses(newExpenses)

        // 2. 초기화
        handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' })
      }
    } else {
      handleAlert({ type: 'danger', text: 'charge는 빈 값일 수 없으며, amount는 0보다 커야 합니다.' })
    }
    setCharge('')
    setAmount(0)
  }

  const handleCharge = (event) => {
    setCharge(event.target.value)
  }

  const handleAmount = (event) => {
    setAmount(event.target.valueAsNumber) // 값을 number 타입으로 가져옴
  }

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id)
    // state 변경을 위해서는 setState 이용
    setExpenses(newExpenses)
    // setExpenses({
    //   expense: newExpenses
    // })
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseForm handleSubmit={handleSubmit} charge={charge} handleCharge={handleCharge} amount={amount} handleAmount={handleAmount} edit={edit} />
      </div>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return acc + curr.amount
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  )
}
export default App
