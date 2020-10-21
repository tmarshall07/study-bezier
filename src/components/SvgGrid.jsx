import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridLine = styled.line`
  stroke: lightgrey;
  stroke-width: 1px;
`;

const SvgGrid = (props) => {
  const { spacing, width, height } = props;

  const horLines = [];
  const vertLines = [];

  const numRows = Math.ceil(height / spacing);
  const numColumns = Math.ceil(width / spacing);

  for (let i = 0; i < numRows; i += 1) {
    horLines.push(
      <GridLine
        key={i}
        x1={0}
        x2={spacing * numColumns}
        y1={i * spacing}
        y2={i * spacing}
      />
    );
  }

  for (let i = 0; i < numColumns; i += 1) {
    vertLines.push(
      <GridLine
        key={i}
        x1={i * spacing}
        x2={i * spacing}
        y1={0}
        y2={spacing * numRows}
      />
    );
  }

  return (
    <g>
      <g>
        {horLines}
        {vertLines}
      </g>
    </g>
  );
};

SvgGrid.propTypes = {
  spacing: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

SvgGrid.defaultProps = {
  spacing: 50,
};

export default React.memo(SvgGrid);
