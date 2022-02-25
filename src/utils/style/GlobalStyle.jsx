import { createGlobalStyle } from 'styled-components'
import '../../assets/fonts/fonts.css'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'IBM Plex Mono', monospace;
        font-weight:600;
    }
 
    body {
        background-color:black;
        margin: 0; 
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle