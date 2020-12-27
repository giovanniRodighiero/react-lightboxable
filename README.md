# React Lightboxable - :bulb: :package:
Simple React.js component that displays an image on a fullscreen lightbox, toggled with a click event on the provided thumbail element.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Tests](https://github.com/giovanniRodighiero/react-lightboxable/workflows/Tests/badge.svg)

## Features
* zero external dependencies :ok_hand:;
* uses [React Portals](https://reactjs.org/docs/portals.html) for the lightbox container :cyclone:;
* easily extendable and overwritable css classes :art:.

## Installation
```shell
$ npm install --save-dev react-lightboxable
```

## Example
```javascript
import React from 'react';

import ReactLightboxable from 'react-lightboxable';

// the thumbnail element
const Preview = _ => <img src="https://source.unsplash.com/300x200" />;
// or just <img src="https://source.unsplash.com/300x200" />

// main component
function Example () {
    return (
        <ReactLightboxable
            preview={<Preview />}
            fullWidthUrl="https://source.unsplash.com/1200x800"
            fullWidthAlt="lightbox image alt tag"
        />
    );
}
```

## Props and usage
Super simple, just three props:

| prop name | description |
|---|---|
| `preview` | The thumbail element, can be a React component or a DOM element |
| `fullWidthUrl` | The url of the image to display in full screen inside the lightbox |
| `fullWidthAlt` | The alt tag of the image to display in full screen inside the lightbox |


## Css and classes overwrite
| class name | description |
|---|---|
| `.lightboxable-modal` | wrapper element for the lightbox component |
| `.lightboxable-modal__close` | close button on top right corner |
| `.lightboxable-modal__background` | dark background with click-away listener |
| `.lightboxable-modal__image` | the actual image |
| `.lightboxable-preview` | wrapper element for the thumbail component prop |