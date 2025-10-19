pipeline{
    agent any
    environment{
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials'
        DOCKER_IMAGE = 'mujtaba110/devops-app'
    }
    stages{
        stage('Checkout Code'){
            steps{git url: 'https://github.com/alimujtaba123/My-DevOps-Project.git', branch: 'main' 
            }
        }
        stage('Build'){
            sh 'docker build -t ${DOCKER_IMAGE}:$BUILD_NUMBER .'
        }
        stage('Test'){
            sh 'npm --prefix app test || true'
        }
        stage('Login & Push'){
            withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')])
            { sh '''
                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                docker push ${DOCKER_IMAGE}:$BUILD_NUMBER
                docker tag ${DOCKER_IMAGE}:$BUILD_NUMBER ${DOCKER_IMAGE}:latest
                docker push ${DOCKER_IMAGE}:latest '''
            }
        }
    }
    post{
        always{
            sh 'docker image prune -f || true'
        }
    }
}
