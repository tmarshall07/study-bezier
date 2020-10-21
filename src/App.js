import React, { useRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './App.css';
import SvgGrid from './components/SvgGrid';
import DraggableSvg from './components/DraggableSvg';

const Point = ({ x, y }) => <circle className="control-point" r={10} cx={x} cy={y} style={{ fill: '#3381d1', stroke: 'lightblue', strokeWidth: 5 }} />
const ControlPoint = ({ x, y }) => <circle className="control-point" r={20} cx={x} cy={y} style={{ fill: '#3381d1', stroke: 'lightblue', strokeWidth: 5 }} />
const ControlLine = ({ p1, p2 }) => <line x1={p1.x} x2={p2.x} y1={p1.y} y2={p2.y} style={{ stroke: 'lightblue', opacity: 0.5, strokeWidth: 3 }} />
const PText = ({ x, y, num }) => <text x={x} y={y} style={{ fill: 'white', opacity: 0.5 }}>P<tspan baselineShift="sub">{num}</tspan> ({Math.round(x)}, {Math.round(y)})</text>

const pathStyle = {
  strokeWidth: 10,
  stroke: '#45a1ff',
  strokeLinecap: 'round',
  fill: 'none',
}

const width = 1920;
const height = 1080;

// const p0 = { x: width / 4, y: height / 2 };
// const p3 = { x: width * 3 / 4, y: height / 2 };

function App() {
  const [p0, setP0] = useState({
    x: width / 4,
    y: height / 2,
  });

  const [p1, setP1] = useState({
    x: width / 4,
    y: height / 4,
  });
  
  const [p2, setP2] = useState({
    x: width * 3 / 4,
    y: height / 4,
  });

  const [p3, setP3] = useState({
    x: width * 3 / 4,
    y: height / 2,
  });

  const svgRef = useRef();

  const handleMoveP3 = (move) => {
    setP3({ x: Math.round(move.x), y: Math.round(move.y) })
  }

  const handleMoveP0 = (move) => {
    setP0({ x: Math.round(move.x), y: Math.round(move.y) })
  }

  const handleMoveCp1 = (move) => {
    setP1({ x: Math.round(move.x), y: Math.round(move.y) })
  }
  
  const handleMoveCp2 = (move) => {
    setP2({ x: Math.round(move.x), y: Math.round(move.y) })
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div id="main-container" style={{ display: 'flex'}}>
        <div style={{ width: '30%', padding: 30 }}>
          <SyntaxHighlighter language="html" customStyle={{ fontSize: 20}}>
            {`
<svg>
  <path
    d="
      M${p0.x},${p0.y}
      C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}
    "
  />
</svg>  
            `}
          </SyntaxHighlighter>
        </div>

        <div style={{ width: '70%'  }}>
          <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
            <g opacity={0.25}>
              <SvgGrid width={width} height={height} />
            </g>

            <path
              style={pathStyle}
              d={`
                M ${p0.x},${p0.y}
                C ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}
              `}
            />

            <ControlLine p1={p0} p2={p1} />
            <DraggableSvg svgRef={svgRef} onMouseMove={handleMoveCp1}>
              <ControlPoint x={p1.x} y={p1.y} />
            </DraggableSvg>
            <PText x={p1.x - 15} y={p1.y - 50} num={1} />

            <ControlLine p1={p3} p2={p2} />
            <DraggableSvg svgRef={svgRef} onMouseMove={handleMoveCp2}>
              <ControlPoint x={p2.x} y={p2.y} />
            </DraggableSvg>
            <PText x={p2.x - 15} y={p2.y - 50} fill="white" num={2} />
            
            <DraggableSvg svgRef={svgRef} onMouseMove={handleMoveP0}>
              <Point x={p0.x} y={p0.y} />
            </DraggableSvg>
            <DraggableSvg svgRef={svgRef} onMouseMove={handleMoveP3}>
              <Point x={p3.x} y={p3.y} />
            </DraggableSvg>
            <PText x={p0.x - 15} y={p0.y + 40} num={0} />
            <PText x={p3.x - 15} y={p3.y + 40} num={3}/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
