// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { runInThisContext } from 'vm';
import { getLatestInsidersMetadata } from 'vscode-test/out/util';


const rp = require("request-promise");
var fs = require("fs");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jcasc-plugin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.jcasc', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Welcome to the jcasc-plugin');
		const schemaURL = vscode.workspace.getConfiguration().get('jcasc.schemaURL');
		//Fetches the JSON Schema via a REST API Call
		rp(schemaURL).then((result:any) => {
			console.log("Result: " + result);
			var fileContent = result;
			fs.writeFile("jsonSchema.json", fileContent, (err:any) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log("File has been created");
			});

		}).catch((err:any) => {
			console.log("ERROR: " + err);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
