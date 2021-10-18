import './App.css';
import s from './App.css'
import { useState } from 'react'

const DB = [
  {id: 1, name: 'Ann', age: 30, position: "front-end dev"},
  {id: 2, name: 'Mike', age: 28, position: 'tech-support'},
  {id: 3, name: 'Gabie', age: 5, position: 'unemployed'}
]

function App() {

const [edit, setEdit] = useState(null)
const [people, setPeople] = useState(DB)


//точка 1 где значения пусты, это новые значения, нужны для 1) onChange ивента 2) для того чтобы установить нужные значения в функции редактирования 3) после того как они изменены, сохранить их в функции saveChanges
const [nameVal, setNameVal] = useState('')
const [ageVal, setAgeVal] = useState('')
const [positionVal, setPositionVal] = useState('')


//3я точка, в ней в значения не пусты, здесь реальные значения устанавливаются в пустые места, здесь мы юзаем сеттеры для установки значений, котороые презаполняют 
const editModeOn = (person) => {
  setEdit(person.id)
  setNameVal(person.name)
  setAgeVal(person.age)
  setPositionVal(person.position)
}


//здесь мы создаем новый массив, пробегаясь по нему, мы задаем каждому элементу объекта значение, которое ранее, благодаря ф-ии editModeOn мы засетали, а затем via onChange зафиксировали нужное значение
const saveChanges = (id) => {
 let newArr = [...people].map(el => {
    if(el.id === id){
      //это 1 объект персоны
      el.name = nameVal
      el.age = ageVal
      el.position = positionVal
    }
    return el
  })
  setPeople(newArr)
  setEdit(null)
}

  return (
    <table>
      <tbody>
        {people.map(el => (
          <tr key={el.id} onDoubleClick={()=> editModeOn(el)}>
            {edit !== el.id ? 
            <>
                <td><b>Name:</b> {el.name} </td>
                <td><b>Age:</b> {el.age} </td>
                <td><b>Position:</b> {el.position}</td>
            </>

            :

            <>
            
            {/* точка 2 где значения пусты, здесь мы все еще внутри цикла map, здесь мы просто фиксирем value на необходимом элементе объекта. И только благодаря onChange можем его изменять. Здесь мы все еще внутри цикла map и оперируем именно отдельными объектами массива people */}
                <input defaultValue={el.name} onChange={(e)=>setNameVal(e.target.value)}/>
                <input defaultValue={el.age} onChange={(e)=>setAgeVal(e.target.value)}/>
                <input defaultValue={el.position} onChange={(e)=>setPositionVal(e.target.value)}/>
                <button onClick={()=> saveChanges(el.id)}>Save</button>
            </>
          }
          </tr>
        ))}
      </tbody>
      </table>
        
  )  
     
         
}

export default App;








