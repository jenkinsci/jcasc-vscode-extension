# JCasC-VSCode-Plugin 


[![Total alerts](https://img.shields.io/lgtm/alerts/g/sladyn98/JCasC-VSCode-Plugin.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sladyn98/JCasC-VSCode-Plugin/alerts/)
[![Build Status](https://dev.azure.com/jcasc-vscode-extension/jcasc-vscode-extension/_apis/build/status/jenkinsci.jcasc-vscode-extension?branchName=master)](https://dev.azure.com/jcasc-vscode-extension/jcasc-vscode-extension/_build/latest?definitionId=1&branchName=master)


This plugin deals with the authentication and fetching of the JSON schema from a live Jenkins instance.
It provides the base for validation of yaml files written to configure a Jenkins instance.

## How to use

1) Download and install the plugin from the VSCode Marketplace.
2) Inside the Settings tab of VSCode find JCasc which will display two input blocks:
    a) URL fileld for the Jenkins instance that you want to to extract the YAML Schema from.
    b) User Token Field for if the Jenkins instance is protected.
3) Once this is set you can use `Ctrl + Shift + P` to activate the extension.
4) This will download the schema with the filename `jcasc-schema.json` to the current working directory.
5) This schema file can then be used to autosuggest and validate the yaml file written for JCasC.

## How to Run Locally

1) Clone the repository.

2) Run `npm install` in the working directory.

3) Hit `F5` to run the plugin in the development Host.
