# Question
What is the difference between deploying an application on hosts vs containers? What is actually container orchestration?

# Answer
Deployment to container can be done as a part of development pipeline and don't have to be done on target environment - the deployment to target environment can be done later.
When application is deployed on host it is the final step in the whole process.

Basiclly I would call a container orchestration as a task of making sure that container is running. This is done by an application which can monitor nodes and choose a host which will satisfy container need for resources. Also restart the container or run it on some other node when one gets down. It can usually control more then one instance of a container.