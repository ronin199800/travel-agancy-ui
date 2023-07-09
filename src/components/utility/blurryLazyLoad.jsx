import React from 'react';
import LazyLoad from 'react-lazyload';

const BlurryLazyLoad = ({ src, alt }) => {
  return (
    <LazyLoad once>
      {({ ref, inView }) => (
        <img
          ref={ref}
          src={inView ? src : ''}
          alt={alt}
          style={{
            filter: inView ? 'none' : 'blur(10px)', // Apply blur effect if not in view
            transition: 'filter 0.5s ease', // Add transition for smooth effect
          }}
        />
      )}
    </LazyLoad>
  );
};

export default BlurryLazyLoad;