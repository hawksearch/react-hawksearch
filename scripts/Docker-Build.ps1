
Param(
    [Parameter(Mandatory)]
    [string]$Tag
)

$imageName = "react-hawksearch.poc";

Write-Host "Building ${imageName}:$Tag..."

# ex: react-hawksearch.poc:123
$localImage = "{0}:{1}" -f $imageName, $Tag

& docker build . -t $localImage | Write-Verbose

if (!$?) {
    Write-Error "Unable to build docker image, please review errors above or use -Verbose flag for additional output"
    exit $LASTEXITCODE
}

Write-Host -ForegroundColor Green "Done building!"
