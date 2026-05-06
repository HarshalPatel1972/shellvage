$global:__sv_cmd = ""
$global:__sv_start = 0

function Invoke-ShellvagePreCommand {
    $global:__sv_cmd = $MyInvocation.Line
    $global:__sv_start = [int64](([datetime]::UtcNow)-(Get-Date "1970-01-01T00:00:00Z")).TotalMilliseconds
}

function Invoke-ShellvagePostCommand {
    $exit_code = $LASTEXITCODE
    if ($global:__sv_cmd) {
        # Execute asynchronously
        Start-Process -NoNewWindow -FilePath "shellvage-capture-result" -ArgumentList "--cmd", "`"$global:__sv_cmd`"", "--exit", "$exit_code", "--dir", "`"$PWD`"", "--start", "$global:__sv_start"
        $global:__sv_cmd = ""
    }
}

# Hook into Prompt
$global:OriginalPrompt = $function:prompt
function prompt {
    Invoke-ShellvagePostCommand
    & $global:OriginalPrompt
}

# Use PSReadLine to intercept commands if available
if (Get-Module PSReadLine) {
    Set-PSReadLineOption -HistorySaveStyle SaveAtExit
    Set-PSReadLineKeyHandler -Key Enter -ScriptBlock {
        Invoke-ShellvagePreCommand
        [Microsoft.PowerShell.PSConsoleReadLine]::AcceptLine()
    }
}
