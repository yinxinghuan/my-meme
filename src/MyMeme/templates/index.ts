import type { MemeStyle } from '../types';

// Preview images (existing 12)
import prevOvertime from '../img/previews/overtime.png';
import prevMeetingMute from '../img/previews/meeting_mute.png';
import prevSalaryDay from '../img/previews/salary_day.png';
import prevMondayFriday from '../img/previews/monday_friday.png';
import prevWifiDown from '../img/previews/wifi_down.png';
import prevAlarmSnooze from '../img/previews/alarm_snooze.png';
import prevDiet from '../img/previews/diet.png';
import prevReadNoReply from '../img/previews/read_no_reply.png';
import prevIntrovertParty from '../img/previews/introvert_party.png';
import prevGroupPhoto from '../img/previews/group_photo.png';
import prevOneMoreBug from '../img/previews/one_more_bug.png';
import prevStackoverflow from '../img/previews/stackoverflow.png';

export const CHARACTER_PROMPTS: Record<string, string> = {
  crisvelita: 'cute ghost girl with light blue translucent ghost cloak, black twin tails with red bows, big round black-frame glasses, red blush cheeks, 3D Pixar style',
  algram: 'young Asian boy with brown spiky hair, beige jacket over teal hoodie, guitar on back, anime style',
  jenny: 'girl with brown short hair, black round glasses, green eyes, purple hoodie, anime style',
  jmf: 'Asian man 30+, side-parted black hair, light stubble, black round glasses, black bomber jacket over white shirt, anime style',
  ghostpixel: 'white sheet ghost character, two big black oval eyes, semi-transparent, cute cartoon style',
  isaya: 'young girl with long straight blue hair, pale skin, blue-grey eyes, black oversized hoodie, black headphones on head, black cat companion, anime style',
  isabel: 'woman with silver-grey wavy medium hair, olive skin, elegant earrings, black dress with pink floral pattern, cool confident expression, comic illustration style',
};

const C2 = 'two-panel comic strip, manga style, expressive character, comic panel borders, clean line art, all text in English only, no Chinese Japanese Korean characters, ';

export const MEME_STYLES: MemeStyle[] = [
  // ── 热门时事 / 潮流（排最前面）─────────────────

  {
    id: 'ai-replace-me',
    nameKey: 'meme.aireplaceme.name', descKey: 'meme.aireplaceme.desc',
    category: 'tech',
    promptTemplate: C2 +
      'left panel: {character} laughing at news headline AI WILL REPLACE YOUR JOB, confident smug face, arms crossed, ' +
      'right panel: {character} watching AI chatbot doing their exact job perfectly on screen, sweating, existential crisis face, jaw dropped',
  },
  {
    id: 'ai-art',
    nameKey: 'meme.aiart.name', descKey: 'meme.aiart.desc',
    category: 'tech',
    promptTemplate: C2 +
      'left panel: {character} spending 6 hours carefully drawing art by hand, proud artist, detailed work, ' +
      'right panel: {character} watching someone generate similar art with AI in 5 seconds, mouth open, pencil drops from hand, devastated',
  },
  {
    id: 'chatgpt-homework',
    nameKey: 'meme.chatgpthomework.name', descKey: 'meme.chatgpthomework.desc',
    category: 'tech',
    promptTemplate: C2 +
      'left panel: {character} asking AI chatbot to write essay, lazy relaxed pose, easy life, ' +
      'right panel: {character} panicking as teacher says THIS SOUNDS LIKE AI, face turning pale, sweating bullets, caught red-handed',
  },
  {
    id: 'short-video-trap',
    nameKey: 'meme.shortvideotrap.name', descKey: 'meme.shortvideotrap.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} saying I will just watch one short video, holding phone, clock shows 10pm, ' +
      'right panel: {character} still scrolling with glazed zombie eyes, clock shows 4am, messy hair, dark room, phone glowing on face',
  },
  {
    id: 'rto-mandate',
    nameKey: 'meme.rtomandate.name', descKey: 'meme.rtomandate.desc',
    category: 'work',
    promptTemplate: C2 +
      'left panel: {character} working from home in pajamas on couch with laptop, cat on lap, coffee, paradise, ' +
      'right panel: {character} receiving email RETURN TO OFFICE MANDATORY on phone, pajama paradise crumbling, dramatic scream to sky',
  },
  {
    id: 'subscription-trap',
    nameKey: 'meme.subscriptiontrap.name', descKey: 'meme.subscriptiontrap.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} happily signing up for FREE TRIAL, excited face, clicking button, ' +
      'right panel: {character} 3 months later discovering they have been charged for 47 different subscriptions, checking bank statement in horror, money flying away',
  },
  {
    id: 'influencer-vs-real',
    nameKey: 'meme.influencervsreal.name', descKey: 'meme.influencervsreal.desc',
    category: 'social',
    promptTemplate: C2 +
      'left panel labeled INSTAGRAM: {character} posing perfectly with latte at trendy cafe, filters, aesthetic, perfect lighting, influencer vibes, ' +
      'right panel labeled REALITY: {character} surrounded by 50 failed photo attempts, cold coffee, annoyed people waiting behind, mess everywhere',
  },
  {
    id: 'gas-prices',
    nameKey: 'meme.gasprices.name', descKey: 'meme.gasprices.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} pulling up to gas station confidently with car, checking wallet, ' +
      'right panel: {character} seeing the gas price on pump, eyes popping out, fainting, wallet crying, price shows absurd number',
  },
  {
    id: 'crypto-roller',
    nameKey: 'meme.cryptoroller.name', descKey: 'meme.cryptoroller.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} checking crypto portfolio going UP, sunglasses, champagne, rich vibes, green chart arrow pointing up, ' +
      'right panel: 5 minutes later {character} checking same portfolio crashed DOWN, everything red, crying into hands, chart arrow pointing straight down',
  },
  {
    id: 'dating-app-expect',
    nameKey: 'meme.datingapp.name', descKey: 'meme.datingapp.desc',
    category: 'social',
    promptTemplate: C2 +
      'left panel labeled PROFILE PIC: gorgeous perfect photo of {character} with great lighting angles filters, model vibes, ' +
      'right panel labeled VIDEO CALL: same {character} in terrible lighting, messy room visible, bed head, completely different person, awkward wave',
  },

  // ── 有预览图的 12 个 ─────────────────────────
  {
    id: 'overtime', nameKey: 'meme.overtime.name', descKey: 'meme.overtime.desc',
    category: 'work', preview: prevOvertime,
    promptTemplate: C2 +
      'left panel: {character} happily packing bag to leave office, cheerful expression, clock showing 6pm, ' +
      'right panel: {character} frozen in shock as boss appears at door saying one more thing, devastated face',
  },
  {
    id: 'meeting-mute', nameKey: 'meme.meetingmute.name', descKey: 'meme.meetingmute.desc',
    category: 'work', preview: prevMeetingMute,
    promptTemplate: C2 +
      'left panel: {character} confidently talking trash about the meeting while on video call, relaxed cocky expression, ' +
      'right panel: {character} suddenly horrified realizing microphone was NOT on mute, sweat drops, panic face',
  },
  {
    id: 'salary-day', nameKey: 'meme.salaryday.name', descKey: 'meme.salaryday.desc',
    category: 'work', preview: prevSalaryDay,
    promptTemplate: C2 +
      'left panel: {character} extremely excited checking phone, money signs in eyes, PAYDAY text, jumping with joy, ' +
      'right panel: {character} crying looking at phone after paying rent and bills, empty wallet, soul leaving body',
  },
  {
    id: 'monday-friday', nameKey: 'meme.mondayfriday.name', descKey: 'meme.mondayfriday.desc',
    category: 'daily', preview: prevMondayFriday,
    promptTemplate: C2 +
      'left panel labeled MONDAY: {character} looking exhausted dead inside, dark bags under eyes, zombie mode, ' +
      'right panel labeled FRIDAY: {character} bursting with energy, partying, sparkling eyes, dancing happily',
  },
  {
    id: 'wifi-down', nameKey: 'meme.wifidown.name', descKey: 'meme.wifidown.desc',
    category: 'daily', preview: prevWifiDown,
    promptTemplate: C2 +
      'left panel: {character} calmly browsing phone on couch, peaceful relaxed face, wifi signal icon, ' +
      'right panel: {character} in absolute panic mode, wifi icon with X, dramatic screaming, world is ending',
  },
  {
    id: 'alarm-snooze', nameKey: 'meme.alarmsnooze.name', descKey: 'meme.alarmsnooze.desc',
    category: 'daily', preview: prevAlarmSnooze,
    promptTemplate: C2 +
      'left panel: {character} in bed at night saying I will wake up early tomorrow with determined confident face, ' +
      'right panel: {character} violently smashing alarm clock at 7am, angry sleepy face, refusing to get up',
  },
  {
    id: 'diet', nameKey: 'meme.diet.name', descKey: 'meme.diet.desc',
    category: 'daily', preview: prevDiet,
    promptTemplate: C2 +
      'left panel: {character} standing proudly with healthy salad, determined face, diet today, glowing aura, ' +
      'right panel: {character} at midnight eating huge pizza and cake, guilty but happy face, food everywhere',
  },
  {
    id: 'read-no-reply', nameKey: 'meme.readnoreply.name', descKey: 'meme.readnoreply.desc',
    category: 'social', preview: prevReadNoReply,
    promptTemplate: C2 +
      'left panel: {character} anxiously staring at phone waiting for reply, nervous sweating, ' +
      'right panel: {character} seeing read status but no reply, soul leaving body, dramatic despair',
  },
  {
    id: 'introvert-party', nameKey: 'meme.introvertparty.name', descKey: 'meme.introvertparty.desc',
    category: 'social', preview: prevIntrovertParty,
    promptTemplate: C2 +
      'left panel: {character} at crowded party looking extremely uncomfortable, awkward smile, sweating, ' +
      'right panel: {character} at home alone with snacks and phone, absolute bliss, peaceful happy face, cozy blanket',
  },
  {
    id: 'group-photo', nameKey: 'meme.groupphoto.name', descKey: 'meme.groupphoto.desc',
    category: 'social', preview: prevGroupPhoto,
    promptTemplate: C2 +
      'left panel: {character} posing confidently for group photo, thinking I look great, cool pose, ' +
      'right panel: {character} seeing the actual photo result, horrified face, looking terrible in the photo',
  },
  {
    id: 'one-more-bug', nameKey: 'meme.onemorebug.name', descKey: 'meme.onemorebug.desc',
    category: 'tech', preview: prevOneMoreBug,
    promptTemplate: C2 +
      'left panel: {character} celebrating fixing a bug on computer, victorious fist pump, confetti, ' +
      'right panel: {character} staring at screen in horror as 99 new bugs appeared, code errors, dead inside',
  },
  {
    id: 'stackoverflow', nameKey: 'meme.stackoverflow.name', descKey: 'meme.stackoverflow.desc',
    category: 'tech', preview: prevStackoverflow,
    promptTemplate: C2 +
      'left panel: {character} as wise experienced developer confidently typing code, cool hacker aura, ' +
      'right panel: {character} secretly copy-pasting from stackoverflow, nervous guilty look, sweating',
  },

  // ── 新增模板（暂无预览图）──────────────────────

  // 职场
  {
    id: 'email-typo', nameKey: 'meme.emailtypo.name', descKey: 'meme.emailtypo.desc',
    category: 'work',
    promptTemplate: C2 +
      'left panel: {character} proudly hitting send on important email, confident smile, sparkling, ' +
      'right panel: {character} noticing a terrible typo one second after sending, face turning white, reaching for screen desperately',
  },
  {
    id: 'fake-busy', nameKey: 'meme.fakebusy.name', descKey: 'meme.fakebusy.desc',
    category: 'work',
    promptTemplate: C2 +
      'left panel: {character} pretending to type furiously when boss walks by, serious concentrated face, screen shows spreadsheet, ' +
      'right panel: wide shot revealing the screen actually shows online shopping website, sneaky guilty expression',
  },
  {
    id: 'reply-all', nameKey: 'meme.replyall.name', descKey: 'meme.replyall.desc',
    category: 'work',
    promptTemplate: C2 +
      'left panel: {character} casually writing a sarcastic reply to colleague email, smirking, relaxed, ' +
      'right panel: {character} in absolute horror realizing they hit REPLY ALL to the entire company, 500 recipients, soul leaving body',
  },

  // 日常
  {
    id: 'bed-phone', nameKey: 'meme.bedphone.name', descKey: 'meme.bedphone.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} getting into bed yawning, saying goodnight, clock shows 11pm, cozy, ' +
      'right panel: {character} still scrolling phone in bed with zombie eyes, clock shows 3am, dark room lit by phone screen',
  },
  {
    id: 'cooking-fail', nameKey: 'meme.cookingfail.name', descKey: 'meme.cookingfail.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} watching cooking tutorial on phone, confident face, chef hat, ingredients ready, ' +
      'right panel: {character} standing in smoke-filled kitchen, burnt food, fire alarm going off, total disaster, crying',
  },
  {
    id: 'online-vs-reality', nameKey: 'meme.onlinevsreal.name', descKey: 'meme.onlinevsreal.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel labeled ONLINE ORDER: beautiful perfect burger in advertisement, glowing, appetizing, ' +
      'right panel labeled WHAT I GOT: {character} holding a sad flat squished burger, disappointed confused face, comparing to phone screen',
  },
  {
    id: 'rain-no-umbrella', nameKey: 'meme.rainnumbrella.name', descKey: 'meme.rainnumbrella.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} leaving house in morning, sunny sky, ignoring umbrella on the shelf, ' +
      'right panel: {character} standing in massive rainstorm completely soaked, staring at sky with dead expression, the umbrella visible at home through window',
  },
  {
    id: 'fridge-stare', nameKey: 'meme.fridgestare.name', descKey: 'meme.fridgestare.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} opening fridge hopefully, stomach growling, excited expression, ' +
      'right panel: {character} staring into completely empty fridge, tumbleweed rolling by, existential crisis face, same fridge',
  },
  {
    id: 'tangled-earphones', nameKey: 'meme.tangledearphones.name', descKey: 'meme.tangledearphones.desc',
    category: 'daily',
    promptTemplate: C2 +
      'left panel: {character} carefully putting earphone cable in pocket neatly, organized, satisfied, ' +
      'right panel: {character} pulling out an impossibly tangled mess of earphone cable from pocket, confused angry face, cable looks like spaghetti',
  },

  // 社交
  {
    id: 'typing-delete', nameKey: 'meme.typingdelete.name', descKey: 'meme.typingdelete.desc',
    category: 'social',
    promptTemplate: C2 +
      'left panel: {character} typing a long passionate message to crush, nervous but brave, paragraphs of text on screen, ' +
      'right panel: {character} deleting everything and just sending "ok", defeated coward face, trash bin full of drafted messages',
  },
  {
    id: 'voice-msg', nameKey: 'meme.voicemsg.name', descKey: 'meme.voicemsg.desc',
    category: 'social',
    promptTemplate: C2 +
      'left panel: {character} receiving a 5 minute voice message from friend, staring at phone in disbelief, ' +
      'right panel: {character} sending back a simple thumbs up emoji, zero effort, lazy satisfied face',
  },
  {
    id: 'plans-cancelled', nameKey: 'meme.planscancelled.name', descKey: 'meme.planscancelled.desc',
    category: 'social',
    promptTemplate: C2 +
      'left panel: {character} pretending to be disappointed that plans got cancelled, fake sad face, hand on chest, ' +
      'right panel: {character} secretly celebrating alone at home, jumping for joy, pajamas on, snacks ready, pure happiness',
  },
  {
    id: 'laugh-wrong-time', nameKey: 'meme.laughwrongtime.name', descKey: 'meme.laughwrongtime.desc',
    category: 'social',
    promptTemplate: C2 +
      'left panel: {character} remembering something funny during a serious meeting/funeral, trying desperately to hold laughter, face turning red, ' +
      'right panel: {character} bursting out laughing uncontrollably, everyone staring in shock and disapproval, mortified',
  },

  // 技术
  {
    id: 'git-force-push', nameKey: 'meme.gitforcepush.name', descKey: 'meme.gitforcepush.desc',
    category: 'tech',
    promptTemplate: C2 +
      'left panel: {character} casually typing git push --force, cool confident expression, no big deal, ' +
      'right panel: {character} watching the entire team scramble in panic, broken code everywhere, chaos, regret face',
  },
  {
    id: 'works-on-my-machine', nameKey: 'meme.worksonmymachine.name', descKey: 'meme.worksonmymachine.desc',
    category: 'tech',
    promptTemplate: C2 +
      'left panel: {character} shrugging and saying works on my machine with smug confident expression, laptop showing green checkmarks, ' +
      'right panel: production server room on fire, explosions, error 500 everywhere, {character} whistling and walking away pretending not to see',
  },
  {
    id: 'dark-mode', nameKey: 'meme.darkmode.name', descKey: 'meme.darkmode.desc',
    category: 'tech',
    promptTemplate: C2 +
      'left panel: {character} coding happily in dark mode in dark room, cool hacker vibes, green terminal text, night owl, ' +
      'right panel: {character} accidentally opening a white background website, blinding white light exploding from screen, eyes burning, dramatic pain',
  },
  {
    id: 'no-comments', nameKey: 'meme.nocomments.name', descKey: 'meme.nocomments.desc',
    category: 'tech',
    promptTemplate: C2 +
      'left panel: {character} writing code confidently saying my code is self-documenting, proud expression, ' +
      'right panel: same {character} 3 months later staring at own code with zero understanding, confused, who wrote this garbage face',
  },
];
