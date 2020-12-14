import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import './ReactLightboxable.css';

const PORTAL_ROOT_ID = 'lightboxable-portal-root';

function Portal ({ children }) {
    let $modalRoot = document.getElementById(PORTAL_ROOT_ID);
    if (!$modalRoot) {
        $modalRoot = document.createElement('div');
        $modalRoot.setAttribute('id', PORTAL_ROOT_ID);
    }

    useEffect(_ => {
        document.body.appendChild($modalRoot);

        return function lightboxablePortalCleanup () {
            document.body.removeChild($modalRoot);
        }
    });

    return ReactDom.createPortal(children, $modalRoot);
};

function ReactLightboxable({
    preview,
    fullWidthUrl,
    fullWidthAlt = 'full width image'
}) {
    const [ open, setOpen ] = useState(false);

    const onPortalOpen = _ => setOpen(true);
    const onPortalClose = _ => setOpen(false);

    if (!preview)
        return null;
    
	return (
        <React.Fragment>
        {   
            !!fullWidthUrl && open &&
            <Portal>
                <div className="lightboxable-modal">
                    <button className="lightboxable-modal__close" onClick={onPortalClose} type="button">close</button>
                    <div className="lightboxable-modal__background" onClick={onPortalClose}></div>
                    <img className="lightboxable-modal__image" alt={fullWidthAlt} src={fullWidthUrl} />
                </div>
            </Portal>
        }
        <div className="lightboxable-preview" onClick={onPortalOpen}>{preview}</div>
        </React.Fragment>
    );
};

export default ReactLightboxable;