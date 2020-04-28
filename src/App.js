import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import scrapeNumbers from './functions/scrapeNumbers'
import { processArrays, arrangeResults } from './functions/formatting'
import calculateWinners from './functions/calculateWinners'
import WinningRow from './components/WinningRow/WinningRow'
import Spinner from './components/Spinner/Spinner'

const App = () => {

  const [resultArray, setResults] = useState([])
  const [mainInput, setMainInput] = useState(1)
  const [euroInput, setEuroInput] = useState(1)
  const [loaded, setLoaded] = useState(true)

  const getResults = async (mainCombos, euroCombos) => {
    setLoaded(false)
    try {
      const scrapedNumbers = await scrapeNumbers()
      const mains = processArrays(scrapedNumbers).mains
      const euros = processArrays(scrapedNumbers).euros
      const winningMains = calculateWinners(mains, 5, 3, mainCombos)
      const winningEuros = calculateWinners(euros, 2, 1, euroCombos)
      const results = await arrangeResults(winningMains, winningEuros)
      setResults(results)
    }
    catch (err) {
      console.error('Something went wrong.', err)
      setResults([])
    }
    finally {
      setTimeout(() => { setLoaded(true) }, 2000)
    }
  }

  const resArray = resultArray.map(r => { return <WinningRow row={r} />})

  return (
    <div className="Main">
      <div className="SidePanel">
        <div>
          <p>Amount of main number combos:</p>

          <input 
            className="form-control-lg"
            type="number" 
            value={mainInput} 
            onChange={e => {
              if (e.target.value < 1) e.target.value = 1
              setMainInput(e.target.value)}
            }></input>

          <p>Amount of euro number combos:</p>
          <input 
            className="form-control-lg"
            type="number" 
            value={euroInput} 
            onChange={e => {
              if (e.target.value < 1) e.target.value = 1
              setEuroInput(e.target.value)}
            }></input>

          <button style={{display: 'block', textAlign: 'center'}} className="btn btn-lg btn-primary" onClick={() => { getResults(mainInput, euroInput) }}>Start winning</button>
        </div>
      </div>
      <div className="RowArea">
        {loaded ? resArray : <Spinner/>}
      </div>
    </div>
  )
}

export default App;