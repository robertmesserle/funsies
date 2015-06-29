# generateRegex()

[Live Demo](http://codepen.io/robertmesserle/full/ac7ef34af1dec8542f7415b3d62d4344/)

This is a quick proof-of-concept tool I wrote to provide a cleaner syntax for generating complex
regular expressions.

It will convert this:

```javascript
generateRegex(function () {
  return [
    start,
    set(letters).some,
    group(
      set('-_.').any,
      set(letters, numbers).some
    ).any,
    literal('@'),
    set(letters).some,
    group(
      set('-.').any,
      set(letters, numbers).some
    ).any,
    literal('.'),
    set(letters).min(2),
    end
  ];
}, 'gi');
```

Into this:

```javascript
/^[a-z]+([-_\.]*[a-z0-9]+)*@[a-z]+([-\.]*[a-z0-9]+)*\.[a-z]{2,}$/gi
```

It is also smart enough to ignore case-sensitive syntax differences if the `i` flag is passed.  For
example, if you call `set(letters)` without the `i` flag, it will return `[A-Za-z]` whereas it is
smart enough to remove the extra set with the `i` flag, returning `[a-z]`.  Insignificant?  Yes.
But still kind of cool.

## Idea for ES6 syntax using template-strings

```javascript
generateRegex(`
  <start />
  <set some><letters /></set>
  <group any>
    <set any>-_.</set>
    <set some>
      <letters />
      <numbers />
    </set>
  </group>
  @
  <set any>
    <letters />
  </set>
  <group any>
    <set any>-.</set>
    <set some>
      <letters />
      <numbers />
    </set>
  </group>
  .
  <set min=2>
    <letters />
  </set>
  <end />
`);
```
