# Change log

All notable changes to this project will be documented in this file, following
the [Keep a CHANGELOG](http://keepachangelog.com) format.

## [1.0.0] - 2015-01-24

### Added

- Jasmine v2.1 support (`fdescribe`, `fit`)

### Changed

- Renamed the project/plugin to `eslint-plugin-jasmine` to better describe it's
  Jasmine-focused and for expansion into new rules
- Modularised `xdescribe` and `xit` into their own rule (`no-disabled-tests`)

## [0.2.0] - 2014-09-09

### Added

- Support for ESLint v0.8's plugin API

## 0.1.0 - 2014-06-18

### Added

- ESLint warnings for the following identifiers: `ddescribe`, `xdescribe`,
  `iit`, `xit`

[1.0.0]: https://github.com/tlvince/eslint-plugin-jasmine/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/tlvince/eslint-plugin-jasmine/compare/v0.1.0...v0.2.0
