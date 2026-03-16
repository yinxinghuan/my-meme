type Locale = 'zh' | 'en';

const MESSAGES: Record<string, Record<Locale, string>> = {
  'app.title': { zh: 'MY MEME', en: 'MY MEME' },
  'app.subtitle': { zh: 'AI 角色 Meme 生成器', en: 'AI Character Meme Generator' },
  'home.styles': { zh: 'MEME_', en: 'MEME_' },
  'home.character': { zh: 'CHARACTER_', en: 'CHARACTER_' },
  'home.switch': { zh: '[ SWITCH ]', en: '[ SWITCH ]' },

  'cat.work': { zh: '职场', en: 'WORK' },
  'cat.daily': { zh: '日常', en: 'DAILY' },
  'cat.social': { zh: '社交', en: 'SOCIAL' },
  'cat.tech': { zh: '技术', en: 'TECH' },

  'editor.scene1': { zh: '左格场景', en: 'LEFT PANEL' },
  'editor.scene2': { zh: '右格场景', en: 'RIGHT PANEL' },
  'editor.generate': { zh: '生成 MEME', en: 'GENERATE MEME' },
  'editor.wait': { zh: '冷却中', en: 'COOLDOWN' },

  'generating.title': { zh: 'GENERATING_', en: 'GENERATING_' },
  'generating.wait': { zh: 'AI 正在创作中...', en: 'AI is creating...' },
  'generating.tip': { zh: '大约需要 30-60 秒', en: '~30-60 seconds' },

  'result.save': { zh: '保存图片', en: 'SAVE IMAGE' },
  'result.saved': { zh: 'SAVED!', en: 'SAVED!' },
  'result.title': { zh: 'OUTPUT_', en: 'OUTPUT_' },
  'result.retry': { zh: '换一张', en: 'RETRY' },

  'home.beta': { zh: '> 测试版仅含少量角色', en: '> Beta: limited characters' },
  'home.betaTag': { zh: 'BETA TEST', en: 'BETA TEST' },

  'charSelect.title': { zh: 'SELECT CHARACTER_', en: 'SELECT CHARACTER_' },
  'charSelect.comingSoon': { zh: '更多角色 敬请期待', en: 'MORE CHARACTERS COMING SOON' },
  'charSelect.comingSoonSub': { zh: '正式版将接入所有平台好友', en: 'Full version will include all your friends' },

  // ── 热门时事 ─────────────────────────────
  'meme.aireplaceme.name': { zh: 'AI 要抢我饭碗？', en: 'AI Will Replace Me?' },
  'meme.aireplaceme.desc': { zh: '嘲笑AI → 看到AI做你的工作', en: 'Laughing at AI → AI does your job' },
  'meme.aiart.name': { zh: '画了6小时 vs AI 5秒', en: '6 Hours vs AI 5 Seconds' },
  'meme.aiart.desc': { zh: '手绘6小时 → AI 5秒搞定', en: 'Hand-drawn 6hrs → AI generates in 5s' },
  'meme.chatgpthomework.name': { zh: 'AI帮我写作业', en: 'AI Did My Homework' },
  'meme.chatgpthomework.desc': { zh: '让AI写作业 → 老师说这像AI写的', en: 'AI writes essay → teacher knows' },
  'meme.shortvideotrap.name': { zh: '就刷一个短视频', en: 'Just One Short Video' },
  'meme.shortvideotrap.desc': { zh: '10点说看一个 → 4点还在刷', en: 'One video at 10pm → still scrolling at 4am' },
  'meme.rtomandate.name': { zh: '居家办公结束了', en: 'Return to Office' },
  'meme.rtomandate.desc': { zh: '睡衣办公天堂 → 强制回公司', en: 'Pajama paradise → mandatory RTO email' },
  'meme.subscriptiontrap.name': { zh: '免费试用の陷阱', en: 'Free Trial Trap' },
  'meme.subscriptiontrap.desc': { zh: '开心试用 → 发现扣了47个订阅', en: 'Free trial → 47 subscriptions charged' },
  'meme.influencervsreal.name': { zh: 'INS vs 现实', en: 'Instagram vs Reality' },
  'meme.influencervsreal.desc': { zh: '精修美照 → 拍了50张废片', en: 'Perfect post → 50 failed attempts' },
  'meme.gasprices.name': { zh: '今天油价多少？', en: 'Gas Prices' },
  'meme.gasprices.desc': { zh: '自信加油 → 看到油价傻眼', en: 'Confident fill-up → price shock' },
  'meme.cryptoroller.name': { zh: '加密货币过山车', en: 'Crypto Rollercoaster' },
  'meme.cryptoroller.desc': { zh: '涨了开香槟 → 5分钟后暴跌', en: 'Moon champagne → crash in 5 minutes' },
  'meme.datingapp.name': { zh: '交友软件照骗', en: 'Dating App Reality' },
  'meme.datingapp.desc': { zh: '精修头像 → 视频通话原形毕露', en: 'Profile pic vs video call reality' },

  // ── 职场 ──────────────────────────────────
  'meme.overtime.name': { zh: '老板的"最后一件事"', en: 'Boss\'s "One More Thing"' },
  'meme.overtime.desc': { zh: '正要下班 → 老板突然出现', en: 'About to leave → boss appears' },
  'meme.meetingmute.name': { zh: '忘记静音了', en: 'Forgot to Mute' },
  'meme.meetingmute.desc': { zh: '开会吐槽 → 发现没静音', en: 'Talking trash → mic was on' },
  'meme.salaryday.name': { zh: '发工资的快乐', en: 'Payday Joy' },
  'meme.salaryday.desc': { zh: '工资到账 → 交完房租', en: 'Paycheck arrives → after rent' },
  'meme.emailtypo.name': { zh: '发出去才发现打错字', en: 'Email Typo' },
  'meme.emailtypo.desc': { zh: '自信发送 → 发现致命错别字', en: 'Confident send → fatal typo spotted' },
  'meme.fakebusy.name': { zh: '假装很忙', en: 'Fake Busy' },
  'meme.fakebusy.desc': { zh: '老板路过疯狂打字 → 其实在网购', en: 'Boss walks by → actually shopping' },
  'meme.replyall.name': { zh: '回复了全部人', en: 'Reply All' },
  'meme.replyall.desc': { zh: '吐槽同事 → 不小心全员回复', en: 'Sarcastic reply → sent to 500 people' },

  // ── 日常 ──────────────────────────────────
  'meme.mondayfriday.name': { zh: '周一 vs 周五', en: 'Monday vs Friday' },
  'meme.mondayfriday.desc': { zh: '行尸走肉 → 满血复活', en: 'Dead inside → full of energy' },
  'meme.wifidown.name': { zh: 'WiFi 断了', en: 'WiFi Down' },
  'meme.wifidown.desc': { zh: '岁月静好 → 世界末日', en: 'Peace → absolute chaos' },
  'meme.alarmsnooze.name': { zh: '明天一定早起', en: 'I\'ll Wake Up Early' },
  'meme.alarmsnooze.desc': { zh: '睡前发誓 → 暴打闹钟', en: 'Night promise → smash alarm' },
  'meme.diet.name': { zh: '今天开始减肥', en: 'Starting My Diet' },
  'meme.diet.desc': { zh: '沙拉宣言 → 半夜偷吃', en: 'Salad oath → midnight feast' },
  'meme.bedphone.name': { zh: '说好的早睡呢', en: 'Just 5 More Minutes' },
  'meme.bedphone.desc': { zh: '11点说晚安 → 3点还在刷手机', en: 'Goodnight at 11 → still scrolling at 3am' },
  'meme.cookingfail.name': { zh: '跟着教程做菜', en: 'Cooking Tutorial' },
  'meme.cookingfail.desc': { zh: '信心满满 → 厨房变战场', en: 'Full confidence → kitchen disaster' },
  'meme.onlinevsreal.name': { zh: '买家秀 vs 卖家秀', en: 'Order vs Reality' },
  'meme.onlinevsreal.desc': { zh: '广告里的汉堡 → 到手的汉堡', en: 'Ad burger → what I actually got' },
  'meme.rainnumbrella.name': { zh: '出门没带伞', en: 'No Umbrella' },
  'meme.rainnumbrella.desc': { zh: '大晴天出门 → 暴雨淋成狗', en: 'Sunny morning → caught in storm' },
  'meme.fridgestare.name': { zh: '打开冰箱发呆', en: 'Fridge Stare' },
  'meme.fridgestare.desc': { zh: '满怀期待 → 空空如也', en: 'Hopeful → existential void' },
  'meme.tangledearphones.name': { zh: '耳机线之谜', en: 'Tangled Earphones' },
  'meme.tangledearphones.desc': { zh: '整齐放进口袋 → 取出来打了死结', en: 'Neatly pocketed → impossible knot' },

  // ── 社交 ──────────────────────────────────
  'meme.readnoreply.name': { zh: '已读不回', en: 'Read But No Reply' },
  'meme.readnoreply.desc': { zh: '焦急等回复 → 已读不回', en: 'Waiting → seen, no reply' },
  'meme.introvertparty.name': { zh: '社恐の派对', en: 'Introvert at Party' },
  'meme.introvertparty.desc': { zh: '派对尴尬 → 回家真香', en: 'Awkward party → home bliss' },
  'meme.groupphoto.name': { zh: '自以为很帅', en: 'Looking Good... NOT' },
  'meme.groupphoto.desc': { zh: '自信合照 → 看到成片', en: 'Confident pose → actual photo' },
  'meme.typingdelete.name': { zh: '打了一大段又删了', en: 'Type & Delete' },
  'meme.typingdelete.desc': { zh: '写了一篇小作文 → 最后发了个"好"', en: 'Long essay → sends "ok"' },
  'meme.voicemsg.name': { zh: '60秒语音', en: '60s Voice Message' },
  'meme.voicemsg.desc': { zh: '收到5分钟语音 → 回一个👍', en: '5min voice msg → replies with 👍' },
  'meme.planscancelled.name': { zh: '约会取消了', en: 'Plans Cancelled' },
  'meme.planscancelled.desc': { zh: '假装遗憾 → 内心狂喜', en: 'Fake sad → secretly celebrating' },
  'meme.laughwrongtime.name': { zh: '不合时宜的笑', en: 'Wrong Time to Laugh' },
  'meme.laughwrongtime.desc': { zh: '严肃场合想起好笑的事 → 憋不住了', en: 'Serious moment → can\'t stop laughing' },

  // ── 技术 ──────────────────────────────────
  'meme.onemorebug.name': { zh: '修了一个Bug', en: 'Fixed One Bug' },
  'meme.onemorebug.desc': { zh: '修好一个 → 冒出99个', en: 'Fixed 1 → 99 new bugs' },
  'meme.stackoverflow.name': { zh: '高级开发者', en: 'Senior Developer' },
  'meme.stackoverflow.desc': { zh: '大佬气场 → 偷偷复制粘贴', en: 'Pro aura → copy from SO' },
  'meme.gitforcepush.name': { zh: 'git push --force', en: 'Git Force Push' },
  'meme.gitforcepush.desc': { zh: '随手一推 → 全组炸了', en: 'Casual push → team in chaos' },
  'meme.worksonmymachine.name': { zh: '在我电脑上是好的', en: 'Works On My Machine' },
  'meme.worksonmymachine.desc': { zh: '本地完美 → 线上着火', en: 'Local: perfect → prod: on fire' },
  'meme.darkmode.name': { zh: '暗黑模式信仰', en: 'Dark Mode Life' },
  'meme.darkmode.desc': { zh: '深夜暗黑模式 → 突然白屏闪瞎', en: 'Dark mode bliss → white page blinds' },
  'meme.nocomments.name': { zh: '我的代码会说话', en: 'Self-Documenting Code' },
  'meme.nocomments.desc': { zh: '不写注释 → 3个月后看不懂', en: 'No comments needed → WTF is this' },
};

function detectLocale(): Locale {
  const override = localStorage.getItem('mm_locale');
  if (override === 'en' || override === 'zh') return override;
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

let currentLocale: Locale = detectLocale();

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: string, vars?: { n?: number | string }): string {
  const entry = MESSAGES[key];
  let str = entry?.[currentLocale] ?? entry?.['en'] ?? key;
  if (vars?.n !== undefined) {
    str = str.replace('{n}', String(vars.n));
  }
  return str;
}

export function useLocale() {
  const setLocale = (l: Locale) => {
    currentLocale = l;
    localStorage.setItem('mm_locale', l);
  };
  return { t, locale: currentLocale, setLocale };
}
