# chat-app

#### INDEX
* client -- web app client (tested in chrome desktop/android and safari iOS)
* server -- spaces server (simple in memory nodejs/express communication server process)
* toolchain -- justcode. compiles client project using webpack.

```sh
$ python -m http.server --directory client/app/dist
$ cp client/app/config-EXAMPLE.json client/app/dist/config.json
copy webcomponents.js (from the webcomponents.js project to client/app/dist
```
Browse: http://localhost:8000

-------------
v2019.10.23
