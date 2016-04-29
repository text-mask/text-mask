echo "Expected arguments: 1) version"

version=$1

if [ -z "$version" ]; then
  echo "version is not set"
  exit 1
fi

npm run angular2:build

npm run angular2:verify

cd ./integrations/angular2

npm version $version

npm publish --access public
