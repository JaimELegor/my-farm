pipeline {
    agent any
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
                  sh "docker build -t vite-react-app:latest . --network=host"
                }
            }
        }
    }
}

