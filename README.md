# eslint-plugin-no-exclusive-tests

> ESLint rule to disallow use of exclusive tests

## Usage

1. Install `eslint-plugin-no-exclusive-tests` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-no-exclusive-tests
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - no-exclusive-tests
    ```

The "no-exclusive-tests" rule is enabled by default and set to "2": "turn the
rule on as an error (exit code is 1 when triggered)" (see [Configuring
Rules][1]).

You may configure the rule by adding it in your `.eslintrc` `rules` property:

```yaml
plugins:
  - no-exclusive-tests
rules:
  no-exlusive-tests/no-exclusive-tests: 0
```

[1]: http://eslint.org/docs/configuring/

## Rules

* [no-exclusive-tests](docs/rules/no-exclusive-tests.md)

## Author

© 2015 Tom Vincent <git@tlvince.com>

## License

Licensed under the [MIT license](http://tlvince.mit-license.org).
