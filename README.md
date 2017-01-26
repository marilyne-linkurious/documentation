# Linkurious documentation

## Content

Input:

- [Dokapi](https://github.com/Linkurious/dokapi) configuration files are in `content/*/dokapi.json`
- Markdown files are in `content/*/content/**`
- HTML templates are in `content/*/*-template.html`

Generated sites/pages are in:

- site: `output/*/site`
- page: `output/*/page`

## Development

Run the watcher for the target you want to edit:
- user-doc site: `>npm run watch-user-site`
- user-doc page: `>npm run watch-user-page`
- user-doc (all): `>npm run watch-user`
- admin-doc site: `>npm run watch-admin-site`
- admin-doc page: `>npm run watch-admin-page`
- admin-doc (all): `>npm run watch-admin`
- all: `>npm run watch-all`

Then edit any file in `content/*/`, all changes will be detected and
the site/page will be re-generated in real-time.

## Usage

- build user-doc (site): `>npm run user-site`
- build user-doc (single page): `>npm run user-page`
- build user-doc (all): `>npm run user`
- build admin-doc (site): `>npm run admin-site`
- build admin-doc (single page): `>npm run admin-page`
- build admin-doc (all): `>npm run admin`
- build everything: `>npm run all`
