pipeline {
    agent  { label 'staging' }
    stages {
        stage('Generate build header'){
            environment {
                GIT_URL_CLEAN = GIT_URL.substring(0, GIT_URL.lastIndexOf('.'))
                BUILD_HEADER_FILE="${WORKSPACE}/themes/BC/layouts/partials/build-header.html"
            }
            steps {
                script {
                    sh """#!/bin/bash
                        # Update hardcoded variables in build header section
                        #
                        # Our special build header uses some hardcoded placement strings that need to be replaced before Bamboo builds and deploys
                        echo "Now updating variables in build header file prior to compilation"
                        
                        echo "Replacing BAMBOO_URL/browse/BAMBOO_JOB_NAME-BAMBOO_BUILD_NUMBER with ${BUILD_URL}"
                        sed -i "s@BAMBOO_URL/browse/BAMBOO_JOB_NAME-BAMBOO_BUILD_NUMBER@${BUILD_URL}@g" ${BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_JOB_NAME with ${JOB_NAME}"
                        sed -i "s@BAMBOO_JOB_NAME@${JOB_NAME}@g" ${BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_BUILD_NUMBER with ${BUILD_NUMBER}"
                        sed -i "s@BAMBOO_BUILD_NUMBER@${BUILD_NUMBER}@g" ${BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_BUILD_TIME with ${BUILD_TIMESTAMP}"
                        sed -i "s@BAMBOO_BUILD_TIME@${BUILD_TIMESTAMP}@g" ${BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_GIT_URL with ${GIT_URL_CLEAN}"
                        sed -i "s@BAMBOO_GIT_URL@${GIT_URL_CLEAN}@g" ${BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_GIT_BRANCH_SHORT with ${GIT_BRANCH}"
                        sed -i "s@BAMBOO_GIT_BRANCH_SHORT@${GIT_BRANCH}@g" ${BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_GIT_COMMIT_SHORT with ${GIT_COMMIT}"
                        sed -i "s@BAMBOO_GIT_COMMIT_SHORT@${GIT_COMMIT}@g" ${BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_GIT_COMMIT with ${GIT_COMMIT}"
                        sed -i "s@BAMBOO_GIT_COMMIT@${GIT_COMMIT}@g" ${BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_URL with ${JENKINS_URL}"
                        sed -i "s@BAMBOO_URL@${JENKINS_URL}@g" ${BUILD_HEADER_FILE}
                        
                        echo "Replacing Bamboo link string with Jenkins"
                        sed -i "s@Bamboo@Jenkins@g" ${BUILD_HEADER_FILE}
                    """
                }
            }
        }
        stage('Build') {
            environment { 
                HUGO_OUTPUT_DIR = "${HUGO_STAGING_OUTPUT_ROOT_DIR}/${GIT_BRANCH}"
                HUGO_BRANCH_BASE_URL = "${HUGO_STAGING_BRANCH_BASE_URL}"
            }
            steps {
                script {
                    // Create output directory for this branch if it doesn't exist
                    echo "Using the build output directory ${HUGO_OUTPUT_DIR}"
                    sh 'mkdir -p ${HUGO_OUTPUT_DIR}'
                    
                    // Start hugo build
                    //
                    // We're using the following flags:
                    //   -s : where to read in files
                    //   -d : where to ouput generated files
                    //   -e : environment name (using "staging")
                    //   -b : base url (using "https://libdev.bc.edu/{branch_name}")
                    echo "Starting Hugo server..."
                    sh "hugo -s ${WORKSPACE} -d ${HUGO_OUTPUT_DIR} -e staging -b ${HUGO_BRANCH_BASE_URL}"
                }
            }
        }
    }
}