## little-birdy

  An IRC hack: proxies stuff to IRC.

#### Installation

```sh
npm install
```

#### Justification

  It's convenient to monitor your application on IRC. But in many cases, you don't want
  your application to deal with the IRC protocol, let alone another potentially-blocking
  TCP connection. You'd be much happier if you could just send UDP out in the aether,
  wouldn't you? It's what statsd does, after all. And you're happy with that.

  This little script listens for UDP datagrams on the port of your choice, and forwards
  any and messages it receives to the configured channel on the configured IRC server.
  Your happy server process can fire off messages to the listening port, and have moderate
  confidence those messages will make it into the channel. There's no blocking, there's 
  no connection to deal with, your server stays happy and healthy if your IRC server is
  being ddosed.
  
  As an added bonus, little-birdy will listen for HTTP connections on a configurable port,
  and can send messages in to the channel triggered by HTTP requests. At this point, 
  github webhooks are supported. 

#### Usage

  Edit little-birdy.js to match your situation.

```sh
node little-birdy.js
```

