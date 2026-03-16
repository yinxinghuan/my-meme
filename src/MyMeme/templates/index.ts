import type { MemeStyle } from '../types';

// Trending previews
import prevAiReplaceMe from '../img/previews/ai_replace_me.png';
import prevAiArt from '../img/previews/ai_art.png';
import prevChatgptHomework from '../img/previews/chatgpt_homework.png';
import prevShortVideoTrap from '../img/previews/short_video_trap.png';
import prevRtoMandate from '../img/previews/rto_mandate.png';
import prevSubscriptionTrap from '../img/previews/subscription_trap.png';
import prevInfluencerVsReal from '../img/previews/influencer_vs_real.png';
import prevGasPrices from '../img/previews/gas_prices.png';
import prevCryptoRoller from '../img/previews/crypto_roller.png';
import prevDatingApp from '../img/previews/dating_app.png';

// Original 12 previews
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
  crisvelita: 'cute ghost girl with light blue translucent ghost cloak, black twin tails with red bows, big round black-frame glasses, red blush cheeks',
  algram: 'young boy with brown spiky hair, beige jacket over teal hoodie, guitar on back',
  jenny: 'girl with brown short hair, black round glasses, green eyes, purple hoodie',
  jmf: 'man 30+, side-parted black hair, light stubble, black round glasses, black bomber jacket over white shirt',
  ghostpixel: 'white sheet ghost character, two big black oval eyes, semi-transparent, cute',
  isaya: 'young girl with long straight blue hair, pale skin, blue-grey eyes, black oversized hoodie, black headphones on head',
  isabel: 'woman with silver-grey wavy medium hair, olive skin, elegant earrings, black dress with pink floral pattern',
};

const S = 'two-panel comic, bold clean illustration style, thick outlines, flat colors, expressive faces, western comic book style, panel borders, all text in English, no Chinese Japanese Korean characters, ';

// Helper to build prompt template with {scene1}/{scene2} placeholders
const T = (scene1Prompt: string, scene2Prompt: string) =>
  S + `left panel: {character} ${scene1Prompt}, right panel: {character} ${scene2Prompt}`;

export const MEME_STYLES: MemeStyle[] = [
  // ── HOT / TRENDING ────────────────────────
  {
    id: 'ai-replace-me', nameKey: 'meme.aireplaceme.name', descKey: 'meme.aireplaceme.desc', category: 'tech', preview: prevAiReplaceMe,
    defaultScene1: 'laughing smugly at headline AI WILL REPLACE JOBS',
    defaultScene2: 'jaw on floor watching robot doing their job perfectly',
    promptTemplate: T('{scene1}, arms crossed, speech bubble yeah right', '{scene2}, sweat pouring, speech bubble wait...'),
  },
  {
    id: 'ai-art', nameKey: 'meme.aiart.name', descKey: 'meme.aiart.desc', category: 'tech', preview: prevAiArt,
    defaultScene1: 'exhausted after 6 hours of hand-drawing, proudly holding artwork',
    defaultScene2: 'watching someone generate identical art with AI in 5 seconds',
    promptTemplate: T('{scene1}, surrounded by art supplies and coffee cups, text 6 HOURS', '{scene2}, pencil snaps in hand, text 5 SECONDS'),
  },
  {
    id: 'chatgpt-homework', nameKey: 'meme.chatgpthomework.name', descKey: 'meme.chatgpthomework.desc', category: 'tech', preview: prevChatgptHomework,
    defaultScene1: 'feet on desk, smugly dictating homework to AI chatbot',
    defaultScene2: 'sweating as stern teacher holds paper saying THIS IS AI WRITTEN',
    promptTemplate: T('{scene1}, easy life, speech bubble write my essay', '{scene2}, face turning ghost white'),
  },
  {
    id: 'short-video-trap', nameKey: 'meme.shortvideotrap.name', descKey: 'meme.shortvideotrap.desc', category: 'daily', preview: prevShortVideoTrap,
    defaultScene1: 'in bed holding phone, speech bubble just one more video',
    defaultScene2: 'still scrolling with bloodshot zombie eyes, clock shows 4 AM',
    promptTemplate: T('{scene1}, clock shows 10 PM, confident face', '{scene2}, room completely dark, drool'),
  },
  {
    id: 'rto-mandate', nameKey: 'meme.rtomandate.name', descKey: 'meme.rtomandate.desc', category: 'work', preview: prevRtoMandate,
    defaultScene1: 'in pajamas working from couch, cat on laptop, coffee',
    defaultScene2: 'reading email RETURN TO OFFICE IMMEDIATELY, dramatic scream',
    promptTemplate: T('{scene1}, angels singing, text WFH PARADISE', '{scene2}, pajamas falling off, lightning'),
  },
  {
    id: 'subscription-trap', nameKey: 'meme.subscriptiontrap.name', descKey: 'meme.subscriptiontrap.desc', category: 'daily', preview: prevSubscriptionTrap,
    defaultScene1: 'happily clicking FREE TRIAL button, excited, sparkles',
    defaultScene2: 'opening bank statement showing 47 subscriptions totaling $847/month',
    promptTemplate: T('{scene1}, speech bubble no risk!', '{scene2}, eyes popping out, money flying away'),
  },
  {
    id: 'influencer-vs-real', nameKey: 'meme.influencervsreal.name', descKey: 'meme.influencervsreal.desc', category: 'social', preview: prevInfluencerVsReal,
    defaultScene1: 'perfect pose, golden hour lighting, artisan latte, aesthetic cafe',
    defaultScene2: 'with 50 failed selfies on floor, cold coffee, mascara smudged',
    promptTemplate: S + 'left panel labeled INSTAGRAM: {character} {scene1}, gorgeous, filters, right panel labeled REALITY: {character} {scene2}, annoyed waiter, mess',
  },
  {
    id: 'gas-prices', nameKey: 'meme.gasprices.name', descKey: 'meme.gasprices.desc', category: 'daily', preview: prevGasPrices,
    defaultScene1: 'confidently driving up to gas station, wallet ready',
    defaultScene2: 'fainting at gas pump seeing absurd price, wallet crying',
    promptTemplate: T('{scene1}, car fuel gauge on empty', '{scene2}, soul leaving body'),
  },
  {
    id: 'crypto-roller', nameKey: 'meme.cryptoroller.name', descKey: 'meme.cryptoroller.desc', category: 'daily', preview: prevCryptoRoller,
    defaultScene1: 'in sunglasses popping champagne, crypto chart going UP',
    defaultScene2: '5 minutes later crying, chart crashed DOWN in red',
    promptTemplate: T('{scene1}, money raining, text TO THE MOON', '{scene2}, everything on fire, text TO THE FLOOR'),
  },
  {
    id: 'dating-app-expect', nameKey: 'meme.datingapp.name', descKey: 'meme.datingapp.desc', category: 'social', preview: prevDatingApp,
    defaultScene1: 'looking gorgeous, studio lighting, perfect angle, model vibes',
    defaultScene2: 'terrible webcam lighting, bed head, totally different person',
    promptTemplate: S + 'left panel labeled PROFILE PIC: {character} {scene1}, 10/10, right panel labeled VIDEO CALL: {character} {scene2}, messy room, awkward wave',
  },

  // ── WORK ──────────────────────────────────
  {
    id: 'overtime', nameKey: 'meme.overtime.name', descKey: 'meme.overtime.desc', category: 'work', preview: prevOvertime,
    defaultScene1: 'happily packing bag, clock showing 6PM, one foot out the door',
    defaultScene2: 'frozen mid-step as boss blocks doorway with evil grin',
    promptTemplate: T('{scene1}, freedom', '{scene2}, color drains from face, speech bubble got a minute?'),
  },
  {
    id: 'meeting-mute', nameKey: 'meme.meetingmute.name', descKey: 'meme.meetingmute.desc', category: 'work', preview: prevMeetingMute,
    defaultScene1: 'lounging on video call, ranting about boring meeting',
    defaultScene2: 'horrified noticing the MUTE button is OFF, 40 coworkers staring',
    promptTemplate: T('{scene1}, eye-rolling', '{scene2}, mic icon glowing red, cold sweat waterfall'),
  },
  {
    id: 'salary-day', nameKey: 'meme.salaryday.name', descKey: 'meme.salaryday.desc', category: 'work', preview: prevSalaryDay,
    defaultScene1: 'checking phone SALARY RECEIVED, jumping for joy, money eyes',
    defaultScene2: 'after paying rent and bills, bank shows $3.47, eating noodles',
    promptTemplate: T('{scene1}, raining cash', '{scene2}, dead inside'),
  },
  {
    id: 'email-typo', nameKey: 'meme.emailtypo.name', descKey: 'meme.emailtypo.desc', category: 'work',
    defaultScene1: 'triumphantly pressing SEND on important email to CEO',
    defaultScene2: 'spotting horrific typo 0.5 seconds after send',
    promptTemplate: T('{scene1}, confident smile, job well done', '{scene2}, reaching through screen, face melting in horror'),
  },
  {
    id: 'fake-busy', nameKey: 'meme.fakebusy.name', descKey: 'meme.fakebusy.desc', category: 'work',
    defaultScene1: 'typing furiously with serious face as boss walks past',
    defaultScene2: 'screen actually showing online shopping cart with 47 items',
    promptTemplate: T('{scene1}, spreadsheet on screen, employee of the month vibes', '{scene2}, sneaky guilty grin'),
  },
  {
    id: 'reply-all', nameKey: 'meme.replyall.name', descKey: 'meme.replyall.desc', category: 'work',
    defaultScene1: 'smirking while typing sarcastic roast about annoying coworker',
    defaultScene2: 'realizing they pressed REPLY ALL to 500 people',
    promptTemplate: T('{scene1}, feeling clever, evil grin', '{scene2}, face turning to skeleton, soul leaving body'),
  },

  // ── DAILY LIFE ────────────────────────────
  {
    id: 'monday-friday', nameKey: 'meme.mondayfriday.name', descKey: 'meme.mondayfriday.desc', category: 'daily', preview: prevMondayFriday,
    defaultScene1: 'as zombie, dark eye bags, dragging body through office door',
    defaultScene2: 'in party mode, sunglasses, dancing on desk, confetti',
    promptTemplate: S + 'left panel labeled MONDAY: {character} {scene1}, grey depressing, coffee IV drip, right panel labeled FRIDAY: {character} {scene2}, disco ball, maximum energy',
  },
  {
    id: 'wifi-down', nameKey: 'meme.wifidown.name', descKey: 'meme.wifidown.desc', category: 'daily', preview: prevWifiDown,
    defaultScene1: 'peacefully scrolling phone on couch, wifi bars full',
    defaultScene2: 'screaming like world is ending, flipping furniture',
    promptTemplate: T('{scene1}, serene paradise, birds singing', '{scene2}, wifi icon X, apocalyptic chaos'),
  },
  {
    id: 'alarm-snooze', nameKey: 'meme.alarmsnooze.name', descKey: 'meme.alarmsnooze.desc', category: 'daily', preview: prevAlarmSnooze,
    defaultScene1: 'in bed at night, fist raised, speech bubble WAKING UP AT 6AM',
    defaultScene2: 'at 6AM violently smashing alarm clock, 5 MORE MINUTES',
    promptTemplate: T('{scene1}, heroic aura', '{scene2}, rage face, sledgehammer'),
  },
  {
    id: 'diet', nameKey: 'meme.diet.name', descKey: 'meme.diet.desc', category: 'daily', preview: prevDiet,
    defaultScene1: 'in workout gear holding tiny salad, halo above head',
    defaultScene2: 'surrounded by pizza, ice cream, chips, guilty face',
    promptTemplate: T('{scene1}, text DIET DAY 1, virtuous glow', '{scene2}, text DIET DAY 1 NIGHT, sauce smeared'),
  },
  {
    id: 'bed-phone', nameKey: 'meme.bedphone.name', descKey: 'meme.bedphone.desc', category: 'daily',
    defaultScene1: 'tucked in bed yawning, speech bubble goodnight!',
    defaultScene2: 'wide awake, phone glow in pitch dark, clock 3:47 AM',
    promptTemplate: T('{scene1}, clock shows 11 PM, cozy', '{scene2}, zombie eyes, scroll scroll scroll'),
  },
  {
    id: 'cooking-fail', nameKey: 'meme.cookingfail.name', descKey: 'meme.cookingfail.desc', category: 'daily',
    defaultScene1: 'in chef hat watching cooking tutorial, ingredients ready',
    defaultScene2: 'kitchen destroyed, smoke alarm, pan on fire, covered in flour',
    promptTemplate: T('{scene1}, confident thumbs up, text easy!', '{scene2}, burnt black mess, 911 dialing'),
  },
  {
    id: 'online-vs-reality', nameKey: 'meme.onlinevsreal.name', descKey: 'meme.onlinevsreal.desc', category: 'daily',
    defaultScene1: 'beautiful perfect gourmet burger, studio lighting',
    defaultScene2: 'holding sad flat squished pathetic burger, disappointed',
    promptTemplate: S + 'left panel labeled ONLINE ORDER: {scene1}, magazine worthy, right panel labeled WHAT ARRIVED: {character} {scene2}, completely different, side-by-side comparison',
  },
  {
    id: 'fridge-stare', nameKey: 'meme.fridgestare.name', descKey: 'meme.fridgestare.desc', category: 'daily',
    defaultScene1: 'opening fridge door with hope, stomach growling',
    defaultScene2: 'staring into completely empty fridge, existential void',
    promptTemplate: T('{scene1}, speech bubble what do we have!', '{scene2}, one old condiment bottle, tumbleweed rolls past'),
  },

  // ── SOCIAL ────────────────────────────────
  {
    id: 'read-no-reply', nameKey: 'meme.readnoreply.name', descKey: 'meme.readnoreply.desc', category: 'social', preview: prevReadNoReply,
    defaultScene1: 'staring at phone anxiously, biting nails, please reply',
    defaultScene2: 'seeing Read 3:42 PM with no reply, soul leaving body',
    promptTemplate: T('{scene1}, refreshing conversation', '{scene2}, devastation, betrayal'),
  },
  {
    id: 'introvert-party', nameKey: 'meme.introvertparty.name', descKey: 'meme.introvertparty.desc', category: 'social', preview: prevIntrovertParty,
    defaultScene1: 'at crowded party, forced awkward smile, thought bubble help me',
    defaultScene2: 'at home in blanket burrito with snacks, pure euphoria',
    promptTemplate: T('{scene1}, surrounded by strangers, sweating', '{scene2}, heavenly light, text HOME SWEET HOME'),
  },
  {
    id: 'group-photo', nameKey: 'meme.groupphoto.name', descKey: 'meme.groupphoto.desc', category: 'social', preview: prevGroupPhoto,
    defaultScene1: 'striking confident cool pose, thought bubble I look amazing',
    defaultScene2: 'the actual photo: looking terrible, eyes half closed',
    promptTemplate: T('{scene1}, duck face, peace sign', '{scene2}, mouth weird, everyone else looks great'),
  },
  {
    id: 'typing-delete', nameKey: 'meme.typingdelete.name', descKey: 'meme.typingdelete.desc', category: 'social',
    defaultScene1: 'typing passionate 500-word message, intense focused face',
    defaultScene2: 'deleting everything and just sending ok, coward face',
    promptTemplate: T('{scene1}, phone screen full of text, heart pounding', '{scene2}, trash can overflowing with drafts, sigh'),
  },
  {
    id: 'plans-cancelled', nameKey: 'meme.planscancelled.name', descKey: 'meme.planscancelled.desc', category: 'social',
    defaultScene1: 'receiving sorry cant make it text, fake sad face',
    defaultScene2: 'instantly in pajamas doing victory dance, pizza ordered',
    promptTemplate: T('{scene1}, hand on heart, speech bubble oh noooo, acting', '{scene2}, Netflix on, pure evil joy, text FREEDOM'),
  },

  // ── TECH ──────────────────────────────────
  {
    id: 'one-more-bug', nameKey: 'meme.onemorebug.name', descKey: 'meme.onemorebug.desc', category: 'tech', preview: prevOneMoreBug,
    defaultScene1: 'victory pose at computer, text BUG FIXED!, champagne',
    defaultScene2: 'screen showing 99 NEW BUGS in red, face melting',
    promptTemplate: T('{scene1}, confetti, fist pump', '{scene2}, code on fire, everything on fire'),
  },
  {
    id: 'stackoverflow', nameKey: 'meme.stackoverflow.name', descKey: 'meme.stackoverflow.desc', category: 'tech', preview: prevStackoverflow,
    defaultScene1: 'typing with blazing speed, cool hacker sunglasses, elite aura',
    defaultScene2: 'nervously copy-pasting from StackOverflow, guilty sweating',
    promptTemplate: T('{scene1}, green code reflected in glasses, 10x developer', '{scene2}, looking over shoulder, tab shows stackoverflow.com'),
  },
  {
    id: 'git-force-push', nameKey: 'meme.gitforcepush.name', descKey: 'meme.gitforcepush.desc', category: 'tech',
    defaultScene1: 'casually pressing enter on git push --force, relaxed',
    defaultScene2: 'entire team in panic, servers exploding, code on fire',
    promptTemplate: T('{scene1}, coffee in hand, speech bubble its fine', '{scene2}, slowly backing toward exit door'),
  },
  {
    id: 'works-on-my-machine', nameKey: 'meme.worksonmymachine.name', descKey: 'meme.worksonmymachine.desc', category: 'tech',
    defaultScene1: 'shrugging at laptop showing green checkmarks, smug face',
    defaultScene2: 'production server room on fire, ERROR 500 everywhere',
    promptTemplate: T('{scene1}, speech bubble WORKS ON MY MACHINE', '{scene2}, tiptoeing away whistling'),
  },
  {
    id: 'dark-mode', nameKey: 'meme.darkmode.name', descKey: 'meme.darkmode.desc', category: 'tech',
    defaultScene1: 'coding in dark room, dark mode terminal, green text, night owl',
    defaultScene2: 'accidentally opening white background website, blinding light',
    promptTemplate: T('{scene1}, cool hacker aesthetic', '{scene2}, nuclear explosion of light from screen, eyes burning'),
  },
  {
    id: 'no-comments', nameKey: 'meme.nocomments.name', descKey: 'meme.nocomments.desc', category: 'tech',
    defaultScene1: 'proudly refusing to write code comments, nose in air',
    defaultScene2: '3 months later staring at own code with zero comprehension',
    promptTemplate: T('{scene1}, speech bubble my code is self-documenting', '{scene2}, speech bubble who wrote this garbage'),
  },
];
