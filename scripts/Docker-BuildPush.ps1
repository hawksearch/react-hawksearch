
Param(
    [Parameter(Mandatory)]
    [string]$Tag,

    [string]$Registry = "registry.idevdesign.net",
    [string]$Project = "react-hawksearch"
)

if (!$Registry) {
    Write-Error "Registry ""$Registry"" is invalid."
    exit 1
}

& .\Scripts\Docker-Build.ps1 -Tag $Tag
if (!$?) { exit $LASTEXITCODE }

& .\Scripts\Docker-Push.ps1 -Tag $Tag -Registry $Registry -Project $Project
if (!$?) { exit $LASTEXITCODE }
