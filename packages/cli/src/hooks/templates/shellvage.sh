#!/usr/bin/env bash

# Capture command BEFORE execution
shellvage_preexec() {
  __sv_cmd="$1"
  __sv_start=$(date +%s%3N)
}

# Capture result AFTER execution
shellvage_precmd() {
  local exit_code=$?
  if [ -n "$__sv_cmd" ]; then
    shellvage-capture-result \
      --cmd "$__sv_cmd" \
      --exit "$exit_code" \
      --dir "$PWD" \
      --start "$__sv_start" \
      &
    unset __sv_cmd __sv_start
  fi
}

# Zsh hooks
if [ -n "$ZSH_VERSION" ]; then
  autoload -Uz add-zsh-hook
  add-zsh-hook preexec shellvage_preexec
  add-zsh-hook precmd shellvage_precmd
fi

# Bash hooks
if [ -n "$BASH_VERSION" ]; then
  trap 'shellvage_preexec "$BASH_COMMAND"' DEBUG
  PROMPT_COMMAND="shellvage_precmd${PROMPT_COMMAND:+; $PROMPT_COMMAND}"
fi
