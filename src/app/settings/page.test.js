import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent from './page.tsx';

test('renders MyComponent', () => {
    render(<MyComponent />);
    // Add your assertions here
});