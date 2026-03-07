#!/bin/bash
# 检查 OpenClaw 实际会话状态并生成 status.json

WORKSPACE="$HOME/.openclaw"
REPO="$HOME/openclaw-work-tracker"
STATUS_FILE="$REPO/public/status.json"

# 获取当前时间
NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
NOW_LOCAL=$(date +"%Y-%m-%d %H:%M:%S")

# 检查 OpenClaw sessions
SESSIONS_JSON=$(cd "$WORKSPACE" && npx openclaw sessions list --json 2>/dev/null || echo '{"sessions":[]}')

# 检查 subagents
SUBAGENTS_JSON=$(cd "$WORKSPACE" && npx openclaw subagents list --json 2>/dev/null || echo '{"active":[]}')

# 解析 小七 状态
XIAOQI_STATUS="offline"
if echo "$SESSIONS_JSON" | grep -qi "xiaoqi\|小七"; then
    if echo "$SUBAGENTS_JSON" | grep -qi "xiaoqi\|小七"; then
        XIAOQI_STATUS="busy"
    else
        XIAOQI_STATUS="online"
    fi
fi

# 解析 柠檬 状态  
NINGMENG_STATUS="offline"
if echo "$SESSIONS_JSON" | grep -qi "ningmeng\|柠檬"; then
    if echo "$SUBAGENTS_JSON" | grep -qi "ningmeng\|柠檬"; then
        NINGMENG_STATUS="busy"
    else
        NINGMENG_STATUS="online"
    fi
fi

# 尼克（主会话）永远在线
NIKE_STATUS="online"

# 生成 JSON
cat > "$STATUS_FILE" << EOF
{
  "updatedAt": "$NOW",
  "updatedAtLocal": "$NOW_LOCAL",
  "members": [
    {
      "id": 1,
      "name": "小七",
      "avatar": "🤖",
      "status": "$XIAOQI_STATUS",
      "currentTask": ""
    },
    {
      "id": 2,
      "name": "柠檬",
      "avatar": "🍋",
      "status": "$NINGMENG_STATUS",
      "currentTask": ""
    },
    {
      "id": 3,
      "name": "尼克",
      "avatar": "🦀",
      "status": "$NIKE_STATUS",
      "role": "leader",
      "currentTask": "项目管理"
    }
  ]
}
EOF

echo "✅ 状态已更新: $STATUS_FILE"
cat "$STATUS_FILE"
