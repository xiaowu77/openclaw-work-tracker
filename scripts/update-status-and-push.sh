#!/bin/bash
# 检查状态并推送到 GitHub
# 使用环境变量 GITHUB_TOKEN

REPO="$HOME/openclaw-work-tracker"
SCRIPT_DIR="$REPO/scripts"

# 运行状态检查
bash "$SCRIPT_DIR/check-status.sh"

# 检查是否有变化
cd "$REPO"
if git diff --quiet public/status.json; then
    echo "📊 状态无变化，跳过推送"
    exit 0
fi

# 提交并推送（token 从环境变量读取）
git add public/status.json
git commit -m "chore: 更新成员状态 $(date +'%H:%M')"

if [ -n "$GITHUB_TOKEN" ]; then
    git push "https://$GITHUB_TOKEN@github.com/xiaowu77/openclaw-work-tracker.git" 2>&1
else
    git push 2>&1
fi

echo "✅ 状态已推送到 GitHub"
