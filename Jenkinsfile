pipeline {
    agent any

    stages {
        stage('Cleanup Workspace') {
            steps {
                echo 'Cleaning up previous build artifacts...'
                // This deletes everything in the workspace before the build starts
                cleanWs()
            }
        }

        stage('Checkout SCM') {
            steps {
                echo 'Pulling code from Git...'
                // This triggers the automatic checkout of the repo configured in the job
                checkout scm
            }
        }

        stage('Verify Files') {
            steps {
                echo 'Checking files in the workspace:'
                sh 'ls -ltr'
            }
        }
        
        // You can add Build or Test stages here later
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Build successful!'
        }
        failure {
            echo 'Build failed. Check the logs.'
        }
    }
}
