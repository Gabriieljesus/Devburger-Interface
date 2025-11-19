import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';


const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: "Poppins", sans-serif;
    font-weight: 400;
}

button, a {
  cursor: pointer;
}
`;

export default GlobalStyle;
