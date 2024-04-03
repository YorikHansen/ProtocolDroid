# ProtocolDroid

## Introduction

**ProtocolDroid** is a user script, that adds features to the [CodeMirror](https://codemirror.net/) and [Markdown-It](https://markdown-it.github.io/) instances, that are used by [HedgeDoc](https://hedgedoc.org/).

The script is designed for protocol writing of Kiel Universities computer science student organisation. You are welcome to fork and modify the script for your own use case.


## Installation

1. Install a userscript manager like [Violentmonkey](https://violentmonkey.github.io/).
2. Install the script [protocoldroid.user.js](https://github.com/YorikHansen/ProtocolDroid/raw/main/protocoldroid.user.js) by clicking on the link.
3. You may need to edit the script to fit your needs (i.e. change the `@match` directive).
4. Reload the HedgeDoc page.

Please see the [FAQ](FAQ.md) for more information.


## Configuration

*Coming soon*


## Features

### Custom Logo Overlay

The script adds a custom logo overlay to the HedgeDoc editor. The logo is displayed in the top right corner of the editor and can be configured in the script.

#### Options

- `url-no-night`: URL of the logo overlay for the light theme (`https://protocoldroid.yorik.dev/shades-no-night.svg`)
- `url-night`: URL of the logo overlay for the dark theme (`https://protocoldroid.yorik.dev/shades-night.svg`)


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

- `original-comment-button`: Don't overwrite HedgeDocs comment button (`false`)
- `comment-opened-default`: Open comments by default (`false`)
- `hover-opens-comments`: Hovering over comments opens them (`true`)

### MarkdownIt Tweaks

The script adds some tweaks to the MarkdownIt instance, that is used by HedgeDoc.

#### Options

- `german-quotes`: Replace English quotes with German quotes (`true`)

### Drag-n-Drop Email

Allows you to drag and drop a `.eml`-file into the HedgeDoc editor. The script will then insert important information from the email into the protocol.

### Print Style 

The script adds a print style to the HedgeDoc editor. The print style is optimized for printing the protocol.

#### Options

- `save-trees`: Remove unnecessary elements from the print style and make the output as compact as possible (`true`)

### Clean Publishing

Modifies HedgeDocs "Publish" button to show a dialog, that allows you to copy the protocol to the clipboard. The protocol in the dialog is cleaned from unnecessary elements and elements, that would break Kiels student organisations protocol parser.


## Support

If you have any questions or suggestions, feel free to open an issue on the [GitHub repository](https://github.com/YorikHansen/ProtocolDroid/issues).
