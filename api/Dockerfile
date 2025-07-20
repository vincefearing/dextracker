FROM golang:1.24-bookworm AS builder

WORKDIR /app

COPY go.mod go.sum* ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /dextracker-api .

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y openssh-client && \
    rm -rf /var/lib/apt/lists/*

RUN addgroup appgroup && \
    adduser --disabled-password --gecos "" --ingroup appgroup appuser
USER appuser

WORKDIR /app

COPY --from=builder /dextracker-api .

RUN mkdir ./data

EXPOSE 8080

CMD ["./dextracker-api"]