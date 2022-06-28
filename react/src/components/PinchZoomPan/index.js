import React, { useEffect, useRef } from 'react';
import { create } from 'pinch-zoom-pan';

import './styles.scss';

export default React.memo(
  function PinchZoomPan({ min, max, captureWheel, className, style, children }) {
    const root = useRef(null);

    useEffect(() => {
      const element = root.current;
      if (!element) return;
      return create({ element, minZoom: min, maxZoom: max, captureWheel });
    }, [min, max, captureWheel]);

    return (
      <div ref={root} className={'pinchzoompan root'} style={style}>
        <div className={'pinchzoompan point'}>
          <div className={'pinchzoompan canvas'}>
            {children}
          </div>
        </div>
      </div>
    );
  },
);