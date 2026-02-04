pipeline {
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

	stage('Lint code'){
	    steps {
		sh 'npm run lint'
	    }
	}
         
        stage('prettier-format:check') {
	    steps {
		sh 'npm run format:check'	
            }	
	}

        stage('Run App Smoke Test') {
            steps {
                sh '''
                node app.js &
                sleep 5
                wget -qO- http://localhost:5000 || exit 1
                pkill node
                '''
            }
        }
    }
}

