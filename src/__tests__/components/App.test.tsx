import React from 'react';
import { render, screen } from '@testing-library/react';

import App from 'components/App/App';

describe('test for App component', () => {
  it('should render App component', () => {
    render(<App />);
    const linkElement = screen.getByText(/app/i);

    expect(linkElement).toBeInTheDocument();
  });
});
