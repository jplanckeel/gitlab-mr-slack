# gitlab-mr-slack

Chrome plugin to copy in clipboard MR review message for slack.

Compatbile with chrome, chromium like and firefox,

## How to use 

On merge request page, click on buton "Review" for message to clipboard

![example](/images/example.png?raw=true)

Review message is formated 

```
:please_review: `folder/project` title of merger request [MR123](https://merge-request-url.example)
```
Merged message is formated 

```
:merged: `folder/project` title of merger request [MR123](https://merge-request-url.example)
```

## Slack 

By default slack don't format markdown text, you have to solution to format markdown on slack. 

- Active `Format messages with markup` in preference/advanced

- Use shortcut to apply markdown format : `Maj + CMD + F`


## Build for firefox

Requierments:
NodeJs v20.10.0 < 21
Web-ext >7.5.0

```
nvm install 20
nvm use node 20
npm install web-ext
web-ext sign --api-key <APIKEY> --api-secret <SECRETKEY>
web-ext build
```
