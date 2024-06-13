# eslint-plugin-jasmine

[![Build Status][build-image]][build-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

[build-url]: https://github.com/tlvince/eslint-plugin-jasmine/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/tlvince/eslint-plugin-jasmine/releases.yml
[npm-url]: https://www.npmjs.com/package/eslint-plugin-jasmine
[npm-image]: https://img.shields.io/npm/v/eslint-plugin-jasmine.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/eslint-plugin-jasmine.svg

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

ESLint itself provides a [Jasmine environment][env] for Jasmine's global
variables. It's therefore recommended to also enable it in your `.eslintrc`:

```yaml
plugins:
  - jasmine
env:
  jasmine: true
```

By default, no rules are enabled. See the next section for more.

[env]: http://eslint.org/docs/user-guide/configuring#specifying-environments

## Configuration

This plugin exports a `recommended` configuration that enforces good practices.

To enable this configuration, use the `extends` property in your `.eslintrc`
config file:

```yaml
plugins:
  - jasmine
env:
  jasmine: true
extends: "plugin:jasmine/recommended"
```

See the [ESLint config docs][] for more information about extending
configuration files.

[eslint config docs]: http://eslint.org/docs/user-guide/configuring#extending-configuration-files

### Rules

| Rule                              | Recommended                        | Options                    |
| --------------------------------- | ---------------------------------- | -------------------------- |
| [expect-matcher][]                | 1,                                 |
| [expect-single-argument][]        | 1,                                 |
| [missing-expect][]                | 0, `'expect()'`, `'expectAsync()'` | expectation function names |
| [named-spy][]                     | 0                                  |
| [new-line-before-expect][]        | 1                                  |
| [new-line-between-declarations][] | 1                                  |
| [no-assign-spyon][]               | 0                                  |
| [no-describe-variables][]         | 0                                  |
| [no-disabled-tests][]             | 1                                  |
| [no-expect-in-setup-teardown][]   | 1, `'expect()'`, `'expectAsync()'` | expectation function names |
| [no-focused-tests][]              | 2                                  |
| [no-global-setup][]               | 2                                  |
| [no-pending-tests][]              | 1                                  |
| [no-promise-without-done-fail][]  | 1                                  |
| [no-spec-dupes][]                 | 1, `'block'`                       | `['block', 'branch']`      |
| [no-suite-callback-args][]        | 2                                  |
| [no-suite-dupes][]                | 1, `'block'`                       | `['block', 'branch']`      |
| [no-unsafe-spy][]                 | 1                                  |
| [valid-expect][]                  | `deprecated`                       |
| [prefer-jasmine-matcher][]        | 1                                  |
| [prefer-promise-strategies][]     | 1                                  |
| [prefer-toHaveBeenCalledWith][]   | 1                                  |
| [prefer-toBeUndefined][]          | 0                                  | `['always', 'never']`      |

For example, using the recommended configuration, the `no-focused-tests` rule
is enabled and will cause ESLint to throw an error (with an exit code of `1`)
when triggered.

You may customise each rule by adding a value in your `.eslintrc` `rules`
property:

```yaml
plugins:
  - jasmine
env:
  jasmine: true
rules:
  jasmine/no-focused-tests: 0
  jasmine/no-suite-dupes:
    - 2
    - branch
```

See [configuring rules][] for more information.

[expect-matcher]: docs/rules/expect-matcher.md
[expect-single-argument]: docs/rules/expect-single-argument.md
[missing-expect]: docs/rules/missing-expect.md
[named-spy]: docs/rules/named-spy.md
[new-line-before-expect]: docs/rules/new-line-before-expect.md
[new-line-between-declarations]: docs/rules/new-line-between-declarations.md
[no-assign-spyon]: docs/rules/no-assign-spyon.md
[no-describe-variables]: docs/rules/no-describe-variables.md
[no-disabled-tests]: docs/rules/no-disabled-tests.md
[no-expect-in-setup-teardown]: docs/rules/no-expect-in-setup-teardown.md
[no-focused-tests]: docs/rules/no-focused-tests.md
[no-global-setup]: docs/rules/no-global-setup.md
[no-pending-tests]: docs/rules/no-pending-tests.md
[no-promise-without-done-fail]: docs/rules/no-promise-without-done-fail.md
[no-spec-dupes]: docs/rules/no-spec-dupes.md
[no-suite-callback-args]: docs/rules/no-suite-callback-args.md
[no-suite-dupes]: docs/rules/no-suite-dupes.md
[no-unsafe-spy]: docs/rules/no-unsafe-spy.md
[valid-expect]: docs/rules/valid-expect.md
[prefer-jasmine-matcher]: docs/rules/prefer-jasmine-matcher.md
[prefer-promise-strategies]: docs/rules/prefer-promise-strategies.md
[prefer-toHaveBeenCalledWith]: docs/rules/prefer-toHaveBeenCalledWith.md
[prefer-toBeUndefined]: docs/rules/prefer-toBeUndefined.md
[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Author

© 2016 - 2022 Tom Vincent <git@tlvince.com> and [contributors][].

[contributors]: https://github.com/tlvince/eslint-plugin-jasmine/graphs/contributors

## License

Released under the [MIT license](http://tlvince.mit-license.org).
