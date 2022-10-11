import { useEffect, useState } from 'react'
import './App.css'


const randomColorGen = () => {
  const random = Math.floor(Math.random() * ((255*255*255) - 1 ) + 1)
  return '#' + random.toString(16)
}


enum Results {
  Correct = 'Correct', Incorrect = 'Incorrect'
}

function App() {
  const [currentColor, setCurrentColor] = useState('');
  const [options, setOptions] = useState<string[]>([])
  const [isCorrect, setResult] = useState<Results | undefined>()

  const colorSetterFunction = () => {
    const actualColor = randomColorGen()
    const options = [actualColor, randomColorGen(), randomColorGen()]
    setCurrentColor(actualColor)
    setOptions(options.sort(() => 0.5 - Math.random() ))
  }

  const handleOptionSelection = (option: string) => {
    if (option === currentColor) {
      setResult(Results.Correct)
      colorSetterFunction()
    } else {
      setResult(Results.Incorrect)
    }
  }

  useEffect(() => {
    colorSetterFunction()
  }, [])

  return (
    <div className="App">
      <div id='colorBox' style={{background: currentColor, border: '1px'}}/>
      <div id='optionsContainer'>
      {
        options.map((option) => {
          return <button onClick={() => {
            handleOptionSelection(option)
          }}>{option.toUpperCase()}</button>
        })
      }  
      </div>
      <span style={{color: isCorrect === Results.Correct ? 'green' : 'red'}}>{isCorrect}</span>
    </div>
  )
}

export default App
