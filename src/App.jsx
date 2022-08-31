import style from './my.module.css'
import './App.css';

import { FaDollarSign } from 'react-icons/fa';
import { FormControl, InputLabel, MenuItem, OulinedInput, Select } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [Data1, setData1] = useState('')
  const [Data2, setData2] = useState('')
  const [text1, settext1] = useState('')
  const [text2, settext2] = useState('')
  const [val1, setval1] = useState()
  const [val2, setval2] = useState()
  const [answer, setanswer] = useState('')
  const [newans, setnewans] = useState('')


  const getData = () => {
    fetch('http://data.fixer.io/api/latest?access_key=2c7f197274fcb166db9ab93619b46328')
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.rates);
        setData1(result.rates);
        setData2(result.rates);
      })
      .catch((error) => {
        setData1(error);
      })
  }
  useEffect(() => {
    getData()
  }, [])
  const covert = (e) => {
    e.preventDefault();
    let num = val2 / val1 * text1
    let newnum = val1 / val2 * text2
    setnewans(newnum)
    setanswer(num);
    settext1 ("")
    settext2 ("")
  }
  const clear = (e)=>{
    e.preventDefault();
    setnewans('')
    setanswer('');
  }
  return (
    <>
      <form>
        <div className={style.main}>
          <h2>Currency Exchange Rate</h2>
          <div className={style.smain}>
            <div className={style.samount}>
              <input type="text" placeholder='Enter amount'
                 value={newans || text1}
                onChange={(e) => settext1(e.target.value)}
              />
            </div>
            <div className={style.samount}>

              <div className={style.dollarz}>
                <FormControl fullWidth className={style.drop}
                  onChange={(e) => setval1(e.target.value)}>
                  <Select native>
                    {
                      Object.keys(Data1).map((elem, index) => {
                        return (<option key={index} value={Data1[elem]}>
                          {elem}
                        </option>)
                      })
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className={style.smain}>
            <div className={style.samount}>
              <input type="text" placeholder='Enter amount'
                 value={answer || text2}
                 onChange={(e) => settext2(e.target.value)}

              />
            </div>
            <div className={style.samount}>

              <div className={style.dollarz}>
                <FormControl fullWidth className={style.drop}
                  onChange={(e) => setval2(e.target.value)}>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select native>
                    {
                      Object.keys(Data2).map((elem, index) => {
                        return (<option key={index} value={Data1[elem]}>
                          {elem}
                        </option>)
                      })
                    }
                  </Select>
                </FormControl>
              </div>

            </div>
          </div>


          <div className={style.last}>
            <button onClick={covert}>Convert</button>
            <button onClick={clear}>Clear</button>
          </div>
          {/* <h1>{answer}</h1>
           <h1>{newans}</h1> */}
        </div>
      </form>

    </>

  );
}


export default App;
