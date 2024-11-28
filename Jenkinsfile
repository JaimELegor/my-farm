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
        stage('Install node dependencies') {
            steps {
                sh 'npm install'
              }
          }
        stage('Build image') {
          steps {
              script {
                  def customImage = docker.build("react-app-jimmy:v1",".")
                }
            }
        }
    }
}

