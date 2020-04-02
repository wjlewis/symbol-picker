import React from 'react';
import './index.css';

interface SegmentProps {
  title: string;
  glyphs: string[];
  onClick: (glyph: string) => void;
}

const Segment = (props: SegmentProps) => (
  <div className="segment">
    <h2 className="segment__title">{props.title}</h2>
    <div className="segment__glyph-container">
      {props.glyphs.map(glyph => (
        <button
          key={glyph}
          className="segment__glyph"
          onClick={() => props.onClick(glyph)}
          dangerouslySetInnerHTML={{ __html: glyph }}
        ></button>
      ))}
    </div>
  </div>
);

export default Segment;
