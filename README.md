# Twatter
> A social application where you can add your status, throughout the day! As well as, checking out others' status' too!!

Created with Node with Express backend, auth implementation using jasonWebToken, and a React with Redux frontend. Twatter allows you to post, edit, and delete any message you want to put out there. Also, you can view what others' profile and like their status messages. Can't forget: edit your profile page, too!

Deployed on Heroku: https://twatter-client-ah.herokuapp.com/

Express backend repo available here: https://github.com/Ms-Alex/twatter-server

<p align="center">
<img src="https://media.giphy.com/media/9zZKRCMpAuFLphtPgE/giphy.gif" alt="twatter still video">
</p>


## Installation

OS X & Linux:

back end:
```sh
npm install
```

front end:
```sh
cd app/ && npm install
```

** Must have node installed.

## Usage example

Before you are able to post anything, you must login, if not sign up: 

<p align="center">
<img src="https://media.giphy.com/media/620s9Zl7ROQClqyMSJ/giphy.gif" alt="twatter demo 1">
</p>


You can post a status message:

<p align="center">
<img src="https://media.giphy.com/media/byA9kaRwtDE4EyMR9w/giphy.gif" alt="twatter demo 2">
</p>


You can edit and delete a status message:

<p align="center">
<img src="https://media.giphy.com/media/14OwlZOprULws4oFfv/giphy.gif" alt="twatter demo 3">
</p>

You can like someone's message; but, not your own:

<p align="center">
<img src="https://media.giphy.com/media/1lxkgncILptIxsTaT0/giphy.gif" alt="twatter demo 4">
</p>

You can view someone's page, and edit your profile image:

<p align="center">
<img src="https://media.giphy.com/media/1lvoupVws7UQgOf3Fn/giphy.gif" alt="twatter demo 5">
</p>


## Development setup

Note: Make sure you have mongo installed. To install via brew: https://treehouse.github.io/installation-guides/mac/mongo-mac.html

backend:

On separate terminals run: `mongod` and `mongo`.

Then, inside this repo (twatter-app/), run:
```sh
npm start
```

frontend:
```sh
cd app/ && npm start
```

## Release History

* 0.1.0
    * The first proper release

## Meta

Alexandra Hernandez – ms.hernandeza1@gmail.com

[https://github.com/Ms-Alex/github-link]

## Contributing

1. Fork it (<https://github.com/Ms-Alex/twatter-client/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request