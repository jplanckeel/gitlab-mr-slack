# gitlab-mr-slack

Chrome plugin to copy in clipboard MR review message for slack.

Compatbile with chrome, chromium like and firefox,

## How to use 

On merge request page, click on buton "Copy" for message to clipboard

![example](/images/example.png?raw=true)

The message is formated 

```
:please_review: `folder/project` title of merger request [MR123](https://merge-request-url.example)
```


## Slack 

By default slack don't format markdown text, you have to solution to format markdown on slack. 

- Active `Format messages with markup` in preference/advanced

- Use shortcut to apply markdown format : `Maj + CMD + F`
