import React, { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from 'src/App';
import { flickMultiplier } from 'src/utils/utils';
import { IUser, UserContext } from 'src/contexts/UserContext';
import { ICurrentTime, TimeContext } from 'src/contexts/TimeContext';

global.fetch = jest.fn(async () => Promise.resolve({
  json: async () => Promise.resolve({ id: 0 }),
})) as jest.Mock;

const emptyFunction = () => { };

const userValue: IUser = {
  loggedInUser: undefined,
  onLoginSuccessful: emptyFunction,
  onLogoutSuccessful: emptyFunction,
  updateUser: emptyFunction,
}

const timeValue: ICurrentTime = {
  hemisphere: "Northern",
  month: "January",
  hour: 12,
  meridiem: "AM",
  changeMonth: emptyFunction,
  changeHour: emptyFunction,
  toggleMeridiem: emptyFunction,
  toggleHemisphere: emptyFunction,
  toggleTimeOverride: emptyFunction,
  setToRealTime: emptyFunction,
  setHemisphere: emptyFunction,
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserContext.Provider value={userValue}>
    <TimeContext.Provider value={timeValue}>
      {children}
    </TimeContext.Provider>
  </UserContext.Provider>
)

describe('Testing App Experience', () => {
  beforeAll(() => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const newTime = new Date('2023-01-01').getTime() + ((timezoneOffset + 60) * 1000 * 60);
    jest
      .useFakeTimers('modern')
      .setSystemTime(newTime);

    const currentTime = new Date();
    expect(currentTime.getTime()).toBe(1672552800000);
  });

  it('should confirm the initial App setup', () => {
    render(<App />, { wrapper });
    expect(screen.getByText('Northern')).toBeInTheDocument();
    expect(screen.getByText('Southern')).toBeInTheDocument();
    expect(screen.getByLabelText('Bugs')).toBeInTheDocument();
    expect(screen.getByLabelText('Fish')).toBeInTheDocument();
    expect(screen.getByLabelText('Sea Life')).toBeInTheDocument();
  });

  it('should check for correct bugs displayed', () => {
    render(<App />, { wrapper });

    expect(screen.getByLabelText('Bugs')).toBeChecked();
    expect(screen.getByLabelText('Fish')).not.toBeChecked();
    expect(screen.getByLabelText('Sea Life')).not.toBeChecked();

    expect(screen.getByText('Emperor Butterfly')).toBeInTheDocument();
    expect(screen.getByText('Tarantula')).toBeInTheDocument();
    expect(screen.queryByText('Tiger Butterfly')).not.toBeInTheDocument();
    expect(screen.queryByText('Scorpion')).not.toBeInTheDocument();
  });

  it('should check for correct fish displayed', () => {
    render(<App />, { wrapper });

    const radioFish = screen.getByLabelText('Fish');
    fireEvent.click(radioFish);

    expect(screen.getByLabelText('Bugs')).not.toBeChecked();
    expect(radioFish).toBeChecked();
    expect(screen.getByLabelText('Sea Life')).not.toBeChecked();

    expect(screen.getByText('Bitterling')).toBeInTheDocument();
    expect(screen.getByText('Coelacanth')).toBeInTheDocument();
    expect(screen.queryByText('Killifish')).not.toBeInTheDocument();
    expect(screen.queryByText('Whale Shark')).not.toBeInTheDocument();
  });

  it('should check for correct sea life displayed', () => {
    render(<App />, { wrapper });

    const radioSeaLife = screen.getByLabelText('Sea Life');
    fireEvent.click(radioSeaLife);

    expect(screen.getByLabelText('Bugs')).not.toBeChecked();
    expect(screen.getByLabelText('Fish')).not.toBeChecked();
    expect(radioSeaLife).toBeChecked();

    expect(screen.getByText('Seaweed')).toBeInTheDocument();
    expect(screen.getByText('Lobster')).toBeInTheDocument();
    expect(screen.queryByText('Sea Grapes')).not.toBeInTheDocument();
    expect(screen.queryByText('Flatworm')).not.toBeInTheDocument();
  });

  it('should handle manipulation of the time', () => {
    render(<App />, { wrapper });

    const monthLabelText = screen.getByTestId('monthLabelText');
    const hourLabelText = screen.getByTestId('hourLabelText');
    const meridiemLabelText = screen.getByTestId('meridiemLabelText');

    expect(monthLabelText.textContent).toBe('January');
    expect(hourLabelText.textContent).toBe('12');
    expect(meridiemLabelText.textContent).toBe('AM');

    // Check month alteration, with cycling over both directions
    const monthButtonUp = screen.getByTestId('monthBtnUp');
    const monthButtonDown = screen.getByTestId('monthBtnDown');

    expect(monthLabelText.textContent).toBe('January');
    fireEvent.click(monthButtonDown);
    expect(monthLabelText.textContent).toBe('February');
    fireEvent.click(monthButtonUp);
    fireEvent.click(monthButtonUp);
    expect(monthLabelText.textContent).toBe('December');
    fireEvent.click(monthButtonDown);
    expect(monthLabelText.textContent).toBe('January');

    // Check hour alteration, with cycling over both directions
    const hourButtonUp = screen.getByTestId('hourBtnUp');
    const hourButtonDown = screen.getByTestId('hourBtnDown');

    expect(hourLabelText.textContent).toBe('12');
    fireEvent.click(hourButtonUp);
    expect(hourLabelText.textContent).toBe('11');
    fireEvent.click(hourButtonDown);
    fireEvent.click(hourButtonDown);
    expect(hourLabelText.textContent).toBe('1');
    fireEvent.click(hourButtonUp);
    expect(hourLabelText.textContent).toBe('12');

    // Check meridiem alteration, in both directions
    const meridiemButtonUp = screen.getByTestId('meridiemBtnUp');
    const meridiemButtonDown = screen.getByTestId('meridiemBtnDown');

    expect(meridiemLabelText.textContent).toBe('AM');
    fireEvent.click(meridiemButtonDown);
    expect(meridiemLabelText.textContent).toBe('PM');
    fireEvent.click(meridiemButtonUp);
    expect(meridiemLabelText.textContent).toBe('AM');
    fireEvent.click(meridiemButtonUp);
    fireEvent.click(meridiemButtonUp);
    expect(meridiemLabelText.textContent).toBe('AM');
    fireEvent.click(meridiemButtonDown);
    fireEvent.click(meridiemButtonDown);
    fireEvent.click(meridiemButtonDown);
    expect(meridiemLabelText.textContent).toBe('PM');
  });

  it('should change hemisphere and show correct critters', () => {
    render(<App />, { wrapper });

    const radioNorthern = screen.getByLabelText('Northern');
    const radioSouthern = screen.getByLabelText('Southern');

    expect(radioNorthern).toBeInTheDocument();
    expect(radioSouthern).toBeInTheDocument();

    expect(radioNorthern).toBeChecked();
    expect(radioSouthern).not.toBeChecked();

    const radioBugs = screen.getByLabelText('Bugs');
    const radioFish = screen.getByLabelText('Fish');
    const radioSeaLife = screen.getByLabelText('Sea Life');

    fireEvent.click(radioBugs);
    expect(screen.getByText('Damselfly')).toBeInTheDocument();
    expect(screen.queryByText('Cicada Shell')).not.toBeInTheDocument();
    fireEvent.click(radioFish);
    expect(screen.getByText('Bitterling')).toBeInTheDocument();
    expect(screen.queryByText('Killifish')).not.toBeInTheDocument();
    fireEvent.click(radioSeaLife);
    expect(screen.getByText('Sea Cucumber')).toBeInTheDocument();
    expect(screen.queryByText('Sea Grapes')).not.toBeInTheDocument();

    fireEvent.click(radioSouthern);
    expect(radioNorthern).not.toBeChecked();
    expect(radioSouthern).toBeChecked();

    fireEvent.click(radioBugs);
    expect(screen.queryByText('Damselfly')).not.toBeInTheDocument();
    expect(screen.getByText('Cicada Shell')).toBeInTheDocument();
    fireEvent.click(radioFish);
    expect(screen.queryByText('Bitterling')).not.toBeInTheDocument();
    expect(screen.getByText('Killifish')).toBeInTheDocument();
    fireEvent.click(radioSeaLife);
    expect(screen.queryByText('Sea Cucumber')).not.toBeInTheDocument();
    expect(screen.getByText('Sea Grapes')).toBeInTheDocument();

    fireEvent.click(radioNorthern);
  });

  it('should toggle prices dynamically', () => {
    render(<App />, { wrapper });

    const prices = screen.getAllByTestId('critterPrice');

    const flickCheckbox = screen.getByTestId('priceToggle');
    expect(flickCheckbox).not.toBeChecked();

    const numAttempts = 3;
    const originalPrices = [];
    const randomIndexes = [];

    for (let i = 0; i < numAttempts; i++) {
      const newIndex = Math.floor(Math.random() * prices.length);
      if (prices[newIndex].textContent !== null) {
        randomIndexes.push(newIndex);
        originalPrices.push(parseInt(prices[newIndex].textContent as string, 10));
      }
    }

    fireEvent.click(flickCheckbox);
    expect(flickCheckbox).toBeChecked();

    for (let i = 0; i < numAttempts; i++) {
      const index = randomIndexes[i];
      expect(parseInt(prices[index].textContent as string, 10)).toBe(originalPrices[i] * flickMultiplier);
    }

    fireEvent.click(flickCheckbox);
    expect(flickCheckbox).not.toBeChecked();

    for (let i = 0; i < numAttempts; i++) {
      const index = randomIndexes[i];
      expect(parseInt(prices[index].textContent as string, 10)).toBe(originalPrices[i]);
    }
  });

  it('should verify atanytime override', async () => {
    render(<App />, { wrapper });

    expect(screen.getByLabelText('Northern')).toBeChecked();

    expect(screen.getByText('Emperor Butterfly')).toBeInTheDocument();
    expect(screen.queryByText('Common Butterfly')).not.toBeInTheDocument();
    expect(screen.queryByText('Cicada Shell')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('atAnyTimeOverride'));
    expect(screen.getByText('Emperor Butterfly')).toBeInTheDocument();
    expect(screen.getByText('Common Butterfly')).toBeInTheDocument();
    expect(screen.queryByText('Cicada Shell')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('atAnyTimeOverride'));
    expect(screen.getByText('Emperor Butterfly')).toBeInTheDocument();
    expect(screen.queryByText('Common Butterfly')).not.toBeInTheDocument();
    expect(screen.queryByText('Cicada Shell')).not.toBeInTheDocument();
  });
});
