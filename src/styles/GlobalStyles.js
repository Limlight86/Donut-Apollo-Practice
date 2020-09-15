import { createGlobalStyle } from "styled-components";
import SofiaPro from "../fonts/sofia_pro_regular.otf";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: sofiapro;
    src: url(${SofiaPro});
  }

  * {
    box-sizing: border-box;
  }

  body {
  font-family: sofiapro;
  background-color: rgb(200, 16, 46);
  color: white;
  margin: 1rem;
  }
`;

export default GlobalStyles;
