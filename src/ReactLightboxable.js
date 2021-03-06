import React, { useCallback, useEffect, useState } from 'react';
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

    const onKeyDown = useCallback(({ key }) => {
        if (key !== 'Escape')
            return;

        window.removeEventListener('keydown', onKeyDown, false);
        setOpen(false);
    }, [ setOpen ]);

    const onPortalOpen = _ => {
        if (!fullWidthUrl)
            return;

        window.addEventListener('keydown', onKeyDown, false);
        setOpen(true);
    };
    const onPortalClose = _ => {
        window.removeEventListener('keydown', onKeyDown, false);
        setOpen(false);
    };

    useEffect(_ => {
        return function lightboxableCleanup () {
            window.removeEventListener('keydown', onKeyDown, false);
        };
    }, [ onKeyDown ]);

    if (!preview)
        return null;
    
	return (
        <React.Fragment>
        {   
            !!fullWidthUrl && open &&
            <Portal>
                <div
                    className="lightboxable-modal"
                    role="dialog"
                >
                    <button
                        className="lightboxable-modal__close"
                        onClick={onPortalClose}
                        type="button"
                        tabIndex={0}
                        aria-label="close"
                    >close</button>
                    <div className="lightboxable-modal__background" onClick={onPortalClose}></div>
                    <img className="lightboxable-modal__image" alt={fullWidthAlt} src={fullWidthUrl} />
                </div>
            </Portal>
        }
        <button
            type="button"
            aria-pressed={open}
            className="lightboxable-preview"
            onClick={onPortalOpen}
        >{preview}</button>
        </React.Fragment>
    );
};

export default ReactLightboxable;