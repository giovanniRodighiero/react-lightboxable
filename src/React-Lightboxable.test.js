import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

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
    expect(preview.getAttribute('aria-pressed')).toBe('false');
});

it('should not open the modal in case of missing link, as well as changing the aria-pressed', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview.getAttribute('aria-pressed')).toBe('false');
    
    fireEvent.click(preview);
    expect(preview.getAttribute('aria-pressed')).toBe('false');
    expect(screen.queryByRole('dialog')).toBeNull();
});

it('should open the modal, as well as changing the aria-pressed', () => {
    render(
        <ReactLightboxable
            preview={<img src={PREVIEW_URL} alt="testing-preview" />}
            fullWidthUrl={FULL_WIDTH_URL}
            fullWidthAlt={FULL_WIDTH_ALT_TEXT}
        />
    );
    const preview = screen.getByRole('button');
    expect(preview.getAttribute('aria-pressed')).toBe('false');
    
    fireEvent.click(preview);
    const lightbox = screen.queryByRole('dialog');
    expect(preview.getAttribute('aria-pressed')).toBe('true');
    expect(lightbox).not.toBeNull();

    const fullWidthImage = lightbox.querySelector('img');
    expect(fullWidthImage).not.toBeNull();
    expect(fullWidthImage.getAttribute('src')).toBe(FULL_WIDTH_URL);
    expect(fullWidthImage.getAttribute('alt')).toBe(FULL_WIDTH_ALT_TEXT);
});