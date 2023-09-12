import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { api, socket } from './services';
import viteLogo from '/vite.svg';

interface iResult {
  result: string;
}

function App() {
  const [result, setResult] = useState<string>('');
  const [NameInput, setNameInput] = useState<string>('');

  // const TestAPI = async (name: string) => {
  //   const response = await api.get<iResult>(`/?name=${name}`);
  //   const { result } = response.data;
  //   setResult(JSON.stringify(result));
  // };

  const ClientList = async (phone?: string) => {
    if (phone !== '') {
      const response = await api.get<iResult>(`/customers/${phone}`);
      const result = response.data;
      setResult(JSON.stringify(result));
    } else {
      const response = await api.get<iResult>(`/customers`);
      const result = response.data;
      setResult(JSON.stringify(result));
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on('welcome', () => {
      socket.emit('test');
      console.log('welcome client connected');
    });
  }, []);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <input type='text' onChange={(e) => setNameInput(e.target.value)} />
        <button onClick={() => ClientList(NameInput)}>Fetch</button>
        <p>{result}</p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
