import request from 'request-promise'
import cheerio from 'cheerio'
import { nextDrawProbability } from './probabilities'

export default async function scrapeNumbers() {

    const scrapedNumbers = []

    // Load the draw result statistics
    const result = await request.get('https://pacific-atoll-18652.herokuapp.com/https://www.euro-jackpot.net/en/statistics/number-frequency')
    if (result === undefined) return

    const $ = await cheerio.load(result)

    // Scrape total number of draws
    const totalDraws = parseInt($('#revision_info_all > .cols > :nth-child(3) > :nth-child(2)').text())
    
    // Scrape each table row
    $('#revision_table_all > table > tbody > tr').each((index, element) => {
        const tds = $(element).find('td') // Scrape all 'td' elements into a list
        const number = parseInt($(element).find('span').text()) // Scrape all numbers (1-50, 1-10)
        const timesDrawn = parseInt($(tds[1]).text()) // Scrape the amount they have been drawn
        const numberChance = parseFloat((timesDrawn / totalDraws)) // Calculate a chance for each number to appear
        const drawsFromLast = parseInt($(tds[5]).text()) // Scrape the amount of time from the last appearance

        // Create an object for the number
        const numberData = {
            number,
            drawsFromLast,
            nextDrawProbability: nextDrawProbability(drawsFromLast, numberChance),
            oddOrEven: undefined,
            highOrLow: undefined
        }

        // Define if the number is high or low
        // Index > 49 means euro numbers, <= 49 means main numbers
        if (index > 49) numberData.highOrLow = defineSize(numberData.number, 6)
        else if (index <= 49) numberData.highOrLow = defineSize(numberData.number, 26)

        // Define if the number is odd or even
        numberData.oddOrEven = defineRemainder(numberData.number)

        scrapedNumbers.push(numberData)
    })
    // Returns an array of "number objects"
    return scrapedNumbers
}

const defineSize = (num, breakpoint) => {
    if (num < breakpoint) return 'low'
    else return 'high'
}

const defineRemainder = num => {
    if (num % 2 === 0) return 'even'
    else return 'odd'
}