import React from 'react';

import './ChartBar.css';


function ChartBar(props) {

    const ratio = props.maxValue > 0 ? props.value / props.maxValue : 0;
    const barFillHeight = `${Math.round(ratio * 100)}%`;
    const transformScale = `scaleY(${ratio})`;

    return (
        <div className='chart-bar'>
            <div className='chart-bar__inner'>
                <div className='chart-bar__fill' style={{height: '100%', transform: transformScale, opacity: ratio}}></div>
            </div>
            <div className='chart-bar__label'>{props.label}</div>
        </div>
    )
}

export default ChartBar;