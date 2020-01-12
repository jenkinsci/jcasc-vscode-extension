// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import fetch, { RequestInit } from 'node-fetch'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { createWriteStream } from 'fs'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "jcasc-plugin" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.jcasc', async () => {
    const streamPipeline = promisify(pipeline)
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Welcome to the jcasc-plugin')
    const schemaURL = vscode.workspace.getConfiguration().get('jcasc.schemaURL')
    const userName = vscode.workspace.getConfiguration().get('jcasc.userName')
    const userToken = vscode.workspace.getConfiguration().get('jcasc.userToken')

    // Fetches the JSON Schema via a REST API Call
    const auth = Buffer.from(`${userName}:${userToken}`).toString('base64')
    const options: RequestInit = {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
    await fetch(schemaURL, options)
      .then(res => {
        if (!res.ok) throw new Error(`unexpected response ${res.statusText}`)
        return streamPipeline(res.body, createWriteStream('jcasc-schema.json'))
      })
      .catch((err: any) => {
        console.log('ERROR: ' + err)
      })
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
