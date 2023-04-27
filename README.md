# LOTR SDK Playground

This repository contains the source code for a web application that allows users to explore the world of The Lord of the Rings, including the books, movies, characters, and quotes, all accessible on a single page via tabs. It uses [Next.js](https://nextjs.org/) as the web framework and [Semantic UI for React](https://react.semantic-ui.com/) as the design system.

## Installation

To run the application on your local machine, please ensure that you have [Node.js](https://nodejs.org/) installed. Then, follow the steps below:

1. Clone the repository to your local machine.

2. Open the terminal and navigate to the root directory of the project.

3. Run the following command to install the necessary dependencies:

   ```terminal
   npm install
   ```

4. Run the following command to start the development server:

   ```terminal
   npm run dev
   ```

5. Open your web browser and navigate to `http://localhost:3000` to see the application running.

## Usage

The application provides a simple user interface for exploring the world of The Lord of the Rings. It uses the [baddley-lotr-sdk](https://www.npmjs.com/package/baddley-lotr-sdk) npm package to get all the data for display.

The application consists of the following tabs:

- Books
- Movies
- Characters
- Quotes

Clicking on a tab will display the corresponding content.

## Deployment

A deployed version of this application is available at [https://lotr-sdk-playground.vercel.app/](https://lotr-sdk-playground.vercel.app/). It is hosted at [Vercel](https://vercel.com/).

## License

This project is licensed under the [MIT license](LICENSE).
