#!/bin/bash
# 노트·부록·원문번역본·템플릿·빌더가 바뀌면 사이트를 다시 빌드한다.
cd "$(dirname "$0")/.."
prev=""
while true; do
  cur=$(ls -l data/notes/*.json data/extras/*.json data/raw_ko/*.json \
           scripts/template.html scripts/build.py 2>/dev/null | md5)
  if [ "$cur" != "$prev" ]; then
    out=$(python3 scripts/build.py 2>&1)
    echo "[rebuild] $(date +%H:%M:%S) $(echo "$out" | sed -n 2p | tr -s ' ')"
    prev=$cur
  fi
  sleep 10
done
