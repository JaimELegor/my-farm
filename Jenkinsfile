pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker_creds')
      }
    stages {
        stage('Setup') {
            steps {
                dir ('my-farm') {
                    deleteDir()
                  }
              }
        }
        stage('Clone repo') {
            steps {
              script {
                  sh "git clone https://github.com/JaimELegor/my-farm.git"
                  sh "cd my-farm"
                }
            }
        }
        stage('Build image') {
          steps {
              script {
                  sh "docker build -t vite-react-app:v5 . --network=host"
                  sh "docker tag vite-react-app:v5 jaimelegor/vite-react-app:v5"
                }
            }
        }
        stage('Login') {
          steps {
              script {
                  sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                }
            }
        }
        stage('Push') {
          steps {
            script {
                sh "docker push jaimelegor/vite-react-app:v5"
              }
            }
        }
        post {
            always {
                script {
                    sh "docker logout"
                  }
              }
          }
    }
}

