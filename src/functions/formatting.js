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

    return resultArray
}

// const stringifyResults = results => {
//     let stringArray = []

//     for (let i = 0; i < results.length; i++) {
//       let string = (( i + 1 ) + ": " +
//         results[i][0][0].number + ", " + results[i][0][1].number + ", " + results[i][0][2].number + ", " +
//         results[i][0][3].number + ", " + results[i][0][4].number + " + " + results[i][1][0].number + ", " + 
//         results[i][1][1].number) + " - " + totalChance(results[i][0], results[i][1]).toFixed(2) + "%"
//       stringArray.push(string)
//     }

//     return stringArray
//   }

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