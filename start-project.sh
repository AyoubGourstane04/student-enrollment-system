#!/usr/bin/env bash
set -euo pipefail

BASE_DIR="$(pwd)"
LOG_DIR="$BASE_DIR/logs"

APPS=("studentservice" "courseservice" "enrolementservice") 

mkdir -p "$LOG_DIR"

cleanup() {
    echo "Caught termination signal! Stopping all background Spring Boot services..."
    pkill -P $$ 
    echo "All services stopped."
    exit 0
}
trap cleanup SIGINT SIGTERM

if [ -f "$BASE_DIR/.env" ]; then
    echo "Loading environment variables from .env"
    set -a
    source "$BASE_DIR/.env"
    set +a
else
    echo "Error: .env file not found in $BASE_DIR!"
    exit 1
fi

echo "Starting Docker containers..."
docker compose up -d
echo "Docker containers started."

start_app() {
  local app=$1
  local log_file="$LOG_DIR/${app}.log"
  
  echo "Starting $app... (Logs: $log_file)"
  (
    cd "$BASE_DIR/$app"
    mvn spring-boot:run > "$log_file" 2>&1
  ) &
}

wait_for_service() {
  local host=$1
  local port=$2
  local name=$3
  echo "Waiting for $name to be ready on $host:$port..."
  while ! nc -z "$host" "$port" 2>/dev/null; do
    sleep 2
  done
  echo "$name is up!"
}

start_app "eureka-server"
wait_for_service "localhost" "8761" "Eureka"

start_app "gateway"
wait_for_service "localhost" "8080" "Gateway"

for app in "${APPS[@]}"; do
  start_app "$app"
done

echo "All Spring Boot apps are initializing."
echo "Logs available in: $LOG_DIR"
echo "Press Ctrl+C to stop all local services."

wait