import React, {useEffect} from 'react';
import luckysheet from 'luckysheet';
import {api} from '../api-data';

function LuckySheet() {
    useEffect(() => {
        api().then(res => {
            luckysheet.create({
                container: "luckysheet",
                title: 'Luckysheet sphinx Demo', // set the name of the table
                data: [res],
            })
        }).catch(error => {
            console.log(error);
        })


    }, [])


    const luckyCss = {
        margin: '0px',
        padding: '0px',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px'
    }
    return (
        <div
            id="luckysheet"
            style={luckyCss}
        />
    );
}

export default LuckySheet;
