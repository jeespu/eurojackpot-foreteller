export const totalChance = (mainNumbers, euroNumbers) => {
    return ((mainNumbers[0].nextDrawProbability / 100) * (mainNumbers[1].nextDrawProbability / 100) * 
        (mainNumbers[2].nextDrawProbability / 100) * (mainNumbers[3].nextDrawProbability / 100) * 
        (mainNumbers[4].nextDrawProbability / 100) * (euroNumbers[0].nextDrawProbability / 100) *
        (euroNumbers[1].nextDrawProbability / 100)) * 100
    }

export const nextDrawProbability = (drawsFromLast, numberChance) => {
    if (drawsFromLast === 0) {
        // When the number appeared last draw, the chance is "reset" to its normal chance
        return parseFloat((numberChance * 100).toFixed(2))
    }
    else {
        // 1-((1-numberChance)^drawsFromLast) - a basic probability calculus formula
        return parseFloat(((1 - Math.pow(( 1 - numberChance ), drawsFromLast+1)) * 100).toFixed(2))
    }
}