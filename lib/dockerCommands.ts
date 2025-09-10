export interface DockerCommand {
  id: string
  command: string
  description: string
  example: string
  category: string
  tags: string[]
  isPopular?: boolean
  syntax?: string
  flags?: Array<{
    flag: string
    description: string
  }>
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
  description: string
}

export const dockerCommands: DockerCommand[] = [
  // Basic Docker Commands
  {
    id: 'docker-run',
    command: 'docker run',
    description: 'Create and start a new container from an image',
    example: 'docker run -d -p 8080:80 --name my-nginx nginx',
    category: 'basic',
    tags: ['container', 'start', 'create', 'run'],
    isPopular: true,
    syntax: 'docker run [OPTIONS] IMAGE [COMMAND] [ARG...]',
    flags: [
      { flag: '-d', description: 'Run container in detached mode (background)' },
      { flag: '-it', description: 'Run interactively with terminal' },
      { flag: '-p', description: 'Map ports host:container' },
      { flag: '--name', description: 'Assign a name to container' },
      { flag: '-v', description: 'Mount volume host:container' },
      { flag: '--rm', description: 'Remove container after exit' }
    ]
  },
  {
    id: 'docker-ps',
    command: 'docker ps',
    description: 'List running containers',
    example: 'docker ps -a',
    category: 'basic',
    tags: ['list', 'containers', 'status'],
    isPopular: true,
    syntax: 'docker ps [OPTIONS]',
    flags: [
      { flag: '-a', description: 'Show all containers (running + stopped)' },
      { flag: '-q', description: 'Only show container IDs' },
      { flag: '--format', description: 'Format output using template' }
    ]
  },
  {
    id: 'docker-stop',
    command: 'docker stop',
    description: 'Stop one or more running containers',
    example: 'docker stop my-container',
    category: 'basic',
    tags: ['stop', 'container', 'halt'],
    isPopular: true,
    syntax: 'docker stop [OPTIONS] CONTAINER [CONTAINER...]'
  },
  {
    id: 'docker-start',
    command: 'docker start',
    description: 'Start one or more stopped containers',
    example: 'docker start my-container',
    category: 'basic',
    tags: ['start', 'container', 'resume'],
    syntax: 'docker start [OPTIONS] CONTAINER [CONTAINER...]'
  },
  {
    id: 'docker-restart',
    command: 'docker restart',
    description: 'Restart one or more containers',
    example: 'docker restart my-container',
    category: 'basic',
    tags: ['restart', 'container', 'reboot'],
    syntax: 'docker restart [OPTIONS] CONTAINER [CONTAINER...]'
  },
  
  // Image Management
  {
    id: 'docker-images',
    command: 'docker images',
    description: 'List all local Docker images',
    example: 'docker images -a',
    category: 'images',
    tags: ['images', 'list', 'local'],
    isPopular: true,
    syntax: 'docker images [OPTIONS] [REPOSITORY[:TAG]]',
    flags: [
      { flag: '-a', description: 'Show all images (including intermediate)' },
      { flag: '-q', description: 'Only show image IDs' }
    ]
  },
  {
    id: 'docker-pull',
    command: 'docker pull',
    description: 'Download an image from a registry',
    example: 'docker pull ubuntu:20.04',
    category: 'images',
    tags: ['download', 'registry', 'image'],
    isPopular: true,
    syntax: 'docker pull [OPTIONS] NAME[:TAG|@DIGEST]'
  },
  {
    id: 'docker-push',
    command: 'docker push',
    description: 'Upload an image to a registry',
    example: 'docker push myuser/myapp:latest',
    category: 'images',
    tags: ['upload', 'registry', 'publish'],
    syntax: 'docker push [OPTIONS] NAME[:TAG]'
  },
  {
    id: 'docker-build',
    command: 'docker build',
    description: 'Build an image from a Dockerfile',
    example: 'docker build -t myapp:latest .',
    category: 'images',
    tags: ['build', 'dockerfile', 'create'],
    isPopular: true,
    syntax: 'docker build [OPTIONS] PATH | URL | -',
    flags: [
      { flag: '-t', description: 'Name and optionally tag the image' },
      { flag: '-f', description: 'Name of the Dockerfile' },
      { flag: '--no-cache', description: 'Do not use cache when building' }
    ]
  },
  {
    id: 'docker-rmi',
    command: 'docker rmi',
    description: 'Remove one or more images',
    example: 'docker rmi nginx:latest',
    category: 'images',
    tags: ['remove', 'delete', 'image'],
    syntax: 'docker rmi [OPTIONS] IMAGE [IMAGE...]',
    flags: [
      { flag: '-f', description: 'Force removal of the image' }
    ]
  },
  {
    id: 'docker-tag',
    command: 'docker tag',
    description: 'Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE',
    example: 'docker tag myapp:latest myapp:v1.0',
    category: 'images',
    tags: ['tag', 'version', 'alias'],
    syntax: 'docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]'
  },

  // Container Management
  {
    id: 'docker-exec',
    command: 'docker exec',
    description: 'Execute a command in a running container',
    example: 'docker exec -it my-container bash',
    category: 'containers',
    tags: ['execute', 'shell', 'interactive'],
    isPopular: true,
    syntax: 'docker exec [OPTIONS] CONTAINER COMMAND [ARG...]',
    flags: [
      { flag: '-it', description: 'Interactive terminal' },
      { flag: '-d', description: 'Detached mode' },
      { flag: '-u', description: 'Username or UID' }
    ]
  },
  {
    id: 'docker-logs',
    command: 'docker logs',
    description: 'Fetch the logs of a container',
    example: 'docker logs -f my-container',
    category: 'containers',
    tags: ['logs', 'output', 'debug'],
    isPopular: true,
    syntax: 'docker logs [OPTIONS] CONTAINER',
    flags: [
      { flag: '-f', description: 'Follow log output' },
      { flag: '--tail', description: 'Show last N lines of logs' },
      { flag: '--since', description: 'Show logs since timestamp' }
    ]
  },
  {
    id: 'docker-inspect',
    command: 'docker inspect',
    description: 'Return low-level information on Docker objects',
    example: 'docker inspect my-container',
    category: 'containers',
    tags: ['inspect', 'details', 'metadata'],
    syntax: 'docker inspect [OPTIONS] NAME|ID [NAME|ID...]'
  },
  {
    id: 'docker-rm',
    command: 'docker rm',
    description: 'Remove one or more containers',
    example: 'docker rm my-container',
    category: 'containers',
    tags: ['remove', 'delete', 'container'],
    syntax: 'docker rm [OPTIONS] CONTAINER [CONTAINER...]',
    flags: [
      { flag: '-f', description: 'Force the removal of a running container' },
      { flag: '-v', description: 'Remove associated volumes' }
    ]
  },
  {
    id: 'docker-cp',
    command: 'docker cp',
    description: 'Copy files/folders between a container and the local filesystem',
    example: 'docker cp my-container:/app/file.txt ./file.txt',
    category: 'containers',
    tags: ['copy', 'files', 'transfer'],
    syntax: 'docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH'
  },
  {
    id: 'docker-stats',
    command: 'docker stats',
    description: 'Display a live stream of container(s) resource usage statistics',
    example: 'docker stats my-container',
    category: 'containers',
    tags: ['stats', 'performance', 'monitor'],
    syntax: 'docker stats [OPTIONS] [CONTAINER...]'
  },

  // Network Commands
  {
    id: 'docker-network-ls',
    command: 'docker network ls',
    description: 'List all networks',
    example: 'docker network ls',
    category: 'network',
    tags: ['network', 'list'],
    syntax: 'docker network ls [OPTIONS]'
  },
  {
    id: 'docker-network-create',
    command: 'docker network create',
    description: 'Create a network',
    example: 'docker network create mynetwork',
    category: 'network',
    tags: ['network', 'create'],
    syntax: 'docker network create [OPTIONS] NETWORK'
  },
  {
    id: 'docker-network-connect',
    command: 'docker network connect',
    description: 'Connect a container to a network',
    example: 'docker network connect mynetwork my-container',
    category: 'network',
    tags: ['network', 'connect'],
    syntax: 'docker network connect [OPTIONS] NETWORK CONTAINER'
  },
  {
    id: 'docker-network-disconnect',
    command: 'docker network disconnect',
    description: 'Disconnect a container from a network',
    example: 'docker network disconnect mynetwork my-container',
    category: 'network',
    tags: ['network', 'disconnect'],
    syntax: 'docker network disconnect [OPTIONS] NETWORK CONTAINER'
  },

  // Volume Commands
  {
    id: 'docker-volume-ls',
    command: 'docker volume ls',
    description: 'List volumes',
    example: 'docker volume ls',
    category: 'volumes',
    tags: ['volume', 'list', 'storage'],
    syntax: 'docker volume ls [OPTIONS]'
  },
  {
    id: 'docker-volume-create',
    command: 'docker volume create',
    description: 'Create a volume',
    example: 'docker volume create myvolume',
    category: 'volumes',
    tags: ['volume', 'create', 'storage'],
    syntax: 'docker volume create [OPTIONS] [VOLUME]'
  },
  {
    id: 'docker-volume-inspect',
    command: 'docker volume inspect',
    description: 'Display detailed information on one or more volumes',
    example: 'docker volume inspect myvolume',
    category: 'volumes',
    tags: ['volume', 'inspect', 'details'],
    syntax: 'docker volume inspect [OPTIONS] VOLUME [VOLUME...]'
  },
  {
    id: 'docker-volume-rm',
    command: 'docker volume rm',
    description: 'Remove one or more volumes',
    example: 'docker volume rm myvolume',
    category: 'volumes',
    tags: ['volume', 'remove', 'delete'],
    syntax: 'docker volume rm [OPTIONS] VOLUME [VOLUME...]'
  },

  // Docker Compose
  {
    id: 'docker-compose-up',
    command: 'docker-compose up',
    description: 'Create and start containers',
    example: 'docker-compose up -d',
    category: 'compose',
    tags: ['compose', 'start', 'orchestration'],
    isPopular: true,
    syntax: 'docker-compose up [OPTIONS] [SERVICE...]',
    flags: [
      { flag: '-d', description: 'Detached mode' },
      { flag: '--build', description: 'Build images before starting containers' }
    ]
  },
  {
    id: 'docker-compose-down',
    command: 'docker-compose down',
    description: 'Stop and remove containers, networks',
    example: 'docker-compose down -v',
    category: 'compose',
    tags: ['compose', 'stop', 'cleanup'],
    isPopular: true,
    syntax: 'docker-compose down [OPTIONS]',
    flags: [
      { flag: '-v', description: 'Remove named volumes and anonymous volumes' }
    ]
  },
  {
    id: 'docker-compose-build',
    command: 'docker-compose build',
    description: 'Build or rebuild services',
    example: 'docker-compose build --no-cache',
    category: 'compose',
    tags: ['compose', 'build'],
    syntax: 'docker-compose build [OPTIONS] [SERVICE...]'
  },
  {
    id: 'docker-compose-logs',
    command: 'docker-compose logs',
    description: 'View output from containers',
    example: 'docker-compose logs -f web',
    category: 'compose',
    tags: ['compose', 'logs', 'debug'],
    syntax: 'docker-compose logs [OPTIONS] [SERVICE...]'
  },

  {
    id: 'docker-compose-ps',
    command: 'docker-compose ps',
    description: 'List containers',
    example: 'docker-compose ps',
    category: 'compose',
    tags: ['compose', 'list', 'status'],
    syntax: 'docker-compose ps [OPTIONS] [SERVICE...]'
  },
  {
    id: 'docker-compose-exec',
    command: 'docker-compose exec',
    description: 'Execute a command in a running container',
    example: 'docker-compose exec web bash',
    category: 'compose',
    tags: ['compose', 'execute', 'shell'],
    syntax: 'docker-compose exec [OPTIONS] SERVICE COMMAND [ARGS...]'
  },
  {
    id: 'docker-compose-run',
    command: 'docker-compose run',
    description: 'Run a one-off command on a service',
    example: 'docker-compose run --rm web npm test',
    category: 'compose',
    tags: ['compose', 'run', 'oneoff'],
    syntax: 'docker-compose run [OPTIONS] SERVICE [COMMAND] [ARGS...]'
  },
  {
    id: 'docker-compose-pull',
    command: 'docker-compose pull',
    description: 'Pull service images',
    example: 'docker-compose pull',
    category: 'compose',
    tags: ['compose', 'pull', 'images'],
    syntax: 'docker-compose pull [OPTIONS] [SERVICE...]'
  },
  {
    id: 'docker-compose-restart',
    command: 'docker-compose restart',
    description: 'Restart services',
    example: 'docker-compose restart web',
    category: 'compose',
    tags: ['compose', 'restart'],
    syntax: 'docker-compose restart [OPTIONS] [SERVICE...]'
  },
  {
    id: 'docker-compose-stop',
    command: 'docker-compose stop',
    description: 'Stop services',
    example: 'docker-compose stop',
    category: 'compose',
    tags: ['compose', 'stop'],
    syntax: 'docker-compose stop [OPTIONS] [SERVICE...]'
  },

  // Advanced Container Commands
  {
    id: 'docker-attach',
    command: 'docker attach',
    description: 'Attach local standard input, output, and error streams to a running container',
    example: 'docker attach my-container',
    category: 'containers',
    tags: ['attach', 'console', 'interactive'],
    syntax: 'docker attach [OPTIONS] CONTAINER'
  },
  {
    id: 'docker-commit',
    command: 'docker commit',
    description: 'Create a new image from a container\'s changes',
    example: 'docker commit my-container my-new-image:latest',
    category: 'containers',
    tags: ['commit', 'save', 'image'],
    syntax: 'docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]'
  },
  {
    id: 'docker-create',
    command: 'docker create',
    description: 'Create a new container but do not start it',
    example: 'docker create --name my-container nginx',
    category: 'containers',
    tags: ['create', 'container', 'prepare'],
    syntax: 'docker create [OPTIONS] IMAGE [COMMAND] [ARG...]'
  },
  {
    id: 'docker-diff',
    command: 'docker diff',
    description: 'Inspect changes to files or directories on a container\'s filesystem',
    example: 'docker diff my-container',
    category: 'containers',
    tags: ['diff', 'changes', 'filesystem'],
    syntax: 'docker diff CONTAINER'
  },
  {
    id: 'docker-export',
    command: 'docker export',
    description: 'Export a container\'s filesystem as a tar archive',
    example: 'docker export my-container > my-container.tar',
    category: 'containers',
    tags: ['export', 'backup', 'archive'],
    syntax: 'docker export [OPTIONS] CONTAINER'
  },
  {
    id: 'docker-kill',
    command: 'docker kill',
    description: 'Kill one or more running containers',
    example: 'docker kill my-container',
    category: 'containers',
    tags: ['kill', 'terminate', 'force'],
    syntax: 'docker kill [OPTIONS] CONTAINER [CONTAINER...]'
  },
  {
    id: 'docker-pause',
    command: 'docker pause',
    description: 'Pause all processes within one or more containers',
    example: 'docker pause my-container',
    category: 'containers',
    tags: ['pause', 'suspend', 'freeze'],
    syntax: 'docker pause CONTAINER [CONTAINER...]'
  },
  {
    id: 'docker-unpause',
    command: 'docker unpause',
    description: 'Unpause all processes within one or more containers',
    example: 'docker unpause my-container',
    category: 'containers',
    tags: ['unpause', 'resume', 'unfreeze'],
    syntax: 'docker unpause CONTAINER [CONTAINER...]'
  },
  {
    id: 'docker-rename',
    command: 'docker rename',
    description: 'Rename a container',
    example: 'docker rename old-name new-name',
    category: 'containers',
    tags: ['rename', 'name', 'change'],
    syntax: 'docker rename CONTAINER NEW_NAME'
  },
  {
    id: 'docker-update',
    command: 'docker update',
    description: 'Update configuration of one or more containers',
    example: 'docker update --memory 512m my-container',
    category: 'containers',
    tags: ['update', 'configure', 'resources'],
    syntax: 'docker update [OPTIONS] CONTAINER [CONTAINER...]'
  },
  {
    id: 'docker-wait',
    command: 'docker wait',
    description: 'Block until one or more containers stop, then print their exit codes',
    example: 'docker wait my-container',
    category: 'containers',
    tags: ['wait', 'block', 'exit'],
    syntax: 'docker wait CONTAINER [CONTAINER...]'
  },

  // Advanced Image Commands
  {
    id: 'docker-history',
    command: 'docker history',
    description: 'Show the history of an image',
    example: 'docker history nginx:latest',
    category: 'images',
    tags: ['history', 'layers', 'info'],
    syntax: 'docker history [OPTIONS] IMAGE'
  },
  {
    id: 'docker-save',
    command: 'docker save',
    description: 'Save one or more images to a tar archive',
    example: 'docker save nginx:latest > nginx.tar',
    category: 'images',
    tags: ['save', 'backup', 'export'],
    syntax: 'docker save [OPTIONS] IMAGE [IMAGE...]'
  },
  {
    id: 'docker-load',
    command: 'docker load',
    description: 'Load an image from a tar archive or STDIN',
    example: 'docker load < nginx.tar',
    category: 'images',
    tags: ['load', 'import', 'restore'],
    syntax: 'docker load [OPTIONS]'
  },
  {
    id: 'docker-import',
    command: 'docker import',
    description: 'Import the contents from a tarball to create a filesystem image',
    example: 'docker import my-container.tar my-image:latest',
    category: 'images',
    tags: ['import', 'create', 'tarball'],
    syntax: 'docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]'
  },

  // Registry & Authentication
  {
    id: 'docker-login',
    command: 'docker login',
    description: 'Log in to a Docker registry',
    example: 'docker login docker.io',
    category: 'registry',
    tags: ['login', 'auth', 'registry'],
    syntax: 'docker login [OPTIONS] [SERVER]',
    flags: [
      { flag: '-u', description: 'Username' },
      { flag: '-p', description: 'Password' }
    ]
  },
  {
    id: 'docker-logout',
    command: 'docker logout',
    description: 'Log out from a Docker registry',
    example: 'docker logout docker.io',
    category: 'registry',
    tags: ['logout', 'auth', 'registry'],
    syntax: 'docker logout [SERVER]'
  },
  {
    id: 'docker-search',
    command: 'docker search',
    description: 'Search the Docker Hub for images',
    example: 'docker search nginx',
    category: 'registry',
    tags: ['search', 'hub', 'images'],
    syntax: 'docker search [OPTIONS] TERM'
  },

  // Docker Context
  {
    id: 'docker-context-ls',
    command: 'docker context ls',
    description: 'List contexts',
    example: 'docker context ls',
    category: 'context',
    tags: ['context', 'list', 'remote'],
    syntax: 'docker context ls [OPTIONS]'
  },
  {
    id: 'docker-context-create',
    command: 'docker context create',
    description: 'Create a context',
    example: 'docker context create remote --docker host=ssh://user@host',
    category: 'context',
    tags: ['context', 'create', 'remote'],
    syntax: 'docker context create [OPTIONS] CONTEXT'
  },
  {
    id: 'docker-context-use',
    command: 'docker context use',
    description: 'Set the current docker context',
    example: 'docker context use remote',
    category: 'context',
    tags: ['context', 'switch', 'use'],
    syntax: 'docker context use CONTEXT'
  },

  // Docker Swarm
  {
    id: 'docker-swarm-init',
    command: 'docker swarm init',
    description: 'Initialize a swarm',
    example: 'docker swarm init --advertise-addr 192.168.1.100',
    category: 'swarm',
    tags: ['swarm', 'init', 'cluster'],
    syntax: 'docker swarm init [OPTIONS]'
  },
  {
    id: 'docker-swarm-join',
    command: 'docker swarm join',
    description: 'Join a swarm as a node and/or manager',
    example: 'docker swarm join --token TOKEN 192.168.1.100:2377',
    category: 'swarm',
    tags: ['swarm', 'join', 'cluster'],
    syntax: 'docker swarm join [OPTIONS] HOST:PORT'
  },
  {
    id: 'docker-swarm-leave',
    command: 'docker swarm leave',
    description: 'Leave the swarm',
    example: 'docker swarm leave --force',
    category: 'swarm',
    tags: ['swarm', 'leave', 'cluster'],
    syntax: 'docker swarm leave [OPTIONS]'
  },

  // Docker Service
  {
    id: 'docker-service-create',
    command: 'docker service create',
    description: 'Create a new service',
    example: 'docker service create --name web --replicas 3 nginx',
    category: 'service',
    tags: ['service', 'create', 'swarm'],
    syntax: 'docker service create [OPTIONS] IMAGE [COMMAND] [ARG...]'
  },
  {
    id: 'docker-service-ls',
    command: 'docker service ls',
    description: 'List services',
    example: 'docker service ls',
    category: 'service',
    tags: ['service', 'list', 'swarm'],
    syntax: 'docker service ls [OPTIONS]'
  },
  {
    id: 'docker-service-ps',
    command: 'docker service ps',
    description: 'List the tasks of one or more services',
    example: 'docker service ps web',
    category: 'service',
    tags: ['service', 'tasks', 'status'],
    syntax: 'docker service ps [OPTIONS] SERVICE [SERVICE...]'
  },
  {
    id: 'docker-service-scale',
    command: 'docker service scale',
    description: 'Scale one or multiple replicated services',
    example: 'docker service scale web=5',
    category: 'service',
    tags: ['service', 'scale', 'replicas'],
    syntax: 'docker service scale SERVICE=REPLICAS [SERVICE=REPLICAS...]'
  },
  {
    id: 'docker-service-update',
    command: 'docker service update',
    description: 'Update a service',
    example: 'docker service update --image nginx:1.20 web',
    category: 'service',
    tags: ['service', 'update', 'rolling'],
    syntax: 'docker service update [OPTIONS] SERVICE'
  },

  // Docker Stack
  {
    id: 'docker-stack-deploy',
    command: 'docker stack deploy',
    description: 'Deploy a new stack or update an existing stack',
    example: 'docker stack deploy -c docker-compose.yml mystack',
    category: 'stack',
    tags: ['stack', 'deploy', 'compose'],
    syntax: 'docker stack deploy [OPTIONS] STACK'
  },
  {
    id: 'docker-stack-ls',
    command: 'docker stack ls',
    description: 'List stacks',
    example: 'docker stack ls',
    category: 'stack',
    tags: ['stack', 'list'],
    syntax: 'docker stack ls [OPTIONS]'
  },
  {
    id: 'docker-stack-rm',
    command: 'docker stack rm',
    description: 'Remove one or more stacks',
    example: 'docker stack rm mystack',
    category: 'stack',
    tags: ['stack', 'remove', 'delete'],
    syntax: 'docker stack rm STACK [STACK...]'
  },

  // Docker Node
  {
    id: 'docker-node-ls',
    command: 'docker node ls',
    description: 'List nodes in the swarm',
    example: 'docker node ls',
    category: 'node',
    tags: ['node', 'list', 'swarm'],
    syntax: 'docker node ls [OPTIONS]'
  },
  {
    id: 'docker-node-promote',
    command: 'docker node promote',
    description: 'Promote one or more nodes to manager in the swarm',
    example: 'docker node promote node-1',
    category: 'node',
    tags: ['node', 'promote', 'manager'],
    syntax: 'docker node promote NODE [NODE...]'
  },
  {
    id: 'docker-node-demote',
    command: 'docker node demote',
    description: 'Demote one or more nodes from manager in the swarm',
    example: 'docker node demote node-1',
    category: 'node',
    tags: ['node', 'demote', 'worker'],
    syntax: 'docker node demote NODE [NODE...]'
  },

  // Docker Plugin
  {
    id: 'docker-plugin-ls',
    command: 'docker plugin ls',
    description: 'List plugins',
    example: 'docker plugin ls',
    category: 'plugin',
    tags: ['plugin', 'list'],
    syntax: 'docker plugin ls [OPTIONS]'
  },
  {
    id: 'docker-plugin-install',
    command: 'docker plugin install',
    description: 'Install a plugin',
    example: 'docker plugin install vieux/sshfs',
    category: 'plugin',
    tags: ['plugin', 'install'],
    syntax: 'docker plugin install [OPTIONS] PLUGIN [KEY=VALUE...]'
  },

  // Docker Secret (Swarm mode)
  {
    id: 'docker-secret-create',
    command: 'docker secret create',
    description: 'Create a secret from a file or STDIN as content',
    example: 'docker secret create my-secret ./secret.txt',
    category: 'secret',
    tags: ['secret', 'create', 'swarm'],
    syntax: 'docker secret create [OPTIONS] SECRET [file|-]'
  },
  {
    id: 'docker-secret-ls',
    command: 'docker secret ls',
    description: 'List secrets',
    example: 'docker secret ls',
    category: 'secret',
    tags: ['secret', 'list', 'swarm'],
    syntax: 'docker secret ls [OPTIONS]'
  },

  // System Maintenance
  {
    id: 'docker-system-prune',
    command: 'docker system prune',
    description: 'Remove unused data',
    example: 'docker system prune -a',
    category: 'system',
    tags: ['cleanup', 'prune', 'system'],
    isPopular: true,
    syntax: 'docker system prune [OPTIONS]',
    flags: [
      { flag: '-a', description: 'Remove all unused images, not just dangling ones' },
      { flag: '-f', description: 'Do not prompt for confirmation' }
    ]
  },
  {
    id: 'docker-system-df',
    command: 'docker system df',
    description: 'Show docker filesystem usage',
    example: 'docker system df -v',
    category: 'system',
    tags: ['disk', 'usage', 'space'],
    syntax: 'docker system df [OPTIONS]'
  },
  {
    id: 'docker-version',
    command: 'docker version',
    description: 'Show the Docker version information',
    example: 'docker version',
    category: 'system',
    tags: ['version', 'info'],
    syntax: 'docker version [OPTIONS]'
  },
  {
    id: 'docker-info',
    command: 'docker info',
    description: 'Display system-wide information',
    example: 'docker info',
    category: 'system',
    tags: ['info', 'system', 'details'],
    syntax: 'docker info [OPTIONS]'
  },
  {
    id: 'docker-events',
    command: 'docker events',
    description: 'Get real time events from the server',
    example: 'docker events --since "2023-01-01"',
    category: 'system',
    tags: ['events', 'monitor', 'realtime'],
    syntax: 'docker events [OPTIONS]'
  }
]

export const categories: Category[] = [
  {
    id: 'basic',
    name: 'Basic Commands',
    icon: 'PlayCircle',
    count: dockerCommands.filter(cmd => cmd.category === 'basic').length,
    description: 'Essential Docker commands for container management'
  },
  {
    id: 'images',
    name: 'Image Management',
    icon: 'Package',
    count: dockerCommands.filter(cmd => cmd.category === 'images').length,
    description: 'Build, tag, and manage Docker images'
  },
  {
    id: 'containers',
    name: 'Container Management',
    icon: 'Box',
    count: dockerCommands.filter(cmd => cmd.category === 'containers').length,
    description: 'Interact with and manage running containers'
  },
  {
    id: 'network',
    name: 'Network Commands',
    icon: 'Network',
    count: dockerCommands.filter(cmd => cmd.category === 'network').length,
    description: 'Create and manage Docker networks'
  },
  {
    id: 'volumes',
    name: 'Volume Commands',
    icon: 'HardDrive',
    count: dockerCommands.filter(cmd => cmd.category === 'volumes').length,
    description: 'Manage persistent data with Docker volumes'
  },
  {
    id: 'compose',
    name: 'Docker Compose',
    icon: 'Layers',
    count: dockerCommands.filter(cmd => cmd.category === 'compose').length,
    description: 'Multi-container application orchestration'
  },
  {
    id: 'registry',
    name: 'Registry & Auth',
    icon: 'Key',
    count: dockerCommands.filter(cmd => cmd.category === 'registry').length,
    description: 'Registry authentication and image search'
  },
  {
    id: 'context',
    name: 'Context Management',
    icon: 'Globe',
    count: dockerCommands.filter(cmd => cmd.category === 'context').length,
    description: 'Manage Docker contexts for remote connections'
  },
  {
    id: 'swarm',
    name: 'Docker Swarm',
    icon: 'Cluster',
    count: dockerCommands.filter(cmd => cmd.category === 'swarm').length,
    description: 'Docker Swarm cluster management'
  },
  {
    id: 'service',
    name: 'Service Management',
    icon: 'Cloud',
    count: dockerCommands.filter(cmd => cmd.category === 'service').length,
    description: 'Manage Docker Swarm services'
  },
  {
    id: 'stack',
    name: 'Stack Management',
    icon: 'Stack',
    count: dockerCommands.filter(cmd => cmd.category === 'stack').length,
    description: 'Deploy and manage Docker stacks'
  },
  {
    id: 'node',
    name: 'Node Management',
    icon: 'Server',
    count: dockerCommands.filter(cmd => cmd.category === 'node').length,
    description: 'Manage Docker Swarm nodes'
  },
  {
    id: 'plugin',
    name: 'Plugin Management',
    icon: 'Puzzle',
    count: dockerCommands.filter(cmd => cmd.category === 'plugin').length,
    description: 'Manage Docker plugins'
  },
  {
    id: 'secret',
    name: 'Secret Management',
    icon: 'Lock',
    count: dockerCommands.filter(cmd => cmd.category === 'secret').length,
    description: 'Manage Docker secrets in Swarm mode'
  },
  {
    id: 'system',
    name: 'System Maintenance',
    icon: 'Settings',
    count: dockerCommands.filter(cmd => cmd.category === 'system').length,
    description: 'System cleanup and maintenance commands'
  }
]

// Utility functions
export const getCommandsByCategory = (categoryId: string): DockerCommand[] => {
  return dockerCommands.filter(command => command.category === categoryId)
}

export const getPopularCommands = (): DockerCommand[] => {
  return dockerCommands.filter(command => command.isPopular)
}

export const searchCommands = (searchTerm: string): DockerCommand[] => {
  if (!searchTerm) return dockerCommands
  
  const term = searchTerm.toLowerCase()
  return dockerCommands.filter(command =>
    command.command.toLowerCase().includes(term) ||
    command.description.toLowerCase().includes(term) ||
    command.tags.some(tag => tag.toLowerCase().includes(term)) ||
    command.example.toLowerCase().includes(term)
  )
}