# MY MEME - AIgram API 集成文档

## 概述

MY MEME 游戏已集成 AIgram API，可以动态获取用户及好友信息，用于角色选择列表。

## API 集成内容

### 新增功能

- **动态用户信息加载**：在游戏启动时自动从 AIgram 获取当前用户的头像和昵称
- **好友列表加载**：自动获取用户的联系人列表，将好友转换为可选择的游戏角色
- **优雅降级**：如果 API 不可用或加载失败，游戏会使用默认的预设角色列表

### 文件结构

```
src/MyMeme/
├── utils/
│   ├── aigramApi.ts          # 新增：AIgram API 通信服务
│   └── sounds.ts             # 既有
├── hooks/
│   └── useMyMeme.ts          # 已修改：集成 API 调用
└── ...
```

## 技术实现

### AIgram API 通信

使用 `window.postMessage` API 与 AIgram Telegram Mini-App 进行通信：

```typescript
// 获取用户信息
const userInfo = await getUserInfo(telegramId, apiOrigin);

// 获取联系人列表
const contacts = await getContactsList(telegramId, apiOrigin);
```

### 数据转换

Telegram 用户数据自动转换为游戏角色格式：

```typescript
interface Character {
  id: string;              // Telegram ID
  name: string;            // 用户昵称
  avatar: string;          // 显示头像
  refUrl: string;          // API 参考头像（用于 img2img）
}
```

## 部署要求

### URL 参数

游戏需要在 AIgram 中通过以下 URL 参数启动：

```
https://your-domain.com/my-meme?api_origin=https%3A%2F%2Faigramdev.deextra.com&telegram_id=123456789
```

- `api_origin`：AIgram API 服务地址（URL 编码）
- `telegram_id`：当前用户的 Telegram ID

### 浏览器环境

游戏需要在 Telegram Mini-App 环境中运行，且需要支持：
- `window.postMessage` API
- Base64 编码库（已通过 CDN 加载）

## 实现细节

### 1. API 服务 (`aigramApi.ts`)

**主要函数：**

- `getApiOrigin()`：从 URL 参数读取 API 源地址
- `getTelegramId()`：从 URL 参数读取 Telegram ID
- `getUserInfo(telegramId, apiOrigin)`：获取指定用户信息
- `getContactsList(telegramId, apiOrigin)`：获取用户联系人列表
- `isApiAvailable()`：检查 API 是否可用

**通信流程：**

1. 编码请求参数为 Base64
2. 通过 `window.postMessage` 发送到 API 源地址
3. 监听来自 API 源的消息
4. 解码响应数据
5. 处理错误并自动超时（30 秒）

### 2. Hook 修改 (`useMyMeme.ts`)

**新增状态：**
- `characters`：所有可选角色列表（从 API 加载）
- `charsLoaded`：角色加载完成标志

**初始化流程：**

```typescript
useEffect(() => {
  const loadCharactersFromApi = async () => {
    if (!isApiAvailable()) return;

    try {
      // 1. 获取当前用户信息
      const userInfo = await getUserInfo(telegramId, apiOrigin);
      const currentUser = telegramUserToCharacter(userInfo);

      // 2. 获取联系人列表
      const contactsList = await getContactsList(telegramId, apiOrigin);

      // 3. 合并：当前用户 + 好友
      const allCharacters = [currentUser, ...friendCharacters];
      setCharacters(allCharacters);
    } catch (err) {
      // 4. 失败时使用默认角色
      setCharacters(DEFAULT_CHARACTERS);
    }
  };

  loadCharactersFromApi();
}, []);
```

### 3. HTML 更新

添加了 Base64 编码库：

```html
<script src="https://cdn.jsdelivr.net/npm/js-base64@3.7.8/base64.min.js"></script>
```

## 测试

### 本地测试（不含 API）

游戏在以下情况下会使用默认角色列表：
- 本地开发环境（无 URL 参数）
- API 加载失败
- API 超时

### 集成测试

1. 在 AIgram Telegram Mini-App 中启动游戏
2. 验证用户信息和好友列表是否正确加载
3. 测试角色选择功能
4. 验证生成 Meme 时是否使用正确的用户头像

## API 响应格式

### 获取用户信息

```typescript
{
  retcode: 0,
  errcode: 0,
  msg: "success",
  data: {
    id: number,
    telegram_id: string,
    name: string,
    sex: 0 | 1 | 2,
    head_url: string,
    introduction: string,
    avatar_describe: string | null,
    invite_code: string,
    invite_url: string,
    invite_text: string,
    fans_num: number,
    follow: boolean
  }
}
```

### 获取联系人列表

```typescript
{
  retcode: 0,
  errcode: 0,
  msg: "success",
  data: [
    { ...user1 },
    { ...user2 },
    // ...
  ]
}
```

## 故障排查

### 问题：角色列表为空或使用默认角色

**可能原因：**
- URL 中缺少 `api_origin` 或 `telegram_id` 参数
- API 服务地址不可达
- 网络超时（30 秒）

**解决方案：**
- 检查浏览器开发者工具 Console，查看是否有错误日志
- 确保在 AIgram Mini-App 中启动游戏
- 验证 API 服务地址是否正确

### 问题：Meme 生成失败

如果使用 API 加载的用户头像地址无法访问，meme 生成可能失败。

**解决方案：**
- 确保用户头像 URL (`head_url`) 是公开可访问的
- 如果需要，可以在 API 响应前添加代理层

## 未来改进

- [ ] 离线缓存用户和好友数据
- [ ] 支持更多用户信息字段（性别、简介等）
- [ ] 添加好友搜索和筛选功能
- [ ] 重试机制优化
