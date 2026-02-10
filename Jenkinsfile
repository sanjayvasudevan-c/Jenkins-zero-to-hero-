pipeline {

    agent any   // ✅ controller agent (email works)

    environment {
        SONAR_NAME = 'SonarQube'
    }

    stages {

        stage('Build & Test in Docker') {
            agent {
                docker {
                    image 'node:18'
                    args '--add-host=host.docker.internal:host-gateway'
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

                stage('Lint code') {
                    steps {
                        sh 'npm run lint'
                    }
                }

                stage('prettier-format:check') {
                    steps {
                        sh 'npm run format:check'
                    }
                }

                stage('SonarQube Analysis') {
                    steps {
                        withSonarQubeEnv('SonarQube') {
                            sh '''
                            npx sonarqube-scanner \
                              -Dsonar.projectKey=my-node-app \
                              -Dsonar.sources=. \
                              -Dsonar.host.url=http://host.docker.internal:9000 \
                              -Dsonar.exclusions=**/node_modules/** \
                              -Dsonar.verbose=true
                            '''
                        }
                    }
                }

                stage('Quality Gate') {
                    steps {
                        timeout(time: 5, unit: 'MINUTES') {
                            waitForQualityGate abortPipeline: true
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
    }

    post {
    failure {
        node('built-in') {   // 👈 force Jenkins controller
            emailext(
                to: 'sankir25092007@gmail.com',
                subject: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <b>Build Failed</b><br>
                Job: ${env.JOB_NAME}<br>
                Build Number: ${env.BUILD_NUMBER}<br>
                Result: ${currentBuild.currentResult}<br>
                URL: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a>
                """,
                attachLog: true
            )
        }
    }
}

}
