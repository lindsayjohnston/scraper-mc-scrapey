import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { unparse } from 'papaparse';
import papa from "papaparse"
import {millionsBillionsString} from './millions-billions.js'

function App() {
  let tickerSymbols = "ABG,AMKR,AMR,AN,ARCB,ARL,ARLP,ASO,ATKR,BDCO,BLDR,CCS,CEIX,CEPU,CIVI,CPHC,CRT,CVCO,DDS,DHI,DYNR,ESCA,FL,GNE,GPI,GRBK,GRVY,HGBL,HIBB,HRB,HTLD,HUBG,HVT,IMMR,JFIN,LEN,LEN-B,LGIH,MCFT,MHO,MLI,MTH,MTR,MUSA,NMIH,NVR,OVLY,PAG,PFSI,PHM,PLPC,PRDO,QFIN,RLI,RS,RUSHB,SBR,SJT,SMCI,SNDR,SNEX,STG,STLD,TGS,TPH,ULH,VIPS,VLO,VSH,WIRE,WTI"
  // let tickerSymbols = "ABG,AMKR"
  let tickerSymbolsArray = tickerSymbols.split(",")
  const finalArray = []


  function getStuff() {
    setTimeout(async function () {
      const symbol = tickerSymbolsArray[0]
      let axiosError = false
      let confirmContinue = true
      let numberAlone = "error"
      
      const response = await axios.get(`https://finance.yahoo.com/quote/${symbol}/cash-flow/`)
        .catch(error => {
          error = true;
          let text = "Axios error. Do you want to continue?";
          let response = window.confirm(text)
          if (!response) {
            confirmContinue = false
            console.log("BREAKING!")
          }
        })
      // console.log(response.data)
      if (!axiosError && confirmContinue) {
        
        let finRowSplit = response.data.split("fin-row")
        if (finRowSplit === undefined) {
          console.log("finRowSplit undefined for " + symbol)
        } else {
          let fcfSection1 = finRowSplit[3]
          if (fcfSection1 === undefined) {
            console.log("fcfSection1 undefined for " + symbol)
          } else {
            let startsWithNumber = fcfSection1.split("--pnclg D(tbc)\" data-test=\"fin-col\"><span>")[1]
            if (startsWithNumber === undefined) {
              console.log("startsWithNumber  undefined for " + symbol)
            } else {
              numberAlone = startsWithNumber.split("</span>")[0]
              if (numberAlone === undefined) {
                console.log("numberAlone  undefined for " + symbol)
              } 
            }
          }
        }
      } else {
        console.log("Axios error at symbol: " + symbol)
      }

      let newRow = [symbol, numberAlone]
      finalArray.push(newRow)

      // newString += `${symbol};${numberAlone}\n`
      // const finalArray = newString.split(`\n`)
      console.log("Here's the array:")
      console.log(finalArray)
 
      tickerSymbolsArray = tickerSymbolsArray.slice("1")
      if (tickerSymbolsArray.length !== 0) {
        getStuff()
      } else{

        const csv = unparse(finalArray)
        download(csv)
      }
    }, 3000)
  }

  const download = function (data) {
    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: 'text/csv' });
 
    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob)
 
    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a')
 
    // Passing the blob downloading url
    a.setAttribute('href', url)
 
    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'download.csv');
 
    // Performing a download with click
    a.click()
}

const millionsBillionsHandler=()=>{
  let parsedCSV = papa.parse(millionsBillionsString).data
  const cleanedCSVArrays = []
  parsedCSV.forEach(array =>{
    let stringNumber = array[0]
    let mOrB
    if(stringNumber !== ""){
      if(stringNumber.includes("M")){
        mOrB = "M"
      } else if(stringNumber.includes("B")){
        mOrB = "B"
      } else{
        mOrB = "error"
      }
      stringNumber = stringNumber.replace("$","").replace("M","").replace("B","")
      let number = Number(stringNumber)
      if(mOrB === "M"){
        number = number * 1000000
      } else if(mOrB === "B"){
        number = number * 1000000000
      } else{
        number = "error"
      }
      let newRow = [number]
      cleanedCSVArrays.push(newRow)

    }
  })
  console.log("cleaned array:")
  console.log(cleanedCSVArrays)

  download(unparse(cleanedCSVArrays))
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getStuff}>Click to scrape</button>
        <button onClick={millionsBillionsHandler}>Change millions billions to numbers</button>

      </header>
    </div>
  );
}

export default App;
