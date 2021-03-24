

# Directory Structure

Aerobatic defaults to some specific common front-end conventions. By conforming to these conventions you can simplify your configuration (convention over configuration).

Here is the basic suggested skeleton for your app repo that each of the starter templates conforms to:

```bash
├── dist (or build)
├── node_modules
├── public
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── components
│       │   │   │       └── index.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── components
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       ├── components
│       │       │       └── index.js
│       │       └── index.js
│       └── index.js
├── index.js
├── test
├── .env
├── .env.production
├── .eslintrc.js
├── .gitignore
├── .postcssrc.js
├── Babel.config.js
├── CHANGELOG.md
├── jest.config.js
├── LICENCE
├── package.json
├── README.md
└── vue.config.js
```

Your app's source code is nested beneath the `app` directory. This is where assets are served from in `debug` mode. Note that in most cases it is not necessary to setup a watch to re-compile languages and syntaxes including CoffeeScript, Sass, Stylus, Jade, and LESS as the development server will automatically do this for you in middleware. Note that in your index page, you should not include the `/app` prefix since the development asset server will treat it as the root.

```html
<!- Serves app/js/main.js-->
<script data-aero-build="debug" src="/js/main.js"></script>
```

For deployment, `yoke` assumes that all the files (including the index page) required to run in `release` mode have been written to a directory called either `dist` or `build` off the root. Grunt or Gulp both have good facilities for writing the outputs of a task to a different directory.

### Installation



#### Usage

``` bash
# clone the project 
$ git clone https://github.com/marco-antonio-gb/dpic-cliente-vuetify.git
 

# Install dependencies
$ cd dpic-cliente
$ npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

 

```

For a detailed explanation on how things work, check out the [Vue CLI Guide](https://cli.vuejs.org/guide/).

### Documentation

CoreUI tools documentation:

- Components documentation: [CoreUI Vue library](https://coreui.io/vue/docs)
- Styles documentation: [CoreUI styles](https://coreui.io/docs/3.0-beta/)
- Icons documentation: [CoreUI Icons](http://coreui.io/icons)

### Bugs and feature requests

Have a bug or a feature request? [Please open a new issue](https://github.com/coreui/coreui-free-vue-admin-template/issues).

### Contributing

Please read through our [contributing guidelines](https://github.com/coreui/coreui-free-vue-admin-template/blob/master/.github/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

### Versioning

For transparency into our release cycle and in striving to maintain backward compatibility,CoreUI Free Admin Template is maintained under [the Semantic Versioning guidelines](http://semver.org/).

See [the Releases section of our project](https://github.com/coreui/coreui-free-vue-admin-template/releases) for changelogs for each release version.

### Our other products

CoreUI is built on top of Bootstrap 4 and supports popular frameworks.

## Support CoreUI Development

CoreUI is an MIT licensed open source project and completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support development by buying [PRO version](https://coreui.io/pro/).
