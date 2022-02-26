import GlitchedWriter, {wait, presets} from 'glitched-writer'
import { useEffect } from 'react'
import styled, {keyframes} from 'styled-components'

const black = "#000000"
const dark = "#33202a"
const lighter = "#5f5566"
const white = "#f5f4f6"
const green = "#39ff14"
const yellow = "#fcab10"

const Body = styled.div`
	background-color: ${black};
	// background: radial-gradient(
	// 	ellipse at right 34% bottom 5%,
	// 	${dark},
	// 	${black} 80%,
	// 	${black}
	// );
	background-position: left;
	height: 100vh;
	margin: 0;
	overflow: hidden;
	color: ${white};
	font: 1rem Inconsolata, monospace;
	text-shadow: 0 0 5px ${white};
	&:after {
		content: "";
		position: absolute;
		opacity: 0.3;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: repeating-linear-gradient(
			0deg,
			rgba(${black}, 1),
			rgba(${black}, 1) 2px,
			transparent,
			transparent 4px
		);
		pointer-events: none;
	}
	&:before {
		content: "";
		position: absolute;
		z-index: 1000;
		opacity: 0.4;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: radial-gradient(
			ellipse at right 34% bottom 5%,
			transparent 60%,
			$black
		);
		pointer-events: none;
	}

    &:selection {
        background: ${dark};
        text-shadow: none;
    }
`
const textblink = keyframes`
	from,
	to {
		opacity: 1;
	}
	50% {
		opacity: 0.7;
	}
`

const Pre = styled.pre`
    margin: 0;
	white-space: pre-wrap;
	margin-bottom: 80vh;
	animation: ${textblink} 0.04s steps(2) infinite;
`

const blink = keyframes`
	from,
	to {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
`

const Output = styled.output`
	&:after {
		content: "▮";
		opacity: 1;
		animation: ${blink} 0.5s steps(1) infinite;
	}
	&.gw-writing {
		&:after {
			animation: none;
		}
	}

	a {
		color: ${yellow};
		text-decoration: none;
		text-shadow: 0 0 5px ${yellow};
		&:hover {
			font-weight: bold;
		}
	}
	b {
		font-weight: normal;
		&:hover {
			color: ${lighter};
			text-shadow: 0 0 5px ${lighter};
		}
	}
	strong {
		font-weight: normal;
		color: ${green};
		text-shadow: 0 0 5px ${green};
	}
	i {
		color: ${lighter};
		text-shadow: 0 0 5px ${lighter};
		font-style: normal;
	}
`

const Wrapper = styled.div`
	padding: 2rem;
	overflow-y: scroll;
	height: 100vh;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`

const UserInput = styled.div`
	display: flex;
	display: none;
`

const Incentive = styled.span`
    color: ${yellow};
`

const Input = styled.input`
	width: 100%;
	margin-left: 10px;
	background: transparent;
	outline: none !important;
	border: none !important;
	color: ${white};
	font: 1rem Inconsolata, monospace;
	text-shadow: 0 0 5px ${white};
`

function Test(){
    const random = (min, max, mathFunc = null) => {
        let w = Math.random() * (max - min) + min;
        return mathFunc == null ? w : Math[mathFunc](w);
    };
    
    useEffect(() => {
        const date = new Date();

        const Writer = new GlitchedWriter("#output", {
            ...presets.terminal,
            mode: "erase_smart",
            html: true
        });

        const Writer2 = new GlitchedWriter("#output", {
            ...presets.terminal,
            mode: "clear",
            html: true,
            oneAtATime: 10
        });

        async function terminal() {
                await Writer.write("TWS:~ Timewellspent$ script: Compiling.");
                await wait(100);
                await Writer.add(".");
                await wait(100);
                await Writer.add(".");
                await wait(300);
                await Writer2.write(`TWS:~ Timewellspent$ <strong>Compiled successfully.</strong>
            hash: ${Date.now()}
            package: <a href="" target="_blank">alex&theo.tws?v1</a>
            version: 0.1.29
            time: ${random(0, 1500, "round")}ms
            <strong>[CLIC]</strong> TO SKIP


                                            Asset       Size  Chunks                    Chunk Names
                                         <i>index.js</i>    ${random(10,50,"round")}.3 MB       3  <strong>[emitted]</strong>  <strong>[big]</strong>  index
             <i>0.81c79b4db476a98d272f.hot-update.js</i>    ${random(40,100,"round")}.4 kB       0  <strong>[emitted]</strong>         project
             <i>81c79b4db476a98d272f.hot-update.json</i>   52 bytes          <strong>[emitted]</strong>
                                    <i>manifest.json</i>  ${random(100,300,"round")} bytes          <strong>[emitted]</strong>

            <i>./app/javascript/common/components/Terminal.js</i> 2.42 kB {0} {1} <strong>[built]</strong>

			서울에 본사를 둔 한국 회사입니다

    <b>Welcome To Time Well Spent Terminal!</b> (v 0.1.29)
        <i>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</i>
        PRESS <strong>[SPACE]</strong> OR <strong>[CLIC]</strong> TO ENTER
    By entering TimeWellSpent, you agree to our Cookie Policy <a href="" target="_blank">[Press C]</a>, our Privacy Policy <a href="" target="_blank">[P]</a> and our Terms of Service <a href="" target="_blank">[T]</a>

        `);}
        terminal();}
        ,[])

    return(
        <Body>
            <Wrapper>
                <Pre><Output id="output"></Output><UserInput><Incentive></Incentive><Input type="text"/></UserInput></Pre>
            </Wrapper>
        </Body>
    )
}


export default Test
