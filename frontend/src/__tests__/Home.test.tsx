import { fireEvent, render, screen } from '@testing-library/react';
import Home from 'src/pages/Home';
import { User } from 'src/models/user';

const sampleUser: User = {
  _id: '',
  name: 'Joe',
  email: '',
  password: '',
  bug: '00000000000010000000000000000000000010000000001000000000000000000000000000000000',
  fish: '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
  sealife: '1111111111111111111111111111111111111111',
  alkKey: '',
  createdAt: '',
  updatedAt: '',
};

describe('Testing homepage with user data', () => {
  beforeAll(() => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const newTime = new Date('2023-01-01').getTime() + ((timezoneOffset + 60) * 1000 * 60);
    jest
      .useFakeTimers('modern')
      .setSystemTime(newTime);
  });

//   it('should hide critters the user has already collected', () => {
//     const currentTime = new Date();
//     expect(currentTime.getTime()).toBe(1672549200000);

//     render(<Home />);

//     const showMissingToggle = screen.getByTestId('showMissingToggle');
//     const radioBugs = screen.getByLabelText('Bugs');
//     const radioSeaLife = screen.getByLabelText('Sea Life');

//     fireEvent.click(radioBugs);
//     expect(screen.getByText('Emperor Butterfly')).toBeInTheDocument();
//     expect(screen.getByText('Moth')).toBeInTheDocument();
//     expect(screen.getByText('Wasp')).toBeInTheDocument();
//     expect(screen.getByText('Mole Cricket')).toBeInTheDocument();
//     expect(screen.getAllByRole('row').length).toBe(17);

//     fireEvent.click(radioSeaLife);
//     expect(screen.getByText('Seaweed')).toBeInTheDocument();
//     expect(screen.getAllByRole('row').length).toBe(21);

//     fireEvent.click(showMissingToggle);

//     fireEvent.click(radioBugs);
//     expect(screen.getByText('Emperor Butterfly')).toBeInTheDocument();
//     expect(screen.queryByText('Moth')).not.toBeInTheDocument();
//     expect(screen.getByText('Wasp')).toBeInTheDocument();
//     expect(screen.queryByText('Mole Cricket')).not.toBeInTheDocument();
//     expect(screen.getAllByRole('row').length).toBe(14);

//     fireEvent.click(radioSeaLife);
//     expect(screen.queryByText('Seaweed')).not.toBeInTheDocument();
//     expect(screen.queryAllByRole('row').length).toBe(0);
//   });
});
