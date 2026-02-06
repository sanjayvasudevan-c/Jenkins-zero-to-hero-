pipeline {
    
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    environment {
        // This matches the 'Name' you gave in your screenshot
        SONAR_NAME = 'SonarQube'
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
        
	stage('sonarqube'){
	    steps {
		
	    }
	}

	stage('SonarQube Analysis') {
            steps {
                // This block connects the 'Name' from your screenshot to this stage
                withSonarQubeEnv("${SONAR_NAME}") {
                    sh 'npx sonar-scanner \
                        -Dsonar.projectKey=my-node-app \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://host.docker.internal:9000'
                }
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

