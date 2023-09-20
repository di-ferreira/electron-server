import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Bot from './screens/Bot';
import CashRegister from './screens/CashRegister';
import Configurations from './screens/Configurations';
import Customers from './screens/Customers';
import Dashboard from './screens/Dashboard';
import { Home } from './screens/Home';
import Menu from './screens/Menu';
import Orders from './screens/Orders';
import { Default } from './themes';

const screens = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/home',
        element: <Dashboard />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/cash-register',
        element: <CashRegister />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/bot',
        element: <Bot />,
      },
      {
        path: '/configurations',
        element: <Configurations />,
      },
    ],
  },
]);
const { colors, name } = Default;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContext.Provider value={{ name, colors }}>
      <ThemeProvider theme={Default}>
        <GlobalStyle />
        <RouterProvider router={screens} />
      </ThemeProvider>
    </ThemeContext.Provider>
  </React.StrictMode>
);
