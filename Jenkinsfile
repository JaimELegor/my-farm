pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
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
                  def dockerfile = 'my-farm/Dockerfile'
                  def customImage = docker.build("react-app-jimmy","-f ${dockerfile} /my-farm")
                }
            }
        }
    }
}

