// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import fetch, { RequestInit, FetchError } from 'node-fetch'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { HTTPError } from './httpError'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const outputChannel = vscode.window.createOutputChannel('JCasC')
  outputChannel.appendLine('Welcome to the JCasC Plugin')
  outputChannel.show(true)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.jcasc', async () => {
    const folder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    if (!folder) {
      return
    }

    const streamPipeline = promisify(pipeline)
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    const jenkinsURL = vscode.workspace.getConfiguration().get('jcasc.jenkinsURL', '')
    const userName = vscode.workspace.getConfiguration().get('jcasc.userName', '')
    const userToken = vscode.workspace.getConfiguration().get('jcasc.userToken', '')
    const messages = []

    if (!jenkinsURL) {
      messages.push('Kindly provide a jenkinsURL')
    }
    if (!userName) {
      messages.push('Kindly provide a userName')
    }
    if (!userToken) {
      messages.push('Kindly provide a userToken')
    }

    if (jenkinsURL && userName && userToken) {
      // Fetches the JSON Schema via a REST API Call
      const auth = Buffer.from(`${userName}:${userToken}`).toString('base64')
      const options: RequestInit = {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }

      await fetch(jenkinsURL, options)
        .then(res => {
          if (!res.ok) {
            throw new HTTPError(res)
          }
          return streamPipeline(res.body, createWriteStream(join(folder, 'jcasc-schema.json')))
        })
        .catch((err: Error) => {
          if (err instanceof HTTPError) {
            if (err.status === 401) {
              messages.push('Provide a valid password/token')
            }
            if (err.status === 404) {
              messages.push(`No schema found at ${jenkinsURL}`)
            }
          } else if (err instanceof FetchError) {
            messages.push(`Failed to connect to ${jenkinsURL}`)
            if (err.code === 'ECONNREFUSED') {
              messages.push(
                `Connection refused.\n  1) Check the URL\n  2) Ensure firewall is configured correctly.`
              )
            }
            if (err.code === 'ENOTFOUND') {
              messages.push(`Hostname not found.\n  1) Check the URL\n  2) Check the connection.`)
            }
          } else {
            messages.push(err.message)
          }
        })
    }
    if (messages.length) {
      vscode.window.showWarningMessage(messages[0])
      outputChannel.appendLine(messages.join('\n'))
    }
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
