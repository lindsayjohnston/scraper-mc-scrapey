import logo from './diamond-hands.png';
import './App.css';
import axios from 'axios';
import { unparse } from 'papaparse';
import papa from "papaparse"

function App() {
  // let tickerSymbols = "ENRT,PREIF,ISIG,MARPS,RAVE,MXC,MTR,BDCO,KOSS,VASO,HHS,AXR,SRTS,HMENF,RCMT,HGBL,BRID,NRT,EPSN,ESEA,VOC,IPOOF,JAKK,JFIN,ALVOF,GENGF,EPM,JRNGF,AMPY,GPP,ASRT,TCI,DXLG,ARL,HDSN,GNE,UNTC,CAN,LEU,SJT,MCFT,IIIN,OBE,ZYME,SBOW,SD,CMPO,GPRK,KNSA,WTI,CCRN,ASTL,GSM,VTLE,REPX,UAN,BSIG,CLBT,MED,DMLP,SBR,EAF,SBGI,DVAX,GPOR,BKE,HCC,CEIX,VET,ARCH,AMR,BCC,ARLP,CALM,NOG,WIRE,JXN,ERF,BSM,DQ,BTU,MLI,SKY,LPX,MGY,ATKR,DDS,PBF,DOOO,CHRD,PDCE,WSM,OVV,CHK,SQM,APA,CF,STLD,BNTX,IMO,DVN,NUE,MRNA,VALE,EQNR"
  //let tickerSymbols = "AMR,AN,ARCB" //for testing
  let tickerSymbols = "AMR,AN,ARCB" //for testing
  let tickerSymbolsArray = tickerSymbols.split(",")
  const financingCashFlowFinalArray = [["Ticker", "Financing Cash Flow"]]
  const netIncomeArray = [["Ticker", "Net Income"]]
  const operatingCashFlowArray = [["Ticker", "Operating Cash Flow"]]


  function getFinancingCashFlow() {
    disableScraperButtons()
    setTimeout(async function () {
      const symbol = tickerSymbolsArray[0]
      let axiosError = false
      let confirmContinue = true
      let numberAlone = "error"

      const response = await axios.get(`https://finance.yahoo.com/quote/${symbol}/cash-flow`)
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
        let financingCashFlowSplit = response.data.split(`Financing Cash Flow`)[3]
        if (financingCashFlowSplit === undefined) {
          console.log("financingCashFlowSplit[3] undefined for " + symbol)
        } else {
          let numberString = financingCashFlowSplit.split(`--pnclg D(tbc)" data-test="fin-col"><span>`)
          if (numberString[1] === undefined) {
            console.log("numberString undefined for " + symbol)
          } else {
            numberAlone = numberString[1].split("</span>")[0]
          }
        }

      } else {
        console.log("Axios error at symbol: " + symbol)
      }
      // debugger
      let newRow = [symbol, numberAlone]
      financingCashFlowFinalArray.push(newRow)
      console.log("Here's the array:")
      console.log(financingCashFlowFinalArray)

      tickerSymbolsArray = tickerSymbolsArray.slice("1")
      if (tickerSymbolsArray.length !== 0) {
        getFinancingCashFlow()
      } else {
        const csv = unparse(financingCashFlowFinalArray)
        downloadCSV(csv)
        enableScraperButtons()
        tickerSymbolsArray = tickerSymbols.split(",") //reset ticker symbols array
      }
    }, 3000)
  }

  function getNetIncome() {
    disableScraperButtons()
    setTimeout(async function () {
      const symbol = tickerSymbolsArray[0]
      let axiosError = false
      let confirmContinue = true
      let numberAlone = "error"

      const response = await axios.get(`https://finance.yahoo.com/quote/${symbol}/financials`)
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
        let netIncomeSplit = response.data.split(`Net Income Common Stockholders`)[3]
        if (netIncomeSplit === undefined) {
          console.log("netIncomeSplit[3] undefined for " + symbol)
        } else {
          let numberString = netIncomeSplit.split(`--pnclg D(tbc)" data-test="fin-col"><span>`)
          if (numberString[1] === undefined) {
            console.log("numberString undefined for " + symbol)
          } else {
            numberAlone = numberString[1].split("</span>")[0]
          }
        }

      } else {
        console.log("Axios error at symbol: " + symbol)
      }
      // debugger
      let newRow = [symbol, numberAlone]
      netIncomeArray.push(newRow)
      console.log("Here's the array:")
      console.log(netIncomeArray)

      tickerSymbolsArray = tickerSymbolsArray.slice("1")
      if (tickerSymbolsArray.length !== 0) {
        getNetIncome()
      } else {
        const csv = unparse(netIncomeArray)
        downloadCSV(csv)
        enableScraperButtons()
        tickerSymbolsArray = tickerSymbols.split(",") //reset ticker symbols array
      }
    }, 3000)
  }

  function getOperatingCashFlow() {
    disableScraperButtons()
    setTimeout(async function () {
      const symbol = tickerSymbolsArray[0]
      let axiosError = false
      let confirmContinue = true
      let numberAlone = "error"

      const response = await axios.get(`https://finance.yahoo.com/quote/${symbol}/cash-flow`)
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
        let operatingCashFlowSplit = response.data.split(`Operating Cash Flow`)[3]
        if (operatingCashFlowSplit === undefined) {
          console.log("operatingCashFlowSplit[3] undefined for " + symbol)
        } else {
          let numberString = operatingCashFlowSplit.split(`--pnclg D(tbc)" data-test="fin-col"><span>`)
          if (numberString[1] === undefined) {
            console.log("numberString undefined for " + symbol)
          } else {
            numberAlone = numberString[1].split("</span>")[0]
          }
        }

      } else {
        console.log("Axios error at symbol: " + symbol)
      }
      // debugger
      let newRow = [symbol, numberAlone]
      operatingCashFlowArray.push(newRow)
      console.log("Here's the array:")
      console.log(operatingCashFlowArray)

      tickerSymbolsArray = tickerSymbolsArray.slice("1")
      if (tickerSymbolsArray.length !== 0) {
        getOperatingCashFlow()
      } else {
        const csv = unparse(operatingCashFlowArray)
        downloadCSV(csv)
        enableScraperButtons()
        tickerSymbolsArray = tickerSymbols.split(",") //reset ticker symbols array
      }
    }, 3000)
  }

  const downloadCSV = function (data) {
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

  const millionsBillionsHandler = () => {
    let marketCapInput = document.getElementById("market-cap-values").value
   
    // let parsedCSV = papa.parse(millionsBillionsString).data
    let parsedCSV = papa.parse(marketCapInput).data
    const cleanedCSVArrays = []
    parsedCSV.forEach(array => {
      let stringNumber = array[0]
      let mOrB
      if (stringNumber !== "") {
        if (stringNumber.includes("M")) {
          mOrB = "M"
        } else if (stringNumber.includes("B")) {
          mOrB = "B"
        } else {
          mOrB = "error"
        }
        stringNumber = stringNumber.replace("$", "").replace("M", "").replace("B", "")
        let number = Number(stringNumber)
        if (mOrB === "M") {
          number = number * 1000000
        } else if (mOrB === "B") {
          number = number * 1000000000
        } else {
          number = "error"
        }
        let newRow = [number]
        cleanedCSVArrays.push(newRow)

      }
    })

    downloadCSV(unparse(cleanedCSVArrays))
  }

  function uploadUserInput(e) {
    e.preventDefault()
    const tickerInput = document.getElementById("user-ticker-input").value.replaceAll("\n", ",")
    if (tickerInput) {
      tickerSymbols = tickerInput;
      tickerSymbolsArray = tickerInput.split(",")
      document.getElementById("ticker-list").innerHTML = tickerSymbols
    }
  }

  const disableScraperButtons=()=>{
    const waitMessage= document.getElementById("wait-message")
    waitMessage.style.display = "block"
    const scraperButtons = document.getElementsByClassName("scraper-button")
    for(const button of scraperButtons){
      button.disabled = true
    }
  }

  const enableScraperButtons=()=>{
    const waitMessage= document.getElementById("wait-message")
    waitMessage.style.display = "none"
    const scraperButtons = document.getElementsByClassName("scraper-button")
    for(const button of scraperButtons){
      button.disabled = false
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Stock Ticker Data Scraper</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
      <ol>
          <li>Generate a table with a column (or a CSV) of all the stock tickers you'd like to screen. (I download the table of chosen stocks from Fidelity.com)</li>
          <li>Copy/paste the column of ticker symbols into the textarea below, then click the button to upload the list:</li>
        </ol>
        <form onSubmit={uploadUserInput}>
            <textarea id="user-ticker-input" />
            <button type='submit'>Upload Ticker List</button>
          </form>
        <h3>Current Ticker List:</h3>
        <p id="ticker-list">{tickerSymbols}</p>
        <h3>Screen options for the Ticker List:</h3>
        <div className='action-buttons'>
        <button className='scraper-button' onClick={getFinancingCashFlow}>Click to scrape Financing Cash Flow</button>
        <button className='scraper-button' onClick={getNetIncome}>Click to scrape Net Income</button>
        <button className='scraper-button' onClick={getOperatingCashFlow}>Click to scrape Operating Cash Flow</button>
        <p id='wait-message'>Please wait while we scrape! Your results will download when finished.</p>
        <h3>Other Tools:</h3>
 
    <ol>
          <li>Copy the column of Market Capitalization values for the tickers above from Fidelity.com into the textarea below. Click the button to convert from millions to billions to numbers.</li>
        </ol>
        <textarea id="market-cap-values"/>
        <button onClick={millionsBillionsHandler}>Change Market Cap Millions & Billions to Numbers</button>
        </div>
      </main>
    </div>
  );
}

export default App;
