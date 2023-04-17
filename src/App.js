import './App.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';

function App() {
  const columns = [
    { id: 'action', label: 'Ação', minWidth: 100 },
    { id: 'time', label: 'Tempo', minWidth: 100 },
    // { id: 'time', label: 'Tempo', minWidth: 100 },
  ]
  const [hasError, setHasError] = useState(false);
  const [isGoal, setIsGoal] = useState(false);
  const [isSubstitution, setIsSubstitution] = useState(false);
  const [isDisarm, setIsDisarm] = useState(false);
  
  const [action, setAction] = useState("");
  const [time, setTime] = useState("");
  const [playerIn, setPlayerIn] = useState("");
  const [playerOut, setPlayerOut] = useState("");
  const [playerScored, setPlayerScored] = useState("");
  const [playerAssist, setPlayerAssist] = useState("");
  const [playerDisarm, setPlayerDisarm] = useState("");

  const [plays, setPlays] = useState([]);
  
  function setGoal() {
    setIsGoal(!isGoal);
    setAction("goal");
    setDefaults("goal");
  }

  function setSubstitution() {
    setIsSubstitution(!isSubstitution);
    setAction("substitution");
    setDefaults("substitution");
  }

  function setDisarm() {
    setIsDisarm(!isDisarm);
    setAction("disarm");
    setDefaults("disarm");
  }

  function setDefaults(action) {
    setAction(action)
    switch (action) {
      case 'goal':
        setIsSubstitution(false);
        setIsDisarm(false);
        break;
      case 'disarm':
        setIsGoal(false);
        setIsSubstitution(false);
        break;
      case 'substitution':
          setIsGoal(false);
          setIsDisarm(false);
          break;
      default:
        setAction("")
        setIsGoal(false);
        setIsDisarm(false);
        setIsSubstitution(false);
    }
    

  }

  const setTimeValue = (e) => {
    setTime(e.target.value || "00:00")
  }

  function clearFields() {
    setDefaults("all")
    setTime("")
    setPlayerScored("")
    setPlayerAssist("")
    setDisarm("")
    setPlayerIn("")
    setPlayerOut("")
  }
  
  function savePlay() {
    if (action === "" || time === "") {
        setHasError(true)
        return;
    }

    let play = {
      "action": action,
    }
    switch (action) {
      case 'goal':
        if (playerScored === "" || playerAssist === "") {
          setHasError(true);
          return;
        }
        play.playerScored = playerScored
        play.playerAssist = playerAssist
        play.time = time
        break;
      case 'disarm':
        if (playerDisarm === "") {
          setHasError(true);
          return;
        }
        play.playerDisarm = playerDisarm
        play.time = time
        break;
      case 'substitution':
        if (playerIn === "" || playerOut === "") {
          setHasError(true);
          return;
        }
        play.playerIn = playerIn
        play.playerOut = playerOut
        play.time = time
        break;
      default:
        setHasError(true)
    }

    let newPlays = [...plays, play];
    clearFields()
    setPlays(newPlays);
    setHasError(false)
    console.log(plays)
    console.log(isDisarm)
  }
  
  return (
    <div className="App">
      <div className='body-center'>
        <h1>Vale a pena ver denovo!</h1>
      </div>
      <div className='ctn-btn-actions'>
        <Button variant="outlined" onClick={setGoal}>Gol ⚽</Button>
        <Button variant="outlined" onClick={setSubstitution} className='btn-outlined'>Substituição 🔁</Button>
        <Button variant="outlined" onClick={setDisarm} className='btn-outlined'>Desarmes 🚷</Button>
      </div>
      {
        isGoal && (
          <div className='ctn-input'>
            <TextField 
              required
              id="outlined-required" 
              type="time"
              value={time}
              onChange={setTimeValue}
            />
            <TextField
              required
              id="outlined-required"
              label="Quem fez o gol ⚽"
              value={playerScored}
              onChange={e => setPlayerScored(e.target.value)}
              />
            <TextField
              required
              id="outlined-required"
              label="Quem fez o passe 🦶🏼"
              value={playerAssist}
              onChange={e => setPlayerAssist(e.target.value)}
            />
          </div>
        )
      }
      {
        isSubstitution && (
          <div className='ctn-input'>
            <TextField 
              required
              id="outlined-required" 
              type="time"
              value={time}
              onChange={setTimeValue}
            />
            <TextField
              required
              id="outlined-required"
              label="Entrou ⬆️"
              value={playerIn}
              onChange={e => setPlayerIn(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Saiu ⬇️"
              value={playerOut}
              onChange={e => setPlayerOut(e.target.value)}
            />
          </div>
        )
      }
      {
        isDisarm && (
          <div className='ctn-input'>
            <TextField 
              required
              id="outlined-required" 
              type="time"
              value={time}
              onChange={setTimeValue}
            />
            <TextField
              required
              id="outlined-required"
              label="Quem desarmou 🚷"
              value={playerDisarm}
              onChange={e => setPlayerDisarm(e.target.value)}
            />
          </div>
        )
      }
      {
        <div className='ctn-btn-save'>
          <Button variant="outlined" color="error" onClick={clearFields}>Limpar</Button>
          <Button variant="contained" color="success" onClick={savePlay}>Salvar</Button>
        </div>
      }
      {
        hasError && (
          <div className='ctn-alert-error'>
            <Alert severity="error">
              <strong>Faltam preencher alguns campos!</strong>
            </Alert>
          </div>
        )
      }
      {
        plays.length > 0 && (
          plays.forEach(play => {
            return <div className='item'>{play.action}</div>
          })
        )
      }

      {/* <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  // align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {plays
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer> */}

    </div>
  );
}

export default App;
