# Frequently Asked Questions (FAQ)

## Isn't an userscript manager dangerous?

No, userscript managers themselves are not dangerous. They are browser extensions that allow you to run custom scripts on websites. The scripts themselves can be dangerous, but you should only install scripts from sources you trust. If you have any doubts, you can always check the source code of the script.
You may want to add important (banking) websites to the [blacklist](https://violentmonkey.github.io/posts/smart-rules-for-blacklist/) of your userscript manager or use a whitelist.


## Does ProtocolDroid work on mobile devices?

As long as your mobile browser supports userscript managers, ProtocolDroid should work. ProtocolDroid is primarily designed for desktop browsers, but developed with mobile browsers in mind (and tested on Firefox for Android).


## How would *feature X* be even remotely useful?

ProtocolDroid is designed for protocol writing of Kiel Universities computer science student organisation. Therefore, some features might be very specific to this and only this use case.


## How do I use the script withouth a userscript manager?

ProtocolDroid uses APIs, that are not available in a normal browser environment. You can inject the following workarounds before the script to keep the script working:

### Workaround for `GM_addStyle`

```js
this.GM_addStyle ??= style => {
    const styleEl = document.createElement('style');
    styleEl.textContent = style;
    document.head.append(styleEl);
};
```

### Workaround for `unsafeWindow`

```js
this.unsafeWindow ??= window;
```
