FROM jenkins/jenkins:lts
USER root

# Install Docker CLI so Jenkins can build images later
RUN apt-get update && apt-get install -y docker.io

# Pre-install the core plugins so the UI wizard doesn't fail
RUN jenkins-plugin-cli --plugins "git workflow-aggregator docker-workflow pipeline-stage-view"
