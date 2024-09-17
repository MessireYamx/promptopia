Promptopia (inspired from a youtube video)

it is a simple nextjs app that which allow you to create a prompt for chatbot and post them so other people can see them and even use them for their own chatbot.

## How to run the app

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser and go to `http://localhost:3000`
5. Enjoy!

## technologies used

- Next.js
- TailwindCSS
- MongoDB
- JavaScript
- NextAuth.js

## Features

- Create a prompt
- View all prompts
- create an account (with google)

## To Make sure the app works

- Replace all the `process.env` with your own values in the `.env.local` file
- Make sure you have a MongoDB database
- Make sure you have a google developer account and have created a project and have the client id and secret
- For the authentification, i used next-auth.js so you can check their documentation for more information (or some youtube videos)
