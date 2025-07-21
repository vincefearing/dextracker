# Stage 1: Build the Go binary using a Debian-based Go image
FROM golang:1.24-bookworm AS builder

WORKDIR /app

# Copy Go module files and download dependencies
COPY go.mod go.sum* ./
RUN go mod download

# Copy the source code
COPY . .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /dextracker-api .

# ---

# Stage 2: Create the final, minimal production image using Debian
FROM debian:bookworm-slim

# Temporarily switch to root to install packages
USER root

# Install necessary tools for the dev container
RUN apt-get update && apt-get install -y lsof procps openssh-client && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user with a home directory for the dev container
RUN addgroup appgroup && \
    adduser --disabled-password --gecos "" --ingroup appgroup appuser

# Switch back to the non-root user for security
USER appuser

WORKDIR /app

# Copy the static binary from the builder stage
COPY --from=builder /dextracker-api .

# The data directory will be mounted as a volume via docker-compose
# We just need the directory to exist
RUN mkdir ./data

# Expose the port the API will run on
EXPOSE 8080

# The command to run the application
CMD ["./dextracker-api"]