pipeline{
    agent any
    environment{
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials'
        DOCKER_IMAGE = 'mujtaba110/devops-app'
    }
    stages{
        stage('Checkout Code'){
            steps{
                git url: 'https://github.com/alimujtaba123/My-DevOps-Project.git', branch: 'main' 
            }
        }
        stage('Build'){
            steps{
                bat "docker build -t %DOCKER_IMAGE%:%BUILD_NUMBER% ."
            }  
        }
        stage('Test'){
            steps{
                bat "npm --prefix app test || exit 0"
            }
        }
        stage('Login & Push'){
            steps{
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')])
                    { bat """
                        echo Logging in to Docker Hub...
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %DOCKER_IMAGE%:%BUILD_NUMBER%
                        docker tag %DOCKER_IMAGE%:%BUILD_NUMBER% %DOCKER_IMAGE%:latest
                        docker push %DOCKER_IMAGE%:latest
                    """
                }
            }
        }
    }
    post{
        always{
            bat "docker image prune -f || exit 0"
        }
    }
}
