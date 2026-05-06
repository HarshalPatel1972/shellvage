function shellvage_preexec --on-event fish_preexec
  set -g __sv_cmd $argv[1]
  set -g __sv_start (date +%s%3N)
end

function shellvage_precmd --on-event fish_postexec
  shellvage-capture-result \
    --cmd $__sv_cmd \
    --exit $status \
    --dir $PWD \
    --start $__sv_start &
end
