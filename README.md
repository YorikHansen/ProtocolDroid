# ProtocolDroid

## Introduction

**ProtocolDroid** is a user script, that adds features to the [CodeMirror](https://codemirror.net/) and [Markdown-It](https://markdown-it.github.io/) instances, that are used by [HedgeDoc](https://hedgedoc.org/).

The script is designed for protocol writing of Kiel Universities computer science student organisation. You are welcome to fork and modify the script for your own use case.


## Installation

1. Install a userscript manager like [Violentmonkey](https://violentmonkey.github.io/).
2. Install the script [`dist/protocoldroid.user.js`](https://github.com/YorikHansen/ProtocolDroid/raw/main/dist/protocoldroid.user.js) by clicking on the link *(not `protocoldroid.user.js` in the root directory)*.
3. You may need to edit the script to fit your needs (i.e. change the `@match` directive).
4. Reload the HedgeDoc page.

Please see the [FAQ](FAQ.md) for more information.


## Configuration

*This is WIP*

You can enable or disable every feature of the script in the settings menu. Access the settings menu by clicking on the gears in the top right corner of the website.

Some features have additional options, that can be configured in the settings menu.

Note, that the settings are stored in the browser and are not synced between devices.


## Features

### CodeMirror Tweaks

The script adds some tweaks to the CodeMirror instance, that is used by HedgeDoc.

#### Options

- `custom-font`: What font should be used in the editor (defaults: `"JetBrains Mono", "Fira Code", "Hack", "Menlo", "Monaco", "Source Code Pro", "Courier New", "Consolas", monospace`)

### Custom Logo Overlay

The script adds a custom logo overlay to the HedgeDoc editor. The logo is displayed in the top right corner of the editor and can be configured in the script.

#### Options

- `url-no-night`: URL of the logo overlay for the light theme (defaults: `https://protocoldroid.yorik.dev/shades-no-night.svg`)
- `url-night`: URL of the logo overlay for the dark theme (defaults: `https://protocoldroid.yorik.dev/shades-night.svg`)


### TODO Notes

The script adds a button to the HedgeDoc editor, that inserts a TODO note at the current cursor position. TODO notes are displayed in a different color and can be used to mark tasks in the protocol.

#### Example

```markdown
<!-- TODO: Download ProtocolDroid -->
```


### Visible Comments

The script adds a button to the HedgeDoc editor, that allows you to write comments, that are visible in the protocol. Comments are displayed as a light gray speech bubble and are unfolded when hovering over them or clicking them. Every comment has an author, that is displayed in the comment.

#### Example

```markdown
<!-- No Comment ~The Author -->
```

#### Options

- `original-comment-button`: Don't overwrite HedgeDocs comment button (defaults: `false`)
- `comment-opened-default`: Open comments by default (defaults: `false`)
- `hover-opens-comments`: Hovering over comments opens them (defaults: `true`)

### MarkdownIt Tweaks

The script adds some tweaks to the MarkdownIt instance, that is used by HedgeDoc.

#### Options

- `german-quotes`: Replace English quotes with German quotes (defaults: `true`)

### Drag-n-Drop Email

Allows you to drag and drop a `.eml`-file into the HedgeDoc editor. The script will then insert important information from the email into the protocol.

### Print Style 

The script adds a print style to the HedgeDoc editor. The print style is optimized for printing the protocol.

#### Options

- `save-trees`: Remove unnecessary elements from the print style and make the output as compact as possible (defaults: `true`)

### Clean Publishing

Modifies HedgeDocs "Publish" button to show a dialog, that allows you to copy the protocol to the clipboard. The protocol in the dialog is cleaned from unnecessary elements and elements, that would break Kiels student organisations protocol parser.


## Support

If you have any questions or suggestions, feel free to open an issue on the [GitHub repository](https://github.com/YorikHansen/ProtocolDroid/issues).
