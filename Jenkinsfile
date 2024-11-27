pipeline {
    agent any

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
          checkout scm
          def dockerfile = 'my-farm/Dockerfile'
          def customImage = docker.build("react-app-jimmy",
                                         "-f ${dockerfile} /my-farm")
        }
    }
}

