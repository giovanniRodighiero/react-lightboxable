import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';

import ReactLightboxable from './ReactLightboxable';

const PREVIEW_URL = "https://source.unsplash.com/300x200";
const FULL_WIDTH_URL = "https://source.unsplash.com/1200x800";
const FULL_WIDTH_ALT_TEXT = "full image alt text";

it('should render null in case of missing preview element', () => {
    render(<ReactLightboxable />);
    expect(screen.queryByRole('button')).toBeNull();
});

it('should render the provided preview component', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview).toHaveAttribute('aria-pressed', 'false');
});

it('should not open the modal in case of missing link, as well as changing the aria-pressed', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview).toHaveAttribute('aria-pressed', 'false');
    
    // click on preview
    fireEvent.click(preview);
    expect(preview).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();
});

it('should open the modal, as well as changing the aria-pressed on click event', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
            fullWidthUrl={FULL_WIDTH_URL}
            fullWidthAlt={FULL_WIDTH_ALT_TEXT}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview).toHaveAttribute('aria-pressed', 'false');
    
    // click on preview
    fireEvent.click(preview);
    const lightbox = screen.queryByRole('dialog');
    expect(lightbox).not.toBeNull();
    expect(preview).toHaveAttribute('aria-pressed', 'true');

    const fullWidthImage = lightbox.querySelector('img');
    expect(fullWidthImage).not.toBeNull();
    expect(fullWidthImage).toHaveAttribute('src', FULL_WIDTH_URL);
    expect(fullWidthImage).toHaveAttribute('alt', FULL_WIDTH_ALT_TEXT);
});

it('should close the modal, as well as changing the aria-pressed when the close button is clicked', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
            fullWidthUrl={FULL_WIDTH_URL}
            fullWidthAlt={FULL_WIDTH_ALT_TEXT}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview).toHaveAttribute('aria-pressed', 'false');

    // click on preview
    fireEvent.click(preview);
    expect(preview).toHaveAttribute('aria-pressed', 'true');

    const lightbox = screen.getByRole('dialog');
    const closeButton = getByRole(lightbox, 'button');

    // click on close button
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(preview).toHaveAttribute('aria-pressed', 'false');
});

it('should close the modal, as well as changing the aria-pressed when the background is clicked', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
            fullWidthUrl={FULL_WIDTH_URL}
            fullWidthAlt={FULL_WIDTH_ALT_TEXT}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview).toHaveAttribute('aria-pressed', 'false');

    // click on preview
    fireEvent.click(preview);
    expect(preview).toHaveAttribute('aria-pressed', 'true');

    const lightbox = screen.getByRole('dialog');
    const background = lightbox.querySelector('.lightboxable-modal__background');

    // click on background button
    fireEvent.click(background);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(preview).toHaveAttribute('aria-pressed', 'false');
});

it('should close the modal, as well as changing the aria-pressed when the escape key is pressed', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
            fullWidthUrl={FULL_WIDTH_URL}
            fullWidthAlt={FULL_WIDTH_ALT_TEXT}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview).toHaveAttribute('aria-pressed', 'false');

    // click on preview
    fireEvent.click(preview);
    expect(preview).toHaveAttribute('aria-pressed', 'true');

    const lightbox = screen.getByRole('dialog');

    // escape key pressed
    fireEvent.keyDown(lightbox, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(preview).toHaveAttribute('aria-pressed', 'false');
});