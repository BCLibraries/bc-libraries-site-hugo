pipeline {
    agent  { label 'libdev' }
    
    environment { 
        HUGO_WORKSPACE = "${WORKSPACE}/build"
        HUGO_BRANCH_BASE_URL = "${HUGO_STAGING_BRANCH_BASE_URL}"
    }

    stages {
        stage("TEST: Display env vars"){
            steps{
                echo "These are default env vars"
                echo "=========================="
                echo "WORKSPACE          = ${WORKSPACE}"
                echo "BUILD_ID           = ${BUILD_ID}"
                echo "BUILD_NUMBER       = ${BUILD_NUMBER}"
                echo "BUILD_TAG          = ${BUILD_TAG}"
                echo "BUILD_URL          = ${BUILD_URL}"
                echo "JENKINS_URL        = ${JENKINS_URL}"
                echo "JOB_NAME           = ${JOB_NAME}"
                echo "JOB_DISPLAY_URL    = ${JOB_DISPLAY_URL}"
                echo "RUN_DISPLAY_URL    = ${RUN_DISPLAY_URL}"
                echo "BUILD_DISPLAY_NAME = ${BUILD_DISPLAY_NAME}"
                echo "JOB_BASE_NAME      = ${JOB_BASE_NAME}"
                echo "BUILD_URL          = ${BUILD_URL}"
                echo "JOB_URL            = ${JOB_URL}"
                echo "=========================="
                echo ""
                echo "These are custom env vars"
                echo "=========================="
                echo "HUGO_WORKSPACE       = ${HUGO_WORKSPACE}"
                echo "HUGO_BRANCH_BASE_URL = ${HUGO_BRANCH_BASE_URL}"
                echo "=========================="
                echo ""
                echo "These are additional GIT env vars"
                echo "=========================="
                echo "GIT_COMMIT = ${GIT_COMMIT}"
                echo "GIT_BRANCH = ${GIT_BRANCH}"
                echo "GIT_URL    = ${GIT_URL}"
                echo "=========================="
                
            }
        }
        stage('Generate env vars'){
            steps {
                script {
                    // Jenkins gives us these git env vars
                    //   GIT_COMMIT
                    //   GIT_BRANCH
                    //   GIT_URL
                    //
                    // We need to generate:
                    //   env.GIT_URL_CLEAN
                    //   env.BUILD_DATE
                    
                    def generate_clean_url = sh(returnStdout: true, script: """
                        #!/bin/bash
                        set -e
                        set +x
                        
                        # Create a shortened version of GIT_URL for use in the build header
                        # We want everything before ".git"
                        VAR_NAME=`echo ${GIT_URL%\.git}`
                        echo \$VAR_NAME
                    """)
                    env.GIT_URL_CLEAN = generate_clean_url.trim()
                    echo "env.GIT_URL_CLEAN is ${env.GIT_URL_CLEAN}"

                    def generate_build_date_iso = sh(returnStdout: true, script: """
                        #!/bin/bash
                        set -e
                        set +x
                        
                        # Get current date
                        VAR_NAME=`date +"%Y-%m-%dT%H:%M:%S%z"`
                        echo \$VAR_NAME
                    """)
                    env.BUILD_DATE = generate_build_date_iso.trim()
                    echo "env.BUILD_DATE is ${env.BUILD_DATE}"
                }
            }
        }
        stage('Generate build header'){
            steps {
                script {
                    env.BUILD_HEADER_FILE="${WORKSPACE}/build/themes/BC/layouts/partials/build-header.html"
                    echo "env.BUILD_HEADER_FILE is ${env.BUILD_HEADER_FILE}"
                    
                    sh """#!/bin/bash
                        # Update hardcoded variables in build header section
                        #
                        # Our special build header uses some hardcoded placement strings that need to be replaced before Bamboo builds and deploys
                        echo "Now updating variables in build header file prior to compilation"
                        
                        echo "Replacing BAMBOO_URL/browse/BAMBOO_JOB_NAME-BAMBOO_BUILD_NUMBER with ${BUILD_URL}"
                        sed -i "s@BAMBOO_URL/browse/BAMBOO_JOB_NAME-BAMBOO_BUILD_NUMBER@${BUILD_URL}@g" ${env.BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_JOB_NAME with ${JOB_NAME}"
                        sed -i "s@BAMBOO_JOB_NAME@${JOB_NAME}@g" ${env.BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_BUILD_NUMBER with ${BUILD_NUMBER}"
                        sed -i "s@BAMBOO_BUILD_NUMBER@${BUILD_NUMBER}@g" ${env.BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_BUILD_TIME with ${env.BUILD_DATE}"
                        sed -i "s@BAMBOO_BUILD_TIME@${env.BUILD_DATE}@g" ${env.BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_GIT_URL with ${GIT_URL_CLEAN}"
                        sed -i "s@BAMBOO_GIT_URL@${GIT_URL_CLEAN}@g" ${env.BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_GIT_BRANCH_SHORT with ${GIT_BRANCH}"
                        sed -i "s@BAMBOO_GIT_BRANCH_SHORT@${GIT_BRANCH}@g" ${env.BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_GIT_COMMIT_SHORT with ${GIT_COMMIT}"
                        sed -i "s@BAMBOO_GIT_COMMIT_SHORT@${GIT_COMMIT}@g" ${env.BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_GIT_COMMIT with ${GIT_COMMIT}"
                        sed -i "s@BAMBOO_GIT_COMMIT@${GIT_COMMIT}@g" ${env.BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_URL with ${JENKINS_URL}"
                        sed -i "s@BAMBOO_URL@${JENKINS_URL}@g" ${env.BUILD_HEADER_FILE}
                        
                        echo "Replacing Bamboo link string with Jenkins"
                        sed -i "s@Bamboo@Jenkins@g" ${env.BUILD_HEADER_FILE}
                    """
                }
            }
        }
        stage('Build') {
            environment { 
                HUGO_OUTPUT_DIR = "${HUGO_OUTPUT_ROOT_DIR}/${GIT_BRANCH}"
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
                    sh "hugo -s ${HUGO_WORKSPACE} -d ${HUGO_OUTPUT_DIR} -e staging -b ${HUGO_BRANCH_BASE_URL}"
                }
            }
        }
    }
}