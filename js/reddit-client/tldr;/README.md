# TLDR;

## The app that saves you time

How much time could be saved by reading only the important parts of a long post? This app aims to seamlessly allow users to browse text posts only letting them look at what's important. The minimal design aims to keep you informed, but reduce the user's screen time.

## How?

The app makes an api call sending the text to a summarizing service. The result is the post displaying a summarized version of the text.

## To-Do's

### Authentication

- [ ] Register your app with the authentication provider, such as Reddit or Google.
- [ ] Obtain the necessary credentials, such as a client ID and secret.
- [ ] Install the necessary libraries or packages for your chosen authentication method.
- [ ] Set up the necessary routes or pages in your Next.js app for authentication, such as a  login page and callback page.
- [ ] Implement the necessary code to handle the authentication flow, such as redirecting the user to the authentication provider's login page and handling the callback from the provider.
- [ ] Store the user's authentication token securely in your app.
- [ ] Implement the necessary code to check if the user is authenticated on protected routes or pages.
- [ ] Add logout functionality, such as clearing the user's authentication token and redirecting them to the login page.

### App features

- [ ] fetches user feed (text posts only)
- [ ] displays the summarized version
- [ ] has read more option
- [ ] displays comments
- [ ] allows user to toggle between summarized and normal text
- [ ] user can upvote / downvote
- [ ] user can comment

### Development Steps

1. Set up the Next.js project and install any necessary dependencies.
2. Create the authentication system using a library such as NextAuth.js or Passport.js. This will allow users to sign up, log in, and access their personalized content.
Set up the necessary Reddit API endpoints for fetching data, such as posts, comments, and user information.
3. Implement api call to summarize text
4. display card with summarized text

### visual style

I would like to take inspiration from the NextUI library. And would like the components
to be blocky, but not sharp. Giving the illusion that the page is built sort of like a Lego with blocks floating between and some stacked on top of each other.
