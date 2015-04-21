# dedupe-stream

A stream that prevents consecutive duplicate emissions.

## Example

```javascript
var dedupeStream = require('dedupe-stream')

var dedupe = dedupeStream()

dedupe.write({fruit: 'apples'}) // emits {fruit: 'apples'}

dedupe.write({fruit: 'apples'}) // does not emit

dedupe.write({fruit: 'oranges'}) // emits {fruit: 'oranges'}
```

## API

`dedupe() -> DuplexStream`

* Input is anything (See "Notes" below)
* Output is whatever you wrote, assuming it is unique compared to the previous
  emission.

## Notes

Internally, dedupeStream clones the emitted value using
`JSON.parse(JSON.stringify(obj)))` in order to avoid downstream changes from
throwing off the equality check. This means that things that aren't faithfully
`JSON.stringify`ed, such as functions and objects with circular references,
will cause an error to throw.

## License

This project is licensed under the Apache License, Version 2.0. See
[LICENSE][license] for the full license.

[license]: ./LICENSE
