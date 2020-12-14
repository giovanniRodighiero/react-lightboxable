import React from 'react';
import RactDom from 'react-dom';

import ReactLightboxable from './ReactLightboxable';

const Preview = _ => <img src="https://source.unsplash.com/300x200" />;

RactDom.render(
    <ReactLightboxable
        preview={<Preview />}
        fullWidthUrl="https://source.unsplash.com/1200x800"
    />,
    document.getElementById('root')
);

