# eslint-plugin-expires [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

[travis-image]: https://img.shields.io/travis/digencer/eslint-plugin-expires/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/digencer/eslint-plugin-expires
[npm-image]: https://img.shields.io/npm/v/eslint-plugin-expires.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/eslint-plugin-expires

An ESLint plugin that warns on and after a specified date/time

## Installation
First, you'll need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Then, install `eslint-plugin-expires`:

```
$ npm install eslint-plugin-expires --save-dev
```

## Configuration

Add eslint-plugin-expires to your `.eslintrc` file by specifying it in `plugins` section.

```json
{
    "plugins": [
        "expires"
    ]
}
```

Next, enable rule in `rules` section.

```json
{
    "rules": {
        "expires": 2
    }
}
```

## Usage
```
// EXPIRES: 2016-06-15
// EXPIRES: 2016-06-15T02:00+01:00
// EXPIRES: 2016-06-15T22:48:11Z
```
* You need to add rule with line comment `//`
* You must write `EXPIRES:` (capitalized and colon appended)
* Specify date in ISO-8601 format such as `1992-08-09`. Otherwise, rule gives `Invalid date!` error.
* If you want to add hour, you need to specify timezone. Otherwise, rule gives `You must define a timezone` error.
* If everything configured properly, when the given date comes, rule gives `Expires date!` error.
