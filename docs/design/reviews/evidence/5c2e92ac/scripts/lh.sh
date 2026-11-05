#!/bin/zsh
export CHROME_PATH="/Users/jarkko/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
LH=/Users/jarkko/code/metamorphosis/kit/node_modules/.bin/lighthouse
mkdir -p /private/tmp/claude-502/-Users-jarkko-orca-workspaces-koivupiilo-fi-kit-adopt/dde6e092-3dc0-49bd-a579-bf30a915e118/scratchpad/lh
for route in /404.html /fi/portfolio/ /fi/palvelut/ /fi/tietoa/ /services/personal-development/ /updates/welcome-to-bridgetown/ /portfolio/ /; do
  for v in current:4719 fixed:4720; do
    name=${v%%:*}; port=${v##*:}; slug=$(echo $route | tr '/.' '__')
    for i in 1 2 3; do
      $LH "http://127.0.0.1:$port$route" --quiet --output=json --output-path=/private/tmp/claude-502/-Users-jarkko-orca-workspaces-koivupiilo-fi-kit-adopt/dde6e092-3dc0-49bd-a579-bf30a915e118/scratchpad/lh/$name$slug-$i.json --only-categories=performance --chrome-flags="--headless=new --no-sandbox" >/dev/null 2>&1 || echo "fail $name $route $i"
    done
  done
done
echo done
