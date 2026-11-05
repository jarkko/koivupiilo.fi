#!/usr/bin/env node

// adapters/hook.ts
import { spawnSync } from "node:child_process";
import { existsSync as existsSync2 } from "node:fs";
import { isAbsolute as isAbsolute2, join as join3, relative as relative2, resolve, sep } from "node:path";

// src/config.ts
import { closeSync, constants, existsSync, lstatSync, openSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, posix, relative } from "node:path";

// node_modules/smol-toml/dist/error.js
function getLineColFromPtr(string, ptr) {
  let lines = string.slice(0, ptr).split(/\r?\n/);
  return [lines.length, lines.pop().length + 1];
}
function makeCodeBlock(string, line, column) {
  let lines = string.split(/\r?\n/);
  let codeblock = "";
  let numberLen = (Math.log10(line + 1) | 0) + 1;
  for (let i = line - 1; i <= line + 1; i++) {
    let l = lines[i - 1];
    if (!l)
      continue;
    codeblock += i.toString().padEnd(numberLen, " ");
    codeblock += ":  ";
    codeblock += l;
    codeblock += "\n";
    if (i === line) {
      codeblock += " ".repeat(numberLen + column + 2);
      codeblock += "^\n";
    }
  }
  return codeblock;
}
var TomlError = class _TomlError extends Error {
  line;
  column;
  codeblock;
  constructor(message, options) {
    const [line, column] = getLineColFromPtr(options.toml, options.ptr);
    const codeblock = makeCodeBlock(options.toml, line, column);
    super(`Invalid TOML document: ${message}

${codeblock}`, options);
    this.line = line;
    this.column = column;
    this.codeblock = codeblock;
  }
  /** @internal */
  static x(message, ctx, ptr) {
    throw new _TomlError(message, { toml: ctx.s, ptr: ptr ?? ctx.p });
  }
};

// node_modules/smol-toml/dist/primitive.js
function parseString(ctx) {
  let startPtr = ctx.p;
  let c = ctx.s.charCodeAt(ctx.p++);
  let first = c;
  let isLiteral = c === 39;
  let isMultiline = c === ctx.s.charCodeAt(ctx.p) && c === ctx.s.charCodeAt(ctx.p + 1);
  if (isMultiline) {
    if ((c = ctx.s.charCodeAt(ctx.p += 2)) === 10)
      ctx.p++;
    else if (c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10)
      ctx.p += 2;
  }
  let parsed = "";
  let sliceStart = ctx.p;
  let state = 0;
  for (; ctx.p < ctx.s.length; ctx.p++) {
    c = ctx.s.charCodeAt(ctx.p);
    if (isMultiline && (c === 10 || c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10)) {
      state = state && 3;
    } else if (c < 32 && c !== 9 || c === 127) {
      TomlError.x("control characters are not allowed in strings", ctx);
    } else if ((!state || state === 3) && c === first && (!isMultiline || ctx.s.charCodeAt(ctx.p + 1) === first && ctx.s.charCodeAt(ctx.p + 2) === first)) {
      if (isMultiline) {
        if (ctx.s.charCodeAt(ctx.p + 3) === first)
          ctx.p++;
        if (ctx.s.charCodeAt(ctx.p + 3) === first)
          ctx.p++;
      }
      if (!state) {
        let s = ctx.s.slice(sliceStart, ctx.p);
        parsed = parsed ? parsed + s : s;
      }
      ctx.p += isMultiline ? 3 : 1;
      return parsed;
    } else if (!state) {
      if (!isLiteral && c === 92) {
        parsed += ctx.s.slice(sliceStart, sliceStart = ctx.p);
        state = 1;
      }
    } else if (state === 1) {
      if (c === 120 || c === 117 || c === 85) {
        let errPtr = ctx.p++ - 1;
        let value = 0;
        let len = c === 120 ? 2 : c === 117 ? 4 : 8;
        for (let j = 0; j < len; j++, ctx.p++) {
          let hex = ctx.s.charCodeAt(ctx.p);
          let digit = (
            /* 0-9 */
            hex >= 48 && hex <= 57 ? hex - 48 : (
              /* A-F */
              hex >= 65 && hex <= 70 ? hex - 65 + 10 : (
                /* a-f */
                hex >= 97 && hex <= 102 ? hex - 97 + 10 : -1
              )
            )
          );
          if (digit < 0)
            TomlError.x("invalid non-hex character in unicode escape", ctx);
          value = value << 4 | digit;
        }
        if (value < 0 || value > 1114111 || value >= 55296 && value <= 57343) {
          TomlError.x("invalid unicode escape", ctx, errPtr);
        }
        parsed += String.fromCodePoint(value);
        sliceStart = ctx.p--;
        state = 0;
      } else if (isMultiline && (c === 32 || c === 9)) {
        state = 2;
      } else {
        if (c === 98)
          parsed += "\b";
        else if (c === 116)
          parsed += "	";
        else if (c === 110)
          parsed += "\n";
        else if (c === 102)
          parsed += "\f";
        else if (c === 114)
          parsed += "\r";
        else if (c === 101)
          parsed += "\x1B";
        else if (c === 34)
          parsed += '"';
        else if (c === 92)
          parsed += "\\";
        else
          TomlError.x("unrecognised escape sequence", ctx);
        sliceStart = ctx.p + 1;
        state = 0;
      }
    } else if (c !== 32 && c !== 9) {
      if (state === 2)
        TomlError.x("invalid escape: only line-ending whitespace may be escaped", ctx, sliceStart);
      state = !isLiteral && c === 92 ? 1 : 0;
      sliceStart = ctx.p;
    }
  }
  TomlError.x("unfinished string", ctx, startPtr);
}

// node_modules/smol-toml/dist/date.js
var DATE_TIME_RE = /^(\d{4}-\d{2}-\d{2})?[Tt ]?(?:(\d{2}):\d{2}(?::\d{2}(?:\.\d+)?)?)?(Z|z|[-+]\d{2}:\d{2})?$/i;
var TomlDate = class _TomlDate extends Date {
  #hasDate = false;
  #hasTime = false;
  #offset = null;
  constructor(date, fasttype, unsafeDelim) {
    let hasDate = true;
    let hasTime = true;
    let offset = "Z";
    let c;
    if (typeof date === "string") {
      if (fasttype)
        prep: {
          if (fasttype < 3) {
            if (+date.slice(11, 13) > 23) {
              date = "";
              break prep;
            }
            if (fasttype === 2) {
              offset = null;
              date += "Z";
            } else if ((c = date.charCodeAt(date.length - 1)) !== 90 && c !== 122) {
              offset = date.slice(date.length - 6);
            }
            if (unsafeDelim)
              date = date.slice(0, 10) + "T" + date.slice(11);
          } else if (fasttype === 4) {
            date = +date.slice(0, 2) > 23 ? "" : `0000-01-01T${date}Z`;
          }
          hasDate = fasttype !== 4;
          hasTime = fasttype !== 3;
        }
      else {
        let match = date.match(DATE_TIME_RE);
        if (match) {
          if (!match[1]) {
            hasDate = false;
            date = `0000-01-01T${date}`;
          }
          hasTime = !!match[2];
          hasTime && date[10] === " " && (date = date.replace(" ", "T"));
          if (match[2] && +match[2] > 23) {
            date = "";
          } else {
            offset = match[3] || null;
            if (!offset && hasTime)
              date += "Z";
          }
        } else {
          date = "";
        }
      }
    }
    super(date);
    if (!isNaN(this.getTime())) {
      this.#hasDate = hasDate;
      this.#hasTime = hasTime;
      this.#offset = offset;
    }
  }
  isDateTime() {
    return this.#hasDate && this.#hasTime;
  }
  isLocal() {
    return !this.#hasDate || !this.#hasTime || !this.#offset;
  }
  isDate() {
    return this.#hasDate && !this.#hasTime;
  }
  isTime() {
    return this.#hasTime && !this.#hasDate;
  }
  isValid() {
    return this.#hasDate || this.#hasTime;
  }
  toISOString() {
    let iso = super.toISOString();
    if (this.isDate())
      return iso.slice(0, 10);
    if (this.isTime())
      return iso.slice(11, 23);
    if (this.#offset === null)
      return iso.slice(0, -1);
    if (this.#offset === "Z" || this.#offset === "z")
      return iso;
    let offset = +this.#offset.slice(1, 3) * 60 + +this.#offset.slice(4, 6);
    offset = this.#offset[0] === "-" ? offset : -offset;
    let offsetDate = new Date(this.getTime() - offset * 6e4);
    return offsetDate.toISOString().slice(0, -1) + this.#offset;
  }
  static wrapAsOffsetDateTime(jsDate, offset = "Z") {
    let date = new _TomlDate(jsDate);
    date.#offset = offset;
    return date;
  }
  static wrapAsLocalDateTime(jsDate) {
    let date = new _TomlDate(jsDate);
    date.#offset = null;
    return date;
  }
  static wrapAsLocalDate(jsDate) {
    let date = new _TomlDate(jsDate);
    date.#hasTime = false;
    date.#offset = null;
    return date;
  }
  static wrapAsLocalTime(jsDate) {
    let date = new _TomlDate(jsDate);
    date.#hasDate = false;
    date.#offset = null;
    return date;
  }
};

// node_modules/smol-toml/dist/extract.js
function isDigit(char, base = 10) {
  return base === 16 ? char > 47 && char < 58 || char > 64 && char < 71 || char > 96 && char < 103 : char > 47 && char < 48 + base;
}
function isEndOfValue(char, delim) {
  return char === 32 || char === 9 || char === 10 || char === 13 || // Structure end or next value delimiter
  delim && (char === delim || char === 44) || // Comment
  char === 35;
}
function extractValue(ctx, end) {
  let errPtr = ctx.p;
  let c = ctx.s.charCodeAt(ctx.p);
  if (c === 91 || c === 123) {
    ctx.d-- || TomlError.x("document contains excessively nested structures. aborting.", ctx);
    let value = c === 91 ? parseArray(ctx) : parseInlineTable(ctx);
    ctx.d++;
    return value;
  }
  if (c === 34 || c === 39) {
    return parseString(ctx);
  }
  if (c === 116) {
    if (ctx.s.charCodeAt(++ctx.p) !== 114 || ctx.s.charCodeAt(++ctx.p) !== 117 || ctx.s.charCodeAt(++ctx.p) !== 101)
      TomlError.x("invalid value", ctx, errPtr);
    return ctx.p++, true;
  }
  if (c === 102) {
    if (ctx.s.charCodeAt(++ctx.p) !== 97 || ctx.s.charCodeAt(++ctx.p) !== 108 || ctx.s.charCodeAt(++ctx.p) !== 115 || ctx.s.charCodeAt(++ctx.p) !== 101)
      TomlError.x("invalid value", ctx, errPtr);
    return ctx.p++, false;
  }
  if (c === 43 || c === 45) {
    return parseNumber(ctx, ctx.p, ctx.s.charCodeAt(++ctx.p), 44 - c, end);
  }
  if (ctx.s.charCodeAt(ctx.p + 4) === 45 && ctx.s.charCodeAt(ctx.p + 7) === 45) {
    return parseDate(ctx, c, end);
  }
  if (ctx.s.charCodeAt(ctx.p + 2) === 58) {
    return parseTime(ctx, c, end);
  }
  return parseNumber(ctx, ctx.p, c, 0, end);
}
function parseNumber(ctx, startPtr, startChr, sign, endChr) {
  let c = startChr;
  let state = 0;
  let hasUnderscores = false;
  if (c === 105) {
    if (ctx.s.charCodeAt(++ctx.p) !== 110 || ctx.s.charCodeAt(++ctx.p) !== 102)
      TomlError.x("invalid value", ctx, startPtr);
    return ctx.p++, (sign || 1) / 0;
  }
  if (c === 110) {
    if (ctx.s.charCodeAt(++ctx.p) !== 97 || ctx.s.charCodeAt(++ctx.p) !== 110)
      TomlError.x("invalid value", ctx, startPtr);
    return ctx.p++, NaN;
  }
  if (c === 48) {
    if (++ctx.p >= ctx.s.length || isEndOfValue(c = ctx.s.charCodeAt(ctx.p), endChr))
      return ctx.bi === true ? 0n : 0;
    if (!sign) {
      if (c === 120)
        return parseIntegerBaseN(ctx, startPtr, 16, endChr);
      else if (c === 98)
        return parseIntegerBaseN(ctx, startPtr, 2, endChr);
      else if (c === 111)
        return parseIntegerBaseN(ctx, startPtr, 8, endChr);
    }
    if (c === 46)
      state = 2;
    else if (c === 101 || c === 69)
      state = 4;
    else
      TomlError.x("illegal leading zero", ctx, startPtr);
  } else if (!isDigit(c))
    TomlError.x("invalid value", ctx, startPtr);
  while (++ctx.p < ctx.s.length && (c = ctx.s.charCodeAt(ctx.p), !isEndOfValue(c, endChr))) {
    if (!state)
      state = 1;
    if (c === 95) {
      if (!(state & 1))
        TomlError.x("illegal underscore", ctx);
      state += 11;
      hasUnderscores = true;
    } else if (state === 1 && c === 46)
      state = 2;
    else if ((state === 1 || state === 3) && (c === 101 || c === 69))
      state = 4;
    else if (state === 4 && (c === 43 || c === 45)) {
      state = 6;
    } else if (!isDigit(c))
      TomlError.x(`illegal character in numeric literal`, ctx);
    else if (state > 9)
      state -= 11;
    else if (!(state & 1))
      state++;
  }
  if (!state) {
    let val = (startChr - 48) * (sign || 1);
    return ctx.bi === true ? BigInt(val) : val;
  }
  if (!(state & 1))
    TomlError.x("unfinished numeric value", ctx, startPtr);
  let str = ctx.s.slice(startPtr, ctx.p);
  if (hasUnderscores)
    str = str.replaceAll("_", "");
  return state > 1 ? parseFloat(str) : parseInteger(ctx, str, 10, startPtr);
}
function parseIntegerBaseN(ctx, startPtr, base, endChr) {
  let c, underscore = 1;
  while (++ctx.p < ctx.s.length && (c = ctx.s.charCodeAt(ctx.p), !isEndOfValue(c, endChr))) {
    if (c === 95) {
      if (underscore & 1)
        TomlError.x("illegal underscore", ctx);
      underscore = 3;
    } else if (!isDigit(c, base))
      TomlError.x(`illegal character in numeric literal`, ctx);
    else if (underscore & 1)
      underscore--;
  }
  if (underscore & 1)
    TomlError.x("unfinished numeric value", ctx);
  let str = ctx.s.slice(startPtr + 2, ctx.p);
  if (underscore)
    str = str.replaceAll("_", "");
  return parseInteger(ctx, str, base, startPtr);
}
function parseInteger(ctx, str, base, startPtr) {
  if (ctx.bi !== true)
    int: {
      let val = parseInt(str, base);
      if (!Number.isSafeInteger(val)) {
        if (ctx.bi)
          break int;
        TomlError.x("integer value cannot be represented losslessly", ctx, startPtr);
      }
      return val;
    }
  return base === 10 ? BigInt(str) : BigInt((base === 2 ? "0b" : base === 8 ? "0o" : "0x") + str);
}
function parseDate(ctx, c, endChr) {
  let startPtr = ctx.p++, unsafeSeparator;
  if (!isDigit(c) || !isDigit(ctx.s.charCodeAt(ctx.p++)) || !isDigit(ctx.s.charCodeAt(ctx.p++)) || !isDigit(ctx.s.charCodeAt(ctx.p++))) {
    return parseNumber(ctx, ctx.p = startPtr, c, 0, endChr);
  }
  ctx.p += 5;
  if (!isDigit(ctx.s.charCodeAt(ctx.p++)))
    TomlError.x("invalid date-time: date part is malformed", ctx, startPtr);
  if (ctx.p >= ctx.s.length || ((c = ctx.s.charCodeAt(ctx.p)) !== 32 || (unsafeSeparator = true, !isDigit(ctx.s.charCodeAt(ctx.p + 1)))) && c !== 84 && c !== 116) {
    let t2 = ctx.s.slice(startPtr, ctx.p);
    return readDate(ctx, t2, 3, false, startPtr);
  }
  if (ctx.s.charCodeAt(ctx.p += 3) !== 58)
    TomlError.x("invalid date-time: time part is malformed", ctx, startPtr);
  if (ctx.s.charCodeAt(ctx.p += 3) === 58)
    ctx.p += 3;
  if (ctx.s.charCodeAt(ctx.p) === 46)
    while (isDigit(ctx.s.charCodeAt(++ctx.p)))
      ;
  if (c = ctx.s.charCodeAt(ctx.p)) {
    if (c === 90 || c === 122) {
      let t2 = ctx.s.slice(startPtr, ++ctx.p);
      return readDate(ctx, t2, 1, unsafeSeparator, startPtr, "[+00:00]");
    }
    if (c === 43 || c === 45) {
      let t2 = ctx.s.slice(startPtr, ctx.p += 6);
      return readDate(ctx, t2, 1, unsafeSeparator, startPtr, !ctx.ld && "[" + ctx.s.slice(ctx.p - 6, ctx.p) + "]");
    }
  }
  let t = ctx.s.slice(startPtr, ctx.p);
  return readDate(ctx, t, 2, unsafeSeparator, startPtr);
}
function parseTime(ctx, c, endChr) {
  let start = ctx.p;
  if (!isDigit(c) || !isDigit(ctx.s.charCodeAt(++ctx.p))) {
    return parseNumber(ctx, --ctx.p, c, 0, endChr);
  }
  if (ctx.s.charCodeAt(ctx.p += 4) === 58)
    ctx.p += 3;
  if (ctx.s.charCodeAt(ctx.p) === 46)
    while (isDigit(ctx.s.charCodeAt(++ctx.p)))
      ;
  let t = ctx.s.slice(start, ctx.p);
  return readDate(ctx, t, 4, false, start);
}
function readDate(ctx, str, type, unsafeDelim, errPtr, temporalSuffix) {
  if (ctx.ld) {
    let date = new TomlDate(str, type, unsafeDelim);
    if (!date.isValid())
      TomlError.x("invalid date", ctx, errPtr);
    return date;
  }
  try {
    if (temporalSuffix)
      str += temporalSuffix;
    switch (type) {
      case 1:
        return Temporal.ZonedDateTime.from(str);
      case 2:
        return Temporal.PlainDateTime.from(str);
      case 3:
        return Temporal.PlainDate.from(str);
      case 4:
        return Temporal.PlainTime.from(str);
    }
  } catch (e) {
    TomlError.x(e instanceof Error ? e.message : "" + e, ctx, errPtr);
  }
}

// node_modules/smol-toml/dist/util.js
function skipComment(ctx) {
  for (; ctx.p < ctx.s.length; ctx.p++) {
    let c = ctx.s.charCodeAt(ctx.p);
    if (c === 10)
      break;
    if (c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10) {
      ctx.p++;
      break;
    }
    if (c < 32 && c !== 9 || c === 127) {
      TomlError.x("control characters are not allowed in comments", ctx);
    }
  }
}
function skipVoid(ctx, banNewLines, banComments) {
  let c;
  while (ctx.p < ctx.s.length) {
    while (ctx.p < ctx.s.length && ((c = ctx.s.charCodeAt(ctx.p)) === 32 || c === 9 || !banNewLines && (c === 10 || c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10)))
      ctx.p++;
    if (banComments || c !== 35)
      break;
    skipComment(ctx);
  }
}

// node_modules/smol-toml/dist/struct.js
function parseKey(ctx, end = 61) {
  let startPtr;
  let state = 0;
  let parsed = [];
  let sliceStart;
  let c = ctx.s.charCodeAt(startPtr = ctx.p);
  do {
    if (c === end) {
      if (!state)
        TomlError.x("unexpected end of key", ctx);
      if (state === 1)
        parsed.push(ctx.s.slice(sliceStart, ctx.p));
      return ctx.p++, parsed;
    } else if (c === 46) {
      if (!state)
        TomlError.x("illegal empty bare key", ctx);
      if (state === 1)
        parsed.push(ctx.s.slice(sliceStart, ctx.p));
      state = 0;
    } else if (!state && (c === 34 || c === 39)) {
      if (c === ctx.s.charCodeAt(ctx.p + 1) && c === ctx.s.charCodeAt(ctx.p + 2))
        TomlError.x("illegal quoted key: multiline strings are not allowed", ctx);
      parsed.push(parseString(ctx));
      state = 2;
      ctx.p--;
    } else if (c === 32 || c === 9) {
      if (state === 1) {
        parsed.push(ctx.s.slice(sliceStart, ctx.p));
        state = 2;
      }
    } else if (state === 2 || c < 48 && c !== 45 || c > 57 && c < 65 || c > 90 && c < 97 && c !== 95 || c > 122) {
      TomlError.x("illegal character in key", ctx);
    } else if (!state) {
      state = 1;
      sliceStart = ctx.p;
    }
  } while (c = ctx.s.charCodeAt(++ctx.p));
  TomlError.x("incomplete key-value: cannot find end of key", ctx, startPtr);
}
function parseInlineTable(ctx) {
  let startPtr = ctx.p++;
  let res = /* @__PURE__ */ Object.create(null);
  let seen = /* @__PURE__ */ new Set();
  let c;
  while (ctx.p < ctx.s.length) {
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p)) === 125) {
      ctx.p++;
      return res;
    }
    let k;
    let t = res;
    let hasOwn = false;
    let errPtr = ctx.p;
    let key = parseKey(ctx);
    for (let i = 0; i < key.length; i++) {
      if (i)
        t = hasOwn ? t[k] : t[k] = /* @__PURE__ */ Object.create(null);
      k = key[i];
      if ((hasOwn = Object.hasOwn(t, k)) && (typeof t[k] !== "object" || seen.has(t[k]))) {
        TomlError.x("trying to redefine an already defined value", ctx, errPtr);
      }
      let unsafe = k === "__proto__";
      if (ctx.uk && (unsafe || k === "constructor")) {
        t = ctx.uk !== 1 && TomlError.x("document contains an unsafe property", ctx, errPtr);
        break;
      }
      if (!hasOwn && unsafe) {
        Object.defineProperty(t, k, { enumerable: true, configurable: true, writable: true });
      }
    }
    if (hasOwn) {
      TomlError.x("trying to redefine an already defined value", ctx, errPtr);
    }
    skipVoid(ctx, true, true);
    let value = extractValue(
      ctx,
      125
      /* } */
    );
    if (t && typeof (t[k] = value) === "object")
      seen.add(value);
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p++)) === 125) {
      return res;
    }
    if (c !== 44)
      TomlError.x("expected comma or end of structure", ctx, ctx.p - 1);
  }
  TomlError.x("unfinished table", ctx, startPtr);
}
function parseArray(ctx) {
  let startPtr = ctx.p++;
  let res = [];
  let c;
  while (ctx.p < ctx.s.length) {
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p)) === 93) {
      ctx.p++;
      return res;
    }
    res.push(extractValue(
      ctx,
      93
      /* ] */
    ));
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p++)) === 93) {
      return res;
    }
    if (c !== 44)
      TomlError.x("expected comma or end of structure", ctx, ctx.p - 1);
  }
  TomlError.x("unfinished array", ctx, startPtr);
}

// node_modules/smol-toml/dist/parse.js
function peekTable(ctx, key, table2, meta, type) {
  let t = table2;
  let m = meta;
  let k;
  let hasOwn = false;
  let state;
  for (let i = 0; i < key.length; i++) {
    if (i) {
      t = hasOwn ? t[k] : t[k] = /* @__PURE__ */ Object.create(null);
      m = (state = m[k]).c;
      if (type === 0 && (state.t === 1 || state.t === 2)) {
        return null;
      }
      if (state.t === 2) {
        let l = t.length - 1;
        t = t[l];
        m = m[l].c;
      }
    }
    k = key[i];
    if ((hasOwn = Object.hasOwn(t, k)) && m[k]?.t === 0 && m[k]?.d) {
      return null;
    }
    if (!hasOwn) {
      let unsafe = k === "__proto__";
      if (ctx.uk && (unsafe || k === "constructor"))
        return false;
      if (unsafe) {
        Object.defineProperty(t, k, { enumerable: true, configurable: true, writable: true });
        Object.defineProperty(m, k, { enumerable: true, configurable: true, writable: true });
      }
      m[k] = {
        t: i < key.length - 1 && type === 2 ? 3 : type,
        d: false,
        i: 0,
        c: /* @__PURE__ */ Object.create(null)
      };
    }
  }
  state = m[k];
  if (state.t !== type && !(type === 1 && state.t === 3)) {
    return null;
  }
  if (type === 2) {
    if (!state.d) {
      state.d = true;
      t[k] = [];
    }
    t[k].push(t = /* @__PURE__ */ Object.create(null));
    state.c[state.i++] = state = { t: 1, d: false, i: 0, c: /* @__PURE__ */ Object.create(null) };
  }
  if (state.d) {
    return null;
  }
  state.d = true;
  if (type === 1) {
    t = hasOwn ? t[k] : t[k] = /* @__PURE__ */ Object.create(null);
  } else if (type === 0 && hasOwn) {
    return null;
  }
  return [k, t, state.c];
}
function validateTablePeek(ctx, peek, ptr) {
  if (peek === null || ctx.uk === 2)
    TomlError.x(peek === null ? "trying to redefine an already defined table or value" : "document contains an unsafe property", ctx, ptr);
}
function parse(toml, options = {}) {
  let ctx = {
    s: toml,
    p: 0,
    d: options.maxDepth ?? 1e3,
    bi: options.integersAsBigInt ?? false,
    ld: options.useLegacyDate ?? true,
    uk: options.unsafeKeyBehaviour === "throw" ? 2 : options.unsafeKeyBehaviour === "drop" ? 1 : 0
  };
  let res = /* @__PURE__ */ Object.create(null);
  let meta = /* @__PURE__ */ Object.create(null);
  let tmp;
  let skipping = false;
  let tbl = res;
  let m = meta;
  if (toml.charCodeAt(0) === 65279)
    ctx.p++;
  skipVoid(ctx);
  while (ctx.p < toml.length) {
    if (toml.charCodeAt(ctx.p) === 91) {
      let isTableArray = toml.charCodeAt(++ctx.p) === 91;
      tmp = ctx.p += +isTableArray;
      skipping = false;
      let k = parseKey(
        ctx,
        93
        /* ] */
      );
      if (isTableArray) {
        if (toml.charCodeAt(ctx.p) !== 93) {
          TomlError.x("expected end of table array declaration", ctx);
        }
        ctx.p++;
      }
      let p = peekTable(
        ctx,
        k,
        res,
        meta,
        isTableArray ? 2 : 1
        /* Type.EXPLICIT */
      );
      if (!p) {
        validateTablePeek(ctx, p, tmp);
        skipping = true;
      } else {
        m = p[2];
        tbl = p[1];
      }
    } else {
      tmp = ctx.p;
      let k = parseKey(ctx);
      let p = peekTable(
        ctx,
        k,
        tbl,
        m,
        0
        /* Type.DOTTED */
      );
      if (!p && !skipping)
        validateTablePeek(ctx, p, tmp);
      skipVoid(ctx, true, true);
      let v = extractValue(ctx, void 0);
      if (p && !skipping)
        p[1][p[0]] = v;
    }
    skipVoid(ctx, true);
    if (ctx.p < toml.length && (tmp = toml.charCodeAt(ctx.p)) !== 10 && (tmp !== 13 || toml.charCodeAt(ctx.p + 1) !== 10)) {
      TomlError.x("each key-value declaration must be followed by an end-of-line", ctx);
    }
    skipVoid(ctx);
  }
  return res;
}

// node_modules/smol-toml/dist/stringify.js
var HAS_WELLFORMED = !!"".isWellFormed;

// src/modules.ts
var registry = (modules) => modules;
var MODULES = registry({
  brief: { requires: [] },
  references: { requires: [] },
  storymap: { requires: [] },
  model: { requires: [] },
  sprint: { requires: [] },
  tokens: { requires: [], stack: true },
  catalog: { requires: [], stack: true },
  termbase: { requires: [] },
  lint: { requires: ["tokens"], stack: true },
  visual: { requires: [], runner: "web", stack: true },
  a11y: { requires: ["visual"], runner: "web", stack: true },
  review: { requires: ["model"] },
  critique: { requires: ["review"] },
  feedback: { requires: [] },
  audit: { requires: [] },
  walkthrough: { requires: [] },
  perf: { requires: [], runner: "web", stack: true },
  invariants: { requires: [], runner: "web", stack: true },
  imagery: { requires: [] }
});
var MODULE_IDS = Object.keys(MODULES);
function isModuleId(id) {
  return Object.hasOwn(MODULES, id);
}
function needsStack(id) {
  const spec = MODULES[id];
  return spec.stack === true;
}

// src/web/config.ts
var BUDGETS = {
  lcp_ms: { audit: "largest-contentful-paint", bound: "max", default: 2500, static: 2e3 },
  cls: { audit: "cumulative-layout-shift", bound: "max", default: 0.1, static: 0.05 },
  tbt_ms: { audit: "total-blocking-time", bound: "max", default: 200 },
  performance: { audit: "categories:performance", bound: "min", default: 0.9 },
  accessibility: { audit: "categories:accessibility", bound: "min", default: 1 },
  best_practices: { audit: "categories:best-practices", bound: "min", default: 0.95 },
  seo: { audit: "categories:seo", bound: "min", default: 0.95 },
  total_kib: { audit: "total-byte-weight", bound: "max", default: 1600 },
  script_kib: { audit: "resource-summary:script:size", bound: "max", default: 300 }
};
var BUDGET_KEYS = Object.keys(BUDGETS);

// src/config.ts
var CONFIG_PATH = "docs/design/kit.toml";
var DEFAULT_TERMBASE = "docs/design/termbase.tsv";
var DEFAULT_RETROFIT = "docs/design/retrofit.tsv";
var ConfigError = class extends Error {
};
var UNDECIDED = "undecided";
function flaw(path) {
  if (path === "") return "is empty";
  if (path.includes("\\")) return "uses \\; the kit separates names with /";
  if (path.startsWith("/")) return "is absolute";
  if (path.includes("//")) return "has an empty segment (//)";
  const dot = path.split(/[/{},]/).find((name) => name === "." || name === "..");
  return dot === void 0 ? null : `has a "${dot}" segment`;
}
function canonical(root, path) {
  if (/[{}]/.test(path)) return null;
  const slashed = path.replaceAll("\\", "/");
  const fixed = posix.normalize(slashed.startsWith("/") ? relative(root, slashed) : slashed).replace(/\/$/, "");
  return fixed === "." || fixed === ".." || fixed.startsWith("../") ? null : fixed;
}
function pathProblem(root, path) {
  const why = flaw(path);
  if (why === null) return null;
  const fixed = canonical(root, path);
  return fixed === null ? `${why}. Write it from the project root, with / between names and no ".", ".." or empty segment; the kit reads only files inside the project.` : `${why}. Write it as "${fixed}".`;
}
function refusal(root, path) {
  if (path === ".." || path.startsWith("../") || isAbsolute(path))
    return { problem: "is outside the project", leaf: false };
  const names = path.split("/");
  for (let i = 1; i <= names.length; i++) {
    const at = names.slice(0, i).join("/");
    try {
      if (lstatSync(join(root, at)).isSymbolicLink())
        return at === path ? { problem: "is a symbolic link", leaf: true } : { problem: `passes through the symbolic link "${at}"`, leaf: false };
    } catch {
      return null;
    }
  }
  return null;
}
function readProblem(root, path) {
  return refusal(root, path)?.problem ?? null;
}
var mappingError = (role, path, problem) => new ConfigError(
  `${CONFIG_PATH}: docs.${role} ${JSON.stringify(path)} ${problem}. Map the file where it really is: the kit doesn't follow links, so a change to the link's target would go unchecked.`
);
function projectPaths(root, setting, paths) {
  for (const path of paths) {
    const problem = pathProblem(root, path);
    if (problem !== null)
      throw new ConfigError(`${CONFIG_PATH}: ${setting} ${JSON.stringify(path)} ${problem}`);
  }
  return paths;
}
var mappedPaths = (docs) => Object.entries({ termbase: DEFAULT_TERMBASE, retrofit: DEFAULT_RETROFIT, ...docs });
function refuseLinks(root, docs) {
  for (const [role, path] of mappedPaths(docs)) {
    const problem = readProblem(root, path);
    if (problem !== null) throw mappingError(role, path, problem);
  }
}
var isTable = (v) => typeof v === "object" && v !== null && !Array.isArray(v) && !(v instanceof Date);
var invalid = (path, what) => new ConfigError(`${CONFIG_PATH}: ${path} must be ${what}.`);
function table(v, path) {
  if (v === void 0) return {};
  if (!isTable(v)) throw invalid(path, "a table");
  return { ...v };
}
function strings(v, path) {
  if (v === void 0) return [];
  if (!Array.isArray(v) || !v.every((s) => typeof s === "string"))
    throw invalid(path, "an array of strings");
  return v;
}
var TERMBASE_ID = "id";
function forbidColumns(v) {
  if (v === void 0) return ["forbid"];
  const names = strings(v, "termbase.forbid_columns");
  const problem = names.includes("") ? "has an empty name" : new Set(names).size < names.length ? "names a column twice" : names.includes(TERMBASE_ID) ? `names the ${TERMBASE_ID} column, which holds the term's name, not a pattern` : null;
  if (problem !== null)
    throw new ConfigError(
      `${CONFIG_PATH}: termbase.forbid_columns ${problem}. List the termbase columns whose cells are forbidden wording, e.g. forbid_columns = ["fi_old", "en_old"], or [] when it has none.`
    );
  return names;
}
function stringTable(v, path) {
  const t = table(v, path);
  for (const [k, s] of Object.entries(t))
    if (typeof s !== "string") throw invalid(`${path}.${k}`, "a string");
  return t;
}
function stackOf(v) {
  if (v === void 0) return null;
  if (typeof v !== "string" || v.trim() === "")
    throw invalid(
      "stack",
      `a string: "${UNDECIDED}" before the stack decision, or the stack chosen in it, e.g. stack = "bridgetown"`
    );
  return v;
}
function parseToml(text) {
  try {
    return parse(text);
  } catch (e) {
    const { line, column, message } = e;
    const reason = (message.split("\n")[0] ?? "").replace(/^Invalid TOML document: /, "");
    throw new ConfigError(
      `${CONFIG_PATH}:${line}:${column}: ${reason}. Fix the TOML syntax there.`
    );
  }
}
function findRoot(cwd) {
  let dir = cwd;
  while (!existsSync(join(dir, CONFIG_PATH))) {
    if (existsSync(join(dir, ".git")) || dirname(dir) === dir) return null;
    dir = dirname(dir);
  }
  return dir;
}
function loadConfig(root) {
  const file = join(root, CONFIG_PATH);
  if (!existsSync(file)) return null;
  const cfg = parseConfig(root, readFileSync(file, "utf8"));
  refuseLinks(root, cfg.docs);
  return cfg;
}
function parseConfig(root, text) {
  const raw = parseToml(text);
  const modules = table(raw.modules, "modules");
  const declaredOn = strings(modules.on, "modules.on");
  const sections = Object.fromEntries(MODULE_IDS.map((id) => [id, table(raw[id], id)]));
  strings(sections.model.results, "model.results");
  projectPaths(root, "termbase.globs", strings(sections.termbase.globs, "termbase.globs"));
  forbidColumns(sections.termbase.forbid_columns);
  const source = sections.termbase.source;
  if (source !== void 0) {
    if (typeof source !== "string")
      throw invalid("termbase.source", 'a path, e.g. source = "docs/design/sanasto.tsv"');
    projectPaths(root, "termbase.source", [source]);
  }
  const docs = stringTable(raw.docs, "docs");
  for (const [role, path] of Object.entries(docs)) projectPaths(root, `docs.${role}`, [path]);
  const stack = stackOf(raw.stack);
  const held = (id) => stack === UNDECIDED && needsStack(id);
  return {
    root,
    stack,
    stacks: strings(raw.stacks, "stacks"),
    regions: strings(raw.regions, "regions"),
    uiGlobs: projectPaths(root, "ui_globs", strings(raw.ui_globs, "ui_globs")),
    testGlobs: projectPaths(root, "test_globs", strings(raw.test_globs, "test_globs")),
    ignoreGlobs: projectPaths(root, "ignore_globs", strings(raw.ignore_globs, "ignore_globs")),
    on: new Set(declaredOn.filter(isModuleId).filter((id) => !held(id))),
    off: stringTable(modules.off, "modules.off"),
    docs,
    web: table(raw.web, "web"),
    section: (id) => sections[id],
    declared: { on: declaredOn, keys: Object.keys(raw), moduleKeys: Object.keys(modules) }
  };
}

// src/git.ts
import { join as join2, matchesGlob, posix as posix2 } from "node:path";
var MAX_OUTPUT = 1024 ** 3;
var utf8 = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });
var matchesAny = (file, globs) => globs.some((g) => matchesGlob(file, g));
var isUiFile = (cfg, file) => matchesAny(file, cfg.uiGlobs) && !matchesAny(file, cfg.ignoreGlobs);

// adapters/hook.ts
var TOOLS = /* @__PURE__ */ new Set(["claude", "codex"]);
var DS = join3("tools", "ds", "ds.mjs");
var ADD = "*** Add File: ";
var UPDATE = "*** Update File: ";
var MOVE = "*** Move to: ";
var isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
function parse2(stdin) {
  try {
    const value = JSON.parse(stdin);
    return isObject(value) ? value : null;
  } catch {
    return null;
  }
}
function patched(patch) {
  const lines = patch.split("\n").map((l) => l.endsWith("\r") ? l.slice(0, -1) : l);
  const paths = [];
  for (const [i, line] of lines.entries()) {
    if (line.startsWith(ADD)) paths.push(line.slice(ADD.length));
    else if (line.startsWith(UPDATE)) {
      const next = lines[i + 1] ?? "";
      paths.push(next.startsWith(MOVE) ? next.slice(MOVE.length) : line.slice(UPDATE.length));
    }
  }
  return paths;
}
function editedPaths(payload) {
  const input = isObject(payload.tool_input) ? payload.tool_input : {};
  const paths = [];
  for (const key of ["file_path", "path"]) {
    const value = input[key];
    if (typeof value === "string") paths.push(value);
  }
  const patch = input.command;
  if (typeof patch === "string") paths.push(...patched(patch));
  return paths;
}
function findingsIn(stdout) {
  try {
    const report = JSON.parse(stdout);
    const findings = isObject(report) ? report.findings : void 0;
    return Array.isArray(findings) ? findings : [];
  } catch {
    return [];
  }
}
function ds(root, args, files = []) {
  const argv = [join3(root, DS), ...args, "--json", ...files.length > 0 ? ["--", ...files] : []];
  const res = spawnSync(process.execPath, argv, {
    cwd: root,
    encoding: "utf8"
  });
  if (res.status === 0) return { code: 0, findings: [] };
  const findings = findingsIn(res.stdout);
  return { code: res.status === 1 && findings.length > 0 ? 1 : 2, findings };
}
function errors(findings) {
  return findings.filter((f) => f.severity === "error").map((f) => {
    const at = f.file === void 0 ? "" : `${f.file}${f.line === void 0 ? "" : `:${f.line}`}: `;
    return `${at}error ${f.rule}: ${f.message}`;
  }).join("\n");
}
function postEdit(cfg, cwd, payload, io) {
  const root = cfg.root;
  const files = [
    ...new Set(
      editedPaths(payload).map((p) => relative2(root, resolve(cwd, p))).filter((p) => p !== ".." && !p.startsWith(`..${sep}`) && !isAbsolute2(p))
    )
  ];
  if (files.length === 0) return 0;
  const ui = files.filter((f) => isUiFile(cfg, f));
  const runs = [
    ...ui.length > 0 ? [ds(root, ["run", "lint", "--files"], ui)] : [],
    ds(root, ["terms", "--files"], files)
  ];
  if (runs.some((r) => r.code === 2) || runs.every((r) => r.code === 0)) return 0;
  io.stderr.write(
    `ds found problems in what you just changed:
${errors(runs.flatMap((r) => r.findings))}
`
  );
  return 2;
}
function stop(root, payload, io) {
  if (payload.stop_hook_active === true) return 0;
  const gate = ds(root, ["gate"]);
  const found = errors(gate.findings);
  if (gate.code === 0 || found === "") return 0;
  const why = gate.code === 1 ? "The design gate fails. Fix these" : "The design gate could not run. Fix the kit.toml setting, link or setup named below";
  const reason = `${why}, then run node tools/ds/ds.mjs gate again before you finish:
${found}`;
  io.stdout.write(`${JSON.stringify({ decision: "block", reason })}
`);
  return 0;
}
async function hook(argv, stdin, io) {
  const [event, tool] = argv;
  if (event !== "post-edit" && event !== "stop" || tool === void 0 || !TOOLS.has(tool))
    return 0;
  const payload = parse2(stdin);
  if (payload === null) return 0;
  const cwd = typeof payload.cwd === "string" ? payload.cwd : null;
  if (cwd === null) return 0;
  const root = findRoot(cwd);
  if (root === null || !existsSync2(join3(root, DS))) return 0;
  if (event === "stop") return stop(root, payload, io);
  let cfg;
  try {
    cfg = loadConfig(root);
  } catch {
    cfg = null;
  }
  return cfg === null ? 0 : postEdit(cfg, cwd, payload, io);
}
async function readStdin() {
  let text = "";
  for await (const chunk of process.stdin) text += chunk;
  return text;
}
if (import.meta.main)
  process.exitCode = await hook(process.argv.slice(2), await readStdin(), {
    stdout: process.stdout,
    stderr: process.stderr
  });
export {
  hook
};
/*! Bundled license information:

smol-toml/dist/error.js:
smol-toml/dist/primitive.js:
smol-toml/dist/date.js:
smol-toml/dist/extract.js:
smol-toml/dist/util.js:
smol-toml/dist/struct.js:
smol-toml/dist/parse.js:
smol-toml/dist/stringify.js:
smol-toml/dist/index.js:
  (*!
   * Copyright (c) Squirrel Chat et al., All rights reserved.
   * SPDX-License-Identifier: BSD-3-Clause
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice, this
   *    list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the
   *    documentation and/or other materials provided with the distribution.
   * 3. Neither the name of the copyright holder nor the names of its contributors
   *    may be used to endorse or promote products derived from this software without
   *    specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
   * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
   * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
   * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
   * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
   * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
   * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *)
*/
