FROM node:24-slim

# Install minimal dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Force subsequent RUN layers or the container runtime to use a login shell, 
# which automatically reads from ~/.bashrc where NVM sets up its paths.
ENTRYPOINT ["/bin/bash", "--login", "-c"]

CMD ["bash"]