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
XIAOQI_TASK=""
if echo "$SESSIONS_JSON" | grep -qi "xiaoqi\|小七"; then
    if echo "$SUBAGENTS_JSON" | grep -qi "xiaoqi\|小七"; then
        XIAOQI_STATUS="busy"
        XIAOQI_TASK="执行任务中"
    else
        XIAOQI_STATUS="online"
    fi
fi

# 解析 柠檬 状态
NINGMENG_STATUS="offline"
NINGMENG_TASK=""
if echo "$SESSIONS_JSON" | grep -qi "ningmeng\|柠檬"; then
    if echo "$SUBAGENTS_JSON" | grep -qi "ningmeng\|柠檬"; then
        NINGMENG_STATUS="busy"
        NINGMENG_TASK="执行任务中"
    else
        NINGMENG_STATUS="online"
    fi
fi

# 解析 白桃 状态
BAITAO_STATUS="offline"
BAITAO_TASK=""
if echo "$SESSIONS_JSON" | grep -qi "baitao\|白桃"; then
    if echo "$SUBAGENTS_JSON" | grep -qi "baitao\|白桃"; then
        BAITAO_STATUS="busy"
        BAITAO_TASK="执行任务中"
    else
        BAITAO_STATUS="online"
    fi
fi

# 解析 煤球 状态
MEIQIU_STATUS="offline"
MEIQIU_TASK=""
if echo "$SESSIONS_JSON" | grep -qi "meiqiu\|煤球"; then
    if echo "$SUBAGENTS_JSON" | grep -qi "meiqiu\|煤球"; then
        MEIQIU_STATUS="busy"
        MEIQIU_TASK="执行任务中"
    else
        MEIQIU_STATUS="online"
    fi
fi

# 尼克（主会话）永远在线
NIKE_STATUS="online"
NIKE_TASK="项目管理"

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
      "currentTask": "$XIAOQI_TASK"
    },
    {
      "id": 2,
      "name": "柠檬",
      "avatar": "🍋",
      "status": "$NINGMENG_STATUS",
      "currentTask": "$NINGMENG_TASK"
    },
    {
      "id": 3,
      "name": "尼克",
      "avatar": "🦀",
      "status": "$NIKE_STATUS",
      "role": "leader",
      "currentTask": "$NIKE_TASK"
    },
    {
      "id": 4,
      "name": "白桃",
      "avatar": "🍑",
      "status": "$BAITAO_STATUS",
      "currentTask": "$BAITAO_TASK"
    },
    {
      "id": 5,
      "name": "煤球",
      "avatar": "⚫",
      "status": "$MEIQIU_STATUS",
      "currentTask": "$MEIQIU_TASK"
    }
  ]
}
EOF

echo "✅ 状态已更新: $STATUS_FILE"
cat "$STATUS_FILE"
