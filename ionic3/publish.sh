echo "Expected arguments: 1) version"

version=$1

if [ -z "$version" ]; then
  echo "version is not set"
  exit 1
fi

cd ./ionic3

npm run build

generatedNpmVersion="$(npm version $version)"

npm publish --access public

git tag "ionic3-${generatedNpmVersion}"
