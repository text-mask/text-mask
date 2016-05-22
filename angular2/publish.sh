echo "Expected arguments: 1) version"

version=$1

if [ -z "$version" ]; then
  echo "version is not set"
  exit 1
fi

npm run angular2:build

npm run angular2:verify

cd ./angular2

generatedNpmVersion="$(npm version $version)"

npm publish --access public

git tag "angular2-${generatedNpmVersion}"
