let odds = 0, evens = 0, highs = 0, lows = 0

const calculateWinners = (data, amountOfNumbers, maxOfType, amountOfRows) => {
    let rows = []
    let numbers = []

    for (let j = 0; j < amountOfRows; j++) {
        for (let i = j; i < data.length; i++) {
            if (numbers.length < amountOfNumbers) {
                if (numberFits(data[i], maxOfType)) {
                    numbers.push(data[i])
                    addToCounters(data[i])
                }
            }
        }
        // console.log("Evens: ", evens, ", odds: ", odds, ", highs: ", highs, ", lows: ", lows)
        rows.push(numbers)
        // Reset counters for the next row
        numbers = []
        odds = 0
        evens = 0
        highs = 0
        lows = 0
    }
    
    return rows
}

const numberFits = (number, maxOfType) => {
    // Odd number limit reached
    if (odds === maxOfType && number.oddOrEven === 'odd') return false
    // Even number limit reached
    else if (evens === maxOfType && number.oddOrEven === 'even') return false
    else {
        // High number limit reached
        if (highs === maxOfType && number.highOrLow === 'high') return false
        else {
            // Low number limit reached
            if (lows === maxOfType && number.highOrLow === 'low') return false
            // The number fits
            else return true
        }
    }
}

const addToCounters = number => {
    if (number.oddOrEven === 'odd') {
        odds++
    }
    else {
        evens++
    }
    if (number.highOrLow === 'high') {
        highs++
    }
    else {
        lows++
    }
}

export default calculateWinners