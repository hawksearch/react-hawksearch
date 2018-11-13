
Param(
    [Parameter(Mandatory)]
    [string]$Tag,

    [string]$Registry = "registry.idevdesign.net",
    [string]$Project = "react-hawksearch"
)

$imageName = "react-hawksearch.poc"


if (!$Registry) {
    Write-Error "Registry ""$Registry"" is invalid."
    exit 1
}

Write-Host "Pushing ${imageName}:$Tag to container registry $Registry in the $Project project..."

# ex: roc.web:4
$localImage = "{0}:{1}" -f $imageName, $Tag

# ex registry.idevdesign.net/roc/roc/roc.web:4
$remoteImage = "{0}/hawksearch/{1}/{2}" -f $Registry, $Project, $localImage

# retag image for pushing
& docker tag $localImage $remoteImage | Write-Verbose

if (!$?) {
    Write-Error "Unable to re-tag ""$localImage"" to ""$remoteImage""! Was Docker-Build.ps1 executed first?"
    exit $LASTEXITCODE
}

# now push it up
& docker push $remoteImage | Write-Verbose

if (!$?) {
    Write-Error "Unable to push ""$remoteImage""! Please check the output above for errors or use -Verbose flag for additional output"
    exit $LASTEXITCODE
}

Write-Host -ForegroundColor Green "Done pushing!`nImage: $remoteImage"
