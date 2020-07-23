import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

import { changeLoginField } from './actions';

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: '',
        password: '',
      },
      accessToken: given.accessToken,
    }));
  });

  context('without logged in', () => {
    given('accessToken', () => '');

    it('renders input controls', () => {
      const { getByLabelText, getByText } = render((
        <LoginFormContainer />
      ));

      expect(getByLabelText('Email')).toBeInTheDocument();
      expect(getByLabelText('Password')).toBeInTheDocument();
      expect(getByText('Log In')).toBeInTheDocument();
    });

    it('listens change events', () => {
      const { getByLabelText } = render((
        <LoginFormContainer />
      ));

      const controls = [
        { label: 'Email', name: 'email', value: 'tester@ex.com' },
        { label: 'Password', name: 'password', value: '5432' },
      ];

      controls.forEach(({ label, name, value }) => {
        const input = getByLabelText(label);

        fireEvent.change(input, {
          target: { value },
        });

        expect(dispatch).toBeCalledWith(changeLoginField({ name, value }));
      });
    });

    it('listens click event', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
    });
  });

  context('with logged in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');

    it('renders logout button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      expect(getByText('Log out')).toBeInTheDocument();
    });

    it('listens click event', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log out'));

      expect(dispatch).toBeCalled();
    });
  });
});