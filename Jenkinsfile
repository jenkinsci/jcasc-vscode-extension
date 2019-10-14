pipeline {
    agent { docker { image 'node:10' } }
    stages {
        stage('build') {
            steps {
                 sh '''
                    npm install -g typescript
                    npm install
                    npm run vscode:prepublish
                    '''
            }
        }
        stage('test'){
            steps {
                sh '''
                   npm test
                   '''
            }
        }
    }
}