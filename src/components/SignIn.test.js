import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from './SignIn';

describe('Form', () => {
  it('calls function provided by onSubmit prop after pressing the submit button', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    
    await waitFor(() => fireEvent.press(getByTestId('signInButton')));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    // onSubmit.mock.calls[0][0] contains the first argument of the first call
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
  });
});
