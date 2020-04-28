import React from 'react';
import Ball from './Ball/Ball'
import './WinningRow.css'
import { totalChance } from '../../functions/probabilities';

const WinningRow = props => {
    return (
        <div className="WinningRow">
            <Ball>{props.row[0][0].number}</Ball>
            <Ball>{props.row[0][1].number}</Ball>
            <Ball>{props.row[0][2].number}</Ball>
            <Ball>{props.row[0][3].number}</Ball>
            <Ball>{props.row[0][4].number}</Ball>
            +
            <Ball>{props.row[1][0].number}</Ball>
            <Ball>{props.row[1][1].number}</Ball> = {totalChance(props.row[0], props.row[1]).toFixed(2)}%
        </div>
    )
}

export default WinningRow