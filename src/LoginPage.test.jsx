import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import LoginPage from './LoginPage';

jest.mock('react-redux');

describe('LoginPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        loginFields: {
          email: 'test@test',
          password: '1234',
        },
        accessToken: '',
      }),
    );
  });

  it('renders Log-in title', () => {
    const { container } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(container).toHaveTextContent('Log In');
  });

  it('renders input control', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(getByLabelText('E-mail')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();
  });
});
