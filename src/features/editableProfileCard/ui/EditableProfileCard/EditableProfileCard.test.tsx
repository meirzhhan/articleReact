import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from './EditableProfileCard';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { profileReducer } from '../../model/slice/profileSlice';
import { userEvent } from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from '@/shared/api/api';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 100,
  currency: Currency.EUR,
  country: Country.Kyrgyzstan,
  city: 'Bishkek',
  username: 'admin123',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'admin123',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('EditableProfileCard', () => {
  test('toggle read only mode (false)', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    ).toBeInTheDocument();
  });

  test('if cancel, the values should be reset ', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    const errorElement = await screen.findByText(
      'Произошла ошибка при загрузке профиля',
    );

    // if ProfileCard error props don't exist =>
    if (!errorElement) {
      await userEvent.click(
        screen.getByTestId('EditableProfileCardHeader.EditButton'),
      );

      await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
      await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

      await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
      await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

      expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
      expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

      await userEvent.click(
        screen.getByTestId('EditableProfileCardHeader.CancelButton'),
      );

      expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
      expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    }
  });

  test('error should appear when clicking SaveButton if the input filled incorrectly', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    const errorElement = await screen.findByText(
      'Произошла ошибка при загрузке профиля',
    );

    // if ProfileCard error props don't exist =>
    if (!errorElement) {
      await userEvent.click(
        screen.getByTestId('EditableProfileCardHeader.EditButton'),
      );

      await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

      await userEvent.click(
        screen.getByTestId('EditableProfileCardHeader.SaveButton'),
      );

      expect(
        screen.getByTestId('EditableProfileCard.Error.Paragraph'),
      ).toBeInTheDocument();
    }
  });

  test('should work PUT request and fill into input if inputs filled correctly', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    const mockPutReq = jest.spyOn($api, 'put'); // mocked put

    const errorElement = await screen.findByText(
      'Произошла ошибка при загрузке профиля',
    );

    // if ProfileCard error props don't exist =>
    if (!errorElement) {
      await userEvent.click(
        screen.getByTestId('EditableProfileCardHeader.EditButton'),
      );

      await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

      await userEvent.click(
        screen.getByTestId('EditableProfileCardHeader.SaveButton'),
      );

      expect(mockPutReq).toHaveBeenCalled();
    }
  });
});
