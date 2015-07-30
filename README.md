# eslint-plugin-jasmine

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/tlvince/eslint-plugin-jasmine
[travis-image]: https://img.shields.io/travis/tlvince/eslint-plugin-jasmine.svg

> ESLint rules for Jasmine

## Usage

1. Install `eslint-plugin-jasmine` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-jasmine
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - jasmine
    ```

## Configuration

This plugin ships with a default configuration for each rule:

Rule                    | Default    | Options
----                    | -------    | -------
[no-focused-tests][]    | 2          |
[no-disabled-tests][]   | 1          |
[no-suite-dupes][]      | 1, 'block' | ['block', 'branch']

For example, the `no-focused-tests` rule is enabled by default and will cause
ESLint to throw an error (with an exit code of `1`) when triggered.

You may customise each rule by adding a value in your `.eslintrc` `rules`
property:

```yaml
plugins:
  - jasmine
rules:
  jasmine/no-focused-tests: 0
  jasmine/no-suite-dupes:
    - 2
    - "branch"
```

See [configuring rules][] for more information.

[no-focused-tests]: docs/rules/no-focused-tests.md
[no-disabled-tests]: docs/rules/no-disabled-tests.md
[no-suite-dupes]: docs/rules/no-suite-dupes.md
[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Author

© 2015 Tom Vincent <git@tlvince.com>

## License

Licensed under the [MIT license](http://tlvince.mit-license.org).
