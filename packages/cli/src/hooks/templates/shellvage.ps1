# shellvage.ps1 - Master Template
if (!$global:shellvage_session_id) {
    $global:shellvage_session_id = [guid]::NewGuid().ToString()
}

$global:shellvage_transcript_path = Join-Path $env:TEMP "shellvage_$($global:shellvage_session_id).log"

function Shellvage-PreCommand {
    $global:shellvage_start_time = [Math]::Floor([double](Get-Date -UFormat %s) * 1000)
    $marker = "[SV_MARKER_$($global:shellvage_session_id)_$(Get-Random)]"
    $global:shellvage_last_marker = $marker
    Write-Host $marker -ForegroundColor Black -BackgroundColor Black
}

function Shellvage-PostCommand {
    $exitCode = if ($global:?) { 0 } else { 1 }
    $history = Get-History -Count 1
    if ($history) {
        $cmd = $history.CommandLine
        $dir = Get-Location
        $start = $global:shellvage_start_time
        
        Stop-Transcript | Out-Null
        $content = Get-Content $global:shellvage_transcript_path -Raw
        
        $marker = $global:shellvage_last_marker
        $lastOutput = ""
        if ($content -match [regex]::Escape($marker)) {
            $lastOutput = ($content -split [regex]::Escape($marker))[-1]
            $lastOutput = $lastOutput -replace "Transcript stopped.*", ""
            $lastOutput = $lastOutput.Trim()
        }
        
        $outputFile = Join-Path $env:TEMP "sv_out_$(Get-Random).txt"
        $lastOutput | Out-File -FilePath $outputFile -Encoding utf8
        
        Start-Transcript -Path $global:shellvage_transcript_path -Append -NoClobber | Out-Null
        
        $cliPath = "shellvage-capture" # Use global command
        Start-Process -FilePath "node" -ArgumentList "(Get-Command $cliPath).Source", "--session-id", "`"$($global:shellvage_session_id)`"", "--cmd", "`"$cmd`"", "--exit", $exitCode, "--dir", "`"$dir`"", "--start", $start, "--output-file", "`"$outputFile`"" -WindowStyle Hidden
    }
}

if (!(Test-Path $global:shellvage_transcript_path)) {
    Start-Transcript -Path $global:shellvage_transcript_path -NoClobber | Out-Null
}

$oldPrompt = $function:prompt
function global:prompt {
    Shellvage-PostCommand
    $p = & $oldPrompt
    Shellvage-PreCommand
    return "⬤ sv $p"
}
