pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Tests') {
            steps {
                npm run test
            }
        }
        
        stage('Construcción de Docker') {
            steps {
                script {
                    docker.build("kanocudi:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Deploy to Nexus') {
            steps {
                script {
                    docker.withRegistry('http://192.168.31.75:95', 'tu-nexus-credenciales') {
                        docker.image("kanocudi:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
        
        stage('Notify results') {
            steps {
                script {
                    def comment = "Successfully created enviromnet!"
                    // Puedes generar la URL de acceso a tu entorno de pruebas aquí
                    // Ejemplo: def testUrl = "http://tudominio.com/pr-${env.BUILD_NUMBER}"
                    // Añadir el comentario a la Pull Request
                    // Puedes utilizar un script de Gitea API para hacer esto
                }
            }
        }
    }
}
