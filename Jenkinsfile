pipeline {
    agent any

    stages {
        stage('Clone repo') {
            steps {
              script {
                  sh "rm my-farm"
                  sh "git clone https://github.com/JaimELegor/my-farm.git"
                  sh "cd my-farm"
                }
            }
        }
    }
}

