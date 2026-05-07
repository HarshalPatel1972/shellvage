#!/bin/bash
# shellvage.sh - Master Template

if [ -z "$SHELLVAGE_SESSION_ID" ]; then
  export SHELLVAGE_SESSION_ID=$(uuidgen 2>/dev/null || cat /proc/sys/kernel/random/uuid 2>/dev/null || date +%s)
fi

shellvage_pre_exec() {
  SHELLVAGE_START_TIME=$(date +%s%3N)
}

shellvage_post_exec() {
  local exit_code=$?
  local cmd=$(history 1 | sed 's/^[ ]*[0-9]*[ ]*//')
  local dir=$(pwd)
  
  # Basic capture - backgrounding
  (shellvage-capture --session-id "$SHELLVAGE_SESSION_ID" --cmd "$cmd" --exit "$exit_code" --dir "$dir" --start "$SHELLVAGE_START_TIME" &) >/dev/null 2>&1
}

# Simple hook - this varies by shell but this is the bash version
PROMPT_COMMAND="shellvage_post_exec; $PROMPT_COMMAND"
trap 'shellvage_pre_exec' DEBUG
