const fs = require('fs')

export const processArrays = scrapedNumbers => {
    // Split the array containing EVERY number into two arrays: main numbers and euro numbers
    // 50 main numbers, 10 euro numbers
    const mainNumbers = scrapedNumbers.slice(0, 50)
    const euroNumbers = scrapedNumbers.slice(50)

    // Sort the object arrays by next draw probability
    const sortedMains = sortByProbability(mainNumbers)
    const sortedEuros = sortByProbability(euroNumbers)

    // Now we have the number objects properly built and ordered
    return {
        mains: sortedMains,
        euros: sortedEuros
    }
}

// Arrange the winning rows neatly into one result array
export const arrangeResults = async (mains, euros) => {

    let resultArray = []
    for (let i = 0; i < euros.length; i++) {
      for (let j = 0; j < mains.length; j++) {
        resultArray.push([mains[j], euros[i]])
      }
    }
    fs.writeFileSync('../numbers.txt', resultArray)
    return resultArray
}

// A simple compare function for sorting arrays by their "next draw probability"
const sortByProbability = arr => {
    const newArr = arr.sort((a, b) => {
        if (b.nextDrawProbability > a.nextDrawProbability) {
            return 1
        }
        else {
            return -1
        }
    })
    return newArr
}