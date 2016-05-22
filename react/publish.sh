echo "Expected arguments: 1) version"

version=$1

if [ -z "$version" ]; then
  echo "version is not set"
  exit 1
fi

npm run react:build

npm run react:verify

cd ./react

generatedNpmVersion="$(npm version $version)"

npm publish --access public

git tag "react-${generatedNpmVersion}"
