# wpt-cli

A command line interface to <a href="https://wpt.fyi/">WPT.fyi</a>. `wpt-cli` is a command line tool to query the public wpt.fyi (Web Platform Test) datasets and APIs. More information about the wpt.fyi and its public data-sets / APIs can be found at https://github.com/web-platform-tests/wpt.fyi.

wpt-cli is written as a command line tool modeling after the [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy), to provide an alternative and advanced interface to this data. wpt-cli intends to make querying and analyzing these large datasets in a way that’s more friendly to typical command line usage — i.e., piping out into other unix utilities, or diffing them, etc. It maintains a local file system cache (`.cache` folder) to avoid repeated downloads of the same raw results and speed up processing.

# Installation

```shell
npm i -g wpt-cli
```

# Usage

```shell
wpt-cli help
```

# Examples

1. Find the latest runs of Chrome Experimental and Chrome for Android:

```shell
wpt-cli runs --product "chrome[experimental]" --product chrome_android
```

2. Find all BiDi tests failing in latest Chrome for Android run dataset due to
   `UnknownErrorException` along with their failure reason:

```shell
wpt-cli results \
   https://storage.googleapis.com/wptd-results/c5d4ba83796ad90ea175682d9e4477656fc5ddb5/chrome_android-137.0.7129.0-android-15-544cb26617/report.json \
 | grep "/webdriver/tests/bidi" | grep FAIL | grep UnknownErrorException
```

3. Find all test files that have sub-tests failing due to `Browser.getWindowForTarget` API missing, in Chrome for Android build 137.0.7107.0:

```shell
wpt-cli results https://storage.googleapis.com/wptd-results/f3575f211b2594c3ef81f14f17915cb5559e267b/chrome_android-137.0.7107.0-android-9-2ab9b584d7/report.json \
  | grep --text -i "Browser.getWindowForTarget" | sed 's/:.*//' | uniq
```

4. Diff two subsequent runs to find what happened to `beforeunload_prompt` tests:

```shell
# First run
wpt-cli results https://storage.googleapis.com/wptd-results/f3575f211b2594c3ef81f14f17915cb5559e267b/chrome_android-137.0.7107.0-android-9-2ab9b584d7/report.json \
  | grep --text -i /webdriver/tests/interop/beforeunload_prompt.py | sort > before.txt

# Second run
wpt-cli results https://storage.googleapis.com/wptd-results/4bd7f218428e84c0f66559477dbe4a8a3db74817/chrome_android-137.0.7108.0-android-9-7136ff1e89/report.json \
  | grep --text -i /webdriver/tests/interop/beforeunload_prompt.py | sort > after.txt

diff before.txt after.txt
```
