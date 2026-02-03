pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Hello') {
            steps {
                echo 'Webhook + Multibranch pipeline is working!'
            }
        }
    }
}

