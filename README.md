Here’s a **README** description for your GitHub repository:

---

# Hodlinfo Clone - QuadB Node.js Assignment

This project is a clone of the **[hodlinfo.com](https://hodlinfo.com/)** webpage. It is built using **Node.js**, **Express**, and **SQLite**, and fetches real-time cryptocurrency data from the **WazirX API**. The website dynamically displays the best prices for trading cryptocurrencies across multiple platforms, resembling the original website in terms of both functionality and design.

---

## Features

- **Real-time Cryptocurrency Data**: Fetches the top 10 cryptocurrency data from the [WazirX API](https://api.wazirx.com/api/v2/tickers).
- **SQLite Database**: Stores cryptocurrency data like `name`, `last traded price`, `buy`, `sell`, `volume`, and `base unit`.
- **Dynamic Data Rendering**: Updates data on the front end without needing a page refresh.
- **Responsive Design**: Adapts to different screen sizes (mobile, tablet, desktop).
- **Dark Theme**: Follows a dark theme similar to the original hodlinfo website.
- **Auto-Update Data**: Fetches new data every few minutes to ensure accurate, up-to-date information.

---

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/thanusree45/hodlinfo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd hodlinfo_clone
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the SQLite database:
   - The database schema will automatically be created when the project is run.

5. Start the server:

   ```bash
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to view the website.

---

## API Reference

- **GET /api/getTop10**: Fetches the top 10 cryptocurrency data from the SQLite database.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **SQLite**
- **Axios** (for API requests)
- **HTML/CSS/JavaScript**

---

## Future Improvements

- Implement user authentication.
- Add more cryptocurrency-related data points.
- Deploy the app to platforms like Heroku or Vercel.

---

## License

This project is licensed under the MIT License.

---

Feel free to adjust any part of this depending on the specifics of your project!
