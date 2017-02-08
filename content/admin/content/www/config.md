The web server of Linkurious delivers the application to end users through HTTP/S.
It is configured within the `server` configuration key within the configuration 
file (`linkurious/config/{{config.file}}`):

## General 

Within the `server` key:

- `listenPort` (default: `3000`): The port of the web server. 

Some firewalls block network traffic ports other than `80` (HTTP).
Since only `root` users can listen on ports lower than 1024,
you may want reroute traffic from `80` to `3000` as follows:
```sh
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
```

If you use SSL, you can add a second rule to redirect `3443` to `443`:
```sh
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 3443
```

## Link generation

Within the `server` key:

- `domain` (default: `"localhost"`): The domain or sub-domain used to access the web server.
   It is mandatory to edit it for publishing visualizations online.
   It is also used to restrict the validity of cookies to a domain or sub-domain.
- `publicPortHttp` (default: `listenPort`): The *public* HTTP port of the web server. 
- `publicPortHttps` (default: `listenPortHttps`): The *public* HTTPS port of the web server. 

In some cases, Linkurious needs to generate links to itself (for example
when generating links to the widget). For that, the server needs to know
its public *domain* and *port* to generate those links.

The public port can be different from the actual port if you use traffic rerouting
(using a firewall or a reverse-proxy). In the example above (traffic rerouting),
the actual HTTP port (`listenPort`) is `3000`, but the public HTTP port (`publicPortHttp`) 
is `80`.

## Cookies

Within the `server` key:

- `cookieSecret`: The secret key used to encrypt the session cookie. Randomized on first start.
- `cookieDomain`: Set this value if you need your cookie to be set fo a domain different from `domain`.

## Cross-origin resource sharing (CORS)

Within the `server` key:

- `allowOrigin` (default: `"*"`): Define the cross-origin resource sharing (CORS) policy. 
  Accept cross-site HTTP/S requests by default (wildcard). The value can be:
  - a string (`"abc.com"`): only requests from "abc.com" domain are allowed.
  - wildcard-prefixed string (`"*.abc.com"`): request from all sub-domains of `abc.com` are allowed.
  - an array of strings (`["abc.com", "*.def.com"]`): requests from `abc.com` **and** all sub-domains of `def.com` are allowed.
  - a single wildcard (`"*"`): requests from any domain are allowed.

## Image cross-origin (client-side)

Within the `sigma` key:

- `imgCrossOrigin` (default: `"anonymous"`): Restrict the origin of images 
   displayed in visualizations to prevent running malicious code on the graphic card of users.
   Display images from any origin by default.

## SSL

Within the `server` key:

- `listenPortHttps` (default: `3443`): The port of the web server if HTTPS is enabled. See the Install section to learn why you should not set `443` directly.
- `useHttps` (default: `false`): Encrypt communications through HTTPS if `true`. Require a valid SSL certificate.
- `forceHttps` (default: `false`): Force all traffic to use HTTPS only if `true`.
  The server will redirect HTTP `GET` requests to HTTPS and reject all other HTTP requests.
- `certificateFile`: The relative path to the SSL certificate (must be located within the `linkurious/data` folder).
- `certificateKeyFile`: The relative path to a public key of the SSL certificate (must be located within the `linkurious/data` folder).
- `certificatePassphrase`: The pass-phrase protecting the SSL certificate.

External communications with the Linkurious server can be secured using SSL
without installing third-party software.

If the Linkurious server, graph database, and the search index are installed on different machines, 
we recommend to encrypting communication between them. 
Please refer to the [data-source documentation](/configure-sources) and [search index documentation](/search) to
learn how to enable HTTPS.
