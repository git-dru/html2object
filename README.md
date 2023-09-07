# HTML to Object Parser

A simple library to parse HTML strings into structured JavaScript objects. Can be run in the browser or in a Node.js environment.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Usage](#usage)
3. [EndPoints](#endpoints)
4. [Built With](#built-with)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

This is a list of things you need to have prior to installing the project.

- Node.js
- npm

### Installation

- Clone the repository

```sh
https://github.com/git-dru/html2object.git
```

- Navigate into the project directory:

```sh
cd html2object

```

- Install the dependencies:

```sh
npm install
```


## USAGE

To run the script and parse an HTML file:

```sh
node server.js mark.html
```

In the browser:

- Open index.html in your browser.
- Enter your HTML content into the textarea.
- Click the "Parse" button.
- The parsed object will be displayed below.

## Endpoints

For browser-based parsing:

```sh
POST /parseHtml

```
Provide the HTML content in the request body as:


```sh
{
  "html": "[html-content]"
}
```

## Built With

- Node.js
- Express
