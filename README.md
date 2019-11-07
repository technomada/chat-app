## client application

### setup
$ npm i

### build
$ npx h2js build

### run
$ python -m http.server --directory ./dist   (or your fav local http server)
browse to: http://localhost:8000

## backend server

This application uses a "spaces server" to sync messages.

### install server
$ git clone https://github.com/technomada/spaces-server.git

$ cd spaces-server
$ npm i
$ npm start


## Using the chat

Open the chat in a browser, click the bottom of the page, type a message and press enter to send.

On a seprate device a or different browser on the same device open the chat and do the same.

### media
The chat system supports the display of media.

#### images
paste images urls

### audio
paste audio urls

### video
paste video file urls

### youtube
paste youtube page urls.
