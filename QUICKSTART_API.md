# MY MEME AIgram API 快速开始

## 🚀 新增功能

MY MEME 游戏现在支持从 AIgram Telegram Mini-App 动态加载用户和好友信息！

## 📋 需要做什么

### 部署时

1. 游戏必须通过带有特定参数的 URL 启动：
```
https://your-domain.com/my-meme?api_origin=<encoded_api_url>&telegram_id=<user_id>
```

### 本地开发时

- 游戏可以在没有 API 参数的情况下运行
- 会自动使用 7 个预设的默认角色
- 完全向后兼容

## 🔧 技术要点

### 新增文件

```
src/MyMeme/utils/aigramApi.ts      # AIgram API 通信服务
API_INTEGRATION.md                  # 详细文档
```

### 修改文件

```
src/MyMeme/hooks/useMyMeme.ts      # 添加 API 加载逻辑
index.html                          # 添加 Base64 库
```

## 📱 用户体验

1. **自动加载**：游戏启动时自动从 AIgram 获取用户信息和好友列表
2. **无缝集成**：好友头像和昵称被转换为可选择的游戏角色
3. **当前用户优先**：玩家自己的账户会出现在角色列表的第一位
4. **优雅降级**：如果 API 不可用或失败，使用默认角色列表
5. **无延迟**：API 调用在后台进行，不阻塞游戏初始化

## 🔌 API 集成原理

游戏使用 `window.postMessage` API：

```typescript
// 1. 检测 URL 参数
const apiOrigin = getApiOrigin();    // 从 ?api_origin=...
const telegramId = getTelegramId();  // 从 ?telegram_id=...

// 2. 调用 API
const userInfo = await getUserInfo(telegramId, apiOrigin);
const friends = await getContactsList(telegramId, apiOrigin);

// 3. 转换数据
const character = telegramUserToCharacter(userInfo);

// 4. 使用数据
setCharacters([character, ...friends.map(...)]);
```

## 📊 API 响应数据

### 用户信息
```json
{
  "telegram_id": "123456789",
  "name": "User Name",
  "head_url": "https://...",
  "fans_num": 100,
  ...
}
```

### 好友列表
```json
[
  { "telegram_id": "...", "name": "Friend 1", "head_url": "...", ... },
  { "telegram_id": "...", "name": "Friend 2", "head_url": "...", ... }
]
```

## ✅ 构建和测试

```bash
# 构建项目
npm run build

# 项目成功编译（0 错误，0 警告）
# 包括 187 KB JS + 45 MB 资源图片

# 本地开发
npm run dev
```

## 🐛 调试技巧

1. **查看日志**：打开浏览器 Console，搜索 `[MyMeme]` 或 `[AIgram API]`
2. **检查 URL**：确保 `api_origin` 和 `telegram_id` 参数存在
3. **测试 API**：使用浏览器 DevTools 验证 postMessage 通信
4. **网络状态**：检查是否存在 CORS 或网络连接问题

## 📚 更多信息

详见 `API_INTEGRATION.md` 获得完整的技术文档。

## 🎯 关键改动总结

| 文件 | 变动 | 说明 |
|------|------|------|
| `aigramApi.ts` | ✨ 新增 | AIgram API 通信服务 |
| `useMyMeme.ts` | 🔄 修改 | 添加 API 加载逻辑和 useEffect |
| `index.html` | 🔄 修改 | 添加 Base64 库 CDN |
| `API_INTEGRATION.md` | 📝 新增 | 详细技术文档 |

## 💡 下一步

1. 在 AIgram Mini-App 环境中测试
2. 验证用户和好友数据是否正确加载
3. 测试生成 Meme 时是否使用正确的用户头像
4. 报告任何问题或不兼容情况
