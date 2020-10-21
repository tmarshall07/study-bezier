import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

/**
 * Gets the svg x and y coordinates for a click event on an <svg> element
 *
 * @param {Element} svgElement - an <svg> element
 * @param {Event Object} event
 * @returns { x: number, y: number }
 */
const getSvgCoords = (svgElement, event) => {
  const pt = svgElement.createSVGPoint(); // Created once for document
  pt.x = event.clientX;
  pt.y = event.clientY;

  // The cursor point, translated into svg coordinates
  const localPoint = pt.matrixTransform(svgElement.getScreenCTM().inverse());
  return {
    x: localPoint.x,
    y: localPoint.y,
  };
};


const StyledG = styled.g`
  ${(props) =>
    props.hasCursor &&
    styled.css`
      cursor: ${props.isDragging ? 'grabbing' : 'grab'};
    `}
`;

/**
 * Similar to Draggable.jsx but for an SVG canvas
 */
function DraggableSvg(props) {
  const {
    onMouseMove,
    onMouseUp,
    onMouseDown,
    onClick,
    hasCursor,
    children,
    svgRef,
  } = props;

  const [isDragging, setIsDragging] = React.useState(false);
  const previousCoords = React.useRef();

  const handleMouseUp = (e) => {
    onMouseUp(e);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.stopPropagation();
      e.preventDefault();

      const svgCoords = getSvgCoords(svgRef.current, e);

      const dx = svgCoords.x - previousCoords.current.x;
      const dy = svgCoords.y - previousCoords.current.y;

      // Callback
      onMouseMove({ dx, dy, x: svgCoords.x, y: svgCoords.y }, e);

      previousCoords.current = svgCoords;
    }
  };

  React.useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    onMouseDown(e);

    previousCoords.current = getSvgCoords(svgRef.current, e);
  };

  return (
    <StyledG
      isDragging={isDragging}
      hasCursor={hasCursor}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {children}
    </StyledG>
  );
}

const {
  func,
  shape,
  instanceOf,
  number,
  node,
  arrayOf,
  bool,
  oneOfType,
} = PropTypes;

DraggableSvg.propTypes = {
  onMouseMove: func,
  onMouseDown: func,
  onMouseUp: func,
  onClick: func,
  svgRef: shape({
    current: instanceOf(Element),
  }).isRequired,
  viewport: shape({
    h: number,
    w: number,
  }),
  children: oneOfType([arrayOf(node), node]),
  hasCursor: bool,
};

DraggableSvg.defaultProps = {
  onMouseMove: () => {},
  onClick: () => {},
  onMouseUp: () => {},
  onMouseDown: () => {},
  children: null,
  hasCursor: false,
  viewport: { w: 1920, h: 1080 },
};

export default DraggableSvg;
