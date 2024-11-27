pipeline {
    agent any

    stages {
        stage('Clone repo') {
            steps {
                rm my-farm
                git clone https://github.com/JaimELegor/my-farm.git
                cd my-farm
            }
        }
    }
}

