pipeline {
    agent { docker { image 'node:6.3' } }
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