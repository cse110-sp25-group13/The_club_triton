#!/bin/bash
set -e

failed=0
for file in *.html; do
  if [ -f "$file" ]; then
    echo "Validating $file"
    response=$(curl -s -H "Content-Type: text/html; charset=utf-8" --data-binary "@$file" "https://validator.w3.org/nu/?out=json")
    messages=$(echo "$response" | jq '.messages | length')
    if [ "$messages" -eq 0 ]; then
      echo "✅ $file is valid"
    else
      echo "❌ $file has $messages issue(s):"
      echo "$response" | jq -r '.messages[] | "- [\(.type)] \(.message) at line \(.lastLine // "unknown")"'
      failed=1
    fi
  fi
done

exit $failed