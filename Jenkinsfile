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
        stage('Clone') {
            steps {
                // cleans workspace
                //cleanWs()
                
                // Create build directory if it doesn't exist
                echo "Using the build directory ${HUGO_WORKSPACE}"
                sh 'mkdir -p build'
                
                // Clones the repository from the current branch name
                dir('build') {
                    script {
                        Map scmVars = checkout([$class: 'GitSCM', branches: [[name: '*/*']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/BCLibraries/bc-libraries-site-hugo']]])
                        echo "scmVars = ${scmVars}"
                        env.GIT_BRANCH = scmVars.GIT_BRANCH
                        env.GIT_COMMIT = scmVars.GIT_COMMIT
                        env.GIT_URL    = scmVars.GIT_URL
                    }
                }
                sh 'env | grep GIT_'
            }
        }
        stage('Generate env vars'){
            steps {
                script {
                    // Jenkins gives us these git env vars
                    //   env.GIT_BRANCH
                    //   env.GIT_COMMIT
                    //   env.GIT_URL
                    //
                    // We need to generate:
                    //   env.GIT_SHORT_COMMIT
                    //   env.GIT_SHORT_BRANCH
                    //   env.BUILD_DATE
                    
                    def generate_git_short_commit = sh(returnStdout: true, script: """
                        #!/bin/bash
                        set -e
                        set +x
                        
                        # Create a shortened version of GIT_COMMIT for use in the build header
                        # We want the first 8 chars
                        VAR_NAME=`echo ${env.GIT_COMMIT} | cut -c1-8`
                        echo \$VAR_NAME
                    """)
                    env.GIT_SHORT_COMMIT = generate_git_short_commit.trim()
                    echo "env.GIT_SHORT_COMMIT is ${env.GIT_SHORT_COMMIT}"
                    
                    def generate_short_branch = sh(returnStdout: true, script: """
                        #!/bin/bash
                        set -e
                        set +x
                        
                        # Create a shortened version of GIT_BRANCH for use in the build header
                        # We want everything after "origin/"
                        VAR_NAME=`echo ${env.GIT_BRANCH} | cut -d'/' -f 2`
                        echo \$VAR_NAME
                    """)
                    env.GIT_SHORT_BRANCH = generate_short_branch.trim()
                    echo "env.GIT_SHORT_BRANCH is ${env.GIT_SHORT_BRANCH}"
                    
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
                        
                        echo "Replacing BAMBOO_GIT_URL with ${env.GIT_URL}"
                        sed -i "s@BAMBOO_GIT_URL@${env.GIT_URL}@g" ${env.BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_GIT_BRANCH_SHORT with ${env.GIT_SHORT_BRANCH}"
                        sed -i "s@BAMBOO_GIT_BRANCH_SHORT@${env.GIT_SHORT_BRANCH}@g" ${env.BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_GIT_COMMIT_SHORT with ${env.GIT_SHORT_COMMIT}"
                        sed -i "s@BAMBOO_GIT_COMMIT_SHORT@${env.GIT_SHORT_COMMIT}@g" ${env.BUILD_HEADER_FILE}
                         
                        echo "Replacing BAMBOO_GIT_COMMIT with ${env.GIT_COMMIT}"
                        sed -i "s@BAMBOO_GIT_COMMIT@${env.GIT_COMMIT}@g" ${env.BUILD_HEADER_FILE}
                        
                        echo "Replacing BAMBOO_URL with ${JENKINS_URL}"
                        sed -i "s@BAMBOO_URL@${JENKINS_URL}@g" ${env.BUILD_HEADER_FILE}
                        
                        echo "Replacing Bamboo link string  with Jenkins"
                        sed -i "s@Bamboo@Jenkins@g" ${env.BUILD_HEADER_FILE}
                    """
                }
            }
        }
        stage('Build') {
            environment { 
                HUGO_OUTPUT_DIR = "${HUGO_OUTPUT_ROOT_DIR}/${env.GIT_SHORT_BRANCH}"
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