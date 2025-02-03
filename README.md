# Currency Converter

## Overview
This is a simple currency converter web application that allows users to convert between different currencies using real-time exchange rates. The project fetches exchange rate data from the **ExchangeRate-API**.

## Technologies Used
- **HTML**: Structure of the webpage.
- **CSS**: Styling and layout.
- **JavaScript**: Fetching and handling API data.
- **ExchangeRate-API**: To get live exchange rates.

## Features
- Convert between over 150 currencies.
- Real-time exchange rate updates.
- User-friendly interface.

## How It Works
1. Enter the amount you want to convert.
2. Select the base currency.
3. Select the target currency.
4. The app fetches real-time exchange rates from **ExchangeRate-API**.
5. The converted amount is displayed instantly.

## Hosted Version
You can access the live version of the project on **GitHub Pages**:
[https://anass-fajoui.github.io/Currency-Converter/](https://anass-fajoui.github.io/Currency-Converter/)

## API Usage
- The application makes a request to:
  ```
  https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
  ```
  Replace `USD` with the base currency of your choice.

## Future Enhancements
- Add historical exchange rate data.
- Implement a dark mode.
- Support for multiple language translations.

## Credits
Developed by **Anass Fajoui**.
