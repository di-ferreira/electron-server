import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Home } from './screens/Home';
import { Default } from './themes';

const screens = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
