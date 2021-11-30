import React, {useEffect} from 'react';
import {api} from '../api-data';
import LuckyExcel from "luckyexcel";

const luckysheet = window.luckysheet;
function LuckySheet() {
    useEffect(() => {
        api().then(res => {
            luckysheet.create({
                container: "luckysheet",
                title: 'Luckysheet sphinx Demo', // set the name of the table
                data: [res],
                plugins:['chart'],
                showinfobar: false
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
        top: '50px'
    }
    return (
        <div>
            <input type={"file"} onChange={(event) => {
                const files = event.target.files
                LuckyExcel.transformExcelToLucky(files[0], function(exportJson, luckysheetfile){

                    if(exportJson.sheets==null || exportJson.sheets.length===0){
                        alert("Failed to read the content of the excel file, currently does not support xls files!");
                        return;
                    }
                    luckysheet.destroy();

                    luckysheet.create({
                        container: 'luckysheet', //luckysheet is the container id
                        showinfobar:false,
                        data:exportJson.sheets,
                        title:exportJson.info.name,
                        userInfo:exportJson.info.name.creator
                    });
                });
            }}/>
            <div
                id="luckysheet"
                style={luckyCss}
            />
        </div>
    );
}

export default LuckySheet;
