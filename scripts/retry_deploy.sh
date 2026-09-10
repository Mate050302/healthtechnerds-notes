#!/bin/bash
# GitHub 쪽에 걸린 배포가 풀릴 때까지 주기적으로 다시 올린다.
cd "$(dirname "$0")/.."
for i in $(seq 1 24); do
  gh workflow run pages.yml >/dev/null 2>&1
  sleep 70
  c=$(gh run list --workflow=pages.yml --limit 1 --json conclusion --jq '.[0].conclusion')
  if [ "$c" = "success" ]; then
    echo "배포 성공 (시도 $i회차): https://mate050302.github.io/healthtechnerds-notes/"
    exit 0
  fi
  sleep 230
done
echo "24회 시도 동안 배포가 풀리지 않았다. GitHub 상태를 확인해야 한다."
