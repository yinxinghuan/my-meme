import type { MemeStyle } from '../types';

// Preview images (will regenerate in new style later)
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

// Western illustration style — NOT manga/anime
const STYLE = 'two-panel comic, bold clean illustration style, thick outlines, flat colors, ' +
  'expressive faces, western comic book style, panel borders, ' +
  'all text in English, no Chinese Japanese Korean characters, ';

export const MEME_STYLES: MemeStyle[] = [
  // ── HOT / TRENDING ────────────────────────
  {
    id: 'ai-replace-me',
    nameKey: 'meme.aireplaceme.name', descKey: 'meme.aireplaceme.desc', category: 'tech',
    promptTemplate: STYLE +
      'left panel: {character} laughing smugly at newspaper headline AI WILL REPLACE JOBS, arms crossed, speech bubble "yeah right", ' +
      'right panel: {character} jaw on floor watching robot sitting at their desk doing their job perfectly, sweat pouring, speech bubble "wait..."',
  },
  {
    id: 'ai-art',
    nameKey: 'meme.aiart.name', descKey: 'meme.aiart.desc', category: 'tech',
    promptTemplate: STYLE +
      'left panel: {character} exhausted after 6 hours of hand-drawing, surrounded by art supplies and coffee cups, proudly holding artwork, "6 HOURS" text, ' +
      'right panel: someone clicking one button on laptop, identical art appears instantly, {character} staring in disbelief, pencil snaps in hand, "5 SECONDS" text',
  },
  {
    id: 'chatgpt-homework',
    nameKey: 'meme.chatgpthomework.name', descKey: 'meme.chatgpthomework.desc', category: 'tech',
    promptTemplate: STYLE +
      'left panel: {character} feet on desk, phone in hand, smugly dictating homework to AI chatbot, easy life, speech bubble "write my essay", ' +
      'right panel: {character} sweating bullets as stern teacher holds paper saying "THIS IS CLEARLY AI WRITTEN", face turning ghost white',
  },
  {
    id: 'short-video-trap',
    nameKey: 'meme.shortvideotrap.name', descKey: 'meme.shortvideotrap.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel: {character} in bed holding phone, clock shows 10 PM, speech bubble "just one more video then sleep", confident face, ' +
      'right panel: same {character} still scrolling with bloodshot zombie eyes glued to phone, clock shows 4 AM, room completely dark, drool',
  },
  {
    id: 'rto-mandate',
    nameKey: 'meme.rtomandate.name', descKey: 'meme.rtomandate.desc', category: 'work',
    promptTemplate: STYLE +
      'left panel: {character} in pajamas working from couch, cat sleeping on laptop, coffee in hand, angels singing, text "WFH PARADISE", ' +
      'right panel: {character} reading email on phone "RETURN TO OFFICE EFFECTIVE IMMEDIATELY", pajamas falling off, dramatic lightning, scream to sky',
  },
  {
    id: 'subscription-trap',
    nameKey: 'meme.subscriptiontrap.name', descKey: 'meme.subscriptiontrap.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel: {character} happily clicking FREE TRIAL button on screen, excited face, sparkles, speech bubble "no risk!", ' +
      'right panel: {character} opening bank statement showing 47 subscriptions totaling $847/month, eyes popping out of skull, money flying away',
  },
  {
    id: 'influencer-vs-real',
    nameKey: 'meme.influencervsreal.name', descKey: 'meme.influencervsreal.desc', category: 'social',
    promptTemplate: STYLE +
      'left panel labeled INSTAGRAM: {character} in perfect pose, golden hour lighting, artisan latte, aesthetic cafe, gorgeous, filters, ' +
      'right panel labeled REALITY: {character} with 50 failed selfies on floor, cold untouched coffee, annoyed waiter, mascara smudged, mess',
  },
  {
    id: 'gas-prices',
    nameKey: 'meme.gasprices.name', descKey: 'meme.gasprices.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel: {character} confidently driving up to gas station, wallet ready, car fuel gauge on empty, "time to fill up", ' +
      'right panel: {character} fainting at gas pump, price display shows absurd number, wallet literally crying cartoon tears, soul leaving body',
  },
  {
    id: 'crypto-roller',
    nameKey: 'meme.cryptoroller.name', descKey: 'meme.cryptoroller.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel: {character} in sunglasses popping champagne, crypto chart going straight UP on screen, money raining, text "TO THE MOON", ' +
      'right panel: 5 minutes later same {character} crying into hands, chart crashed straight DOWN in red, everything on fire, text "TO THE FLOOR"',
  },
  {
    id: 'dating-app-expect',
    nameKey: 'meme.datingapp.name', descKey: 'meme.datingapp.desc', category: 'social',
    promptTemplate: STYLE +
      'left panel labeled PROFILE PIC: {character} looking absolutely gorgeous, studio lighting, perfect angle, 10/10, model vibes, ' +
      'right panel labeled VIDEO CALL: same {character} in terrible webcam lighting, messy room behind, bed head, totally different person, awkward wave',
  },

  // ── WORK ──────────────────────────────────
  {
    id: 'overtime', nameKey: 'meme.overtime.name', descKey: 'meme.overtime.desc',
    category: 'work', preview: prevOvertime,
    promptTemplate: STYLE +
      'left panel: {character} happily packing bag, clock showing 6:00 PM sharp, coat on, one foot out the door, freedom, ' +
      'right panel: boss blocking doorway with evil grin, {character} frozen mid-step, color drains from face, speech bubble "got a minute?"',
  },
  {
    id: 'meeting-mute', nameKey: 'meme.meetingmute.name', descKey: 'meme.meetingmute.desc',
    category: 'work', preview: prevMeetingMute,
    promptTemplate: STYLE +
      'left panel: {character} lounging on video call, ranting about how boring this meeting is, eye-rolling, middle finger at screen, ' +
      'right panel: horrified face noticing the MUTE button is OFF, 40 coworker faces staring, mic icon glowing red, cold sweat waterfall',
  },
  {
    id: 'salary-day', nameKey: 'meme.salaryday.name', descKey: 'meme.salaryday.desc',
    category: 'work', preview: prevSalaryDay,
    promptTemplate: STYLE +
      'left panel: {character} checking phone notification SALARY RECEIVED, jumping for joy, money signs in eyes, raining cash, ' +
      'right panel: same {character} after paying rent + bills + subscriptions, bank shows $3.47, eating instant noodles, dead inside',
  },
  {
    id: 'email-typo', nameKey: 'meme.emailtypo.name', descKey: 'meme.emailtypo.desc', category: 'work',
    promptTemplate: STYLE +
      'left panel: {character} triumphantly pressing SEND on important email to CEO, confident smile, dusting hands off, job well done, ' +
      'right panel: {character} spotting horrific typo 0.5 seconds after send, reaching through screen trying to grab email back, face melting in horror',
  },
  {
    id: 'fake-busy', nameKey: 'meme.fakebusy.name', descKey: 'meme.fakebusy.desc', category: 'work',
    promptTemplate: STYLE +
      'left panel: boss walking past, {character} typing furiously with serious concentrated face, spreadsheet on screen, employee of the month vibes, ' +
      'right panel: zoomed in on {character} screen actually showing online shopping cart with 47 items, sneaky guilty grin',
  },
  {
    id: 'reply-all', nameKey: 'meme.replyall.name', descKey: 'meme.replyall.desc', category: 'work',
    promptTemplate: STYLE +
      'left panel: {character} smirking while typing sarcastic roast reply about annoying coworker, feeling clever, evil grin, ' +
      'right panel: {character} realizing they pressed REPLY ALL to entire company 500 people, face turning to skeleton, soul leaving body upward',
  },

  // ── DAILY LIFE ────────────────────────────
  {
    id: 'monday-friday', nameKey: 'meme.mondayfriday.name', descKey: 'meme.mondayfriday.desc',
    category: 'daily', preview: prevMondayFriday,
    promptTemplate: STYLE +
      'left panel labeled MONDAY: {character} as zombie, dark eye bags to the floor, dragging body through office door, grey depressing, coffee IV drip, ' +
      'right panel labeled FRIDAY: same {character} in party mode, sunglasses, dancing on desk, confetti cannon, disco ball, maximum energy',
  },
  {
    id: 'wifi-down', nameKey: 'meme.wifidown.name', descKey: 'meme.wifidown.desc',
    category: 'daily', preview: prevWifiDown,
    promptTemplate: STYLE +
      'left panel: {character} peacefully scrolling phone on couch, wifi bars full, serene paradise, birds singing, ' +
      'right panel: wifi icon shows X, {character} screaming like world is ending, dramatic, flipping furniture, apocalyptic chaos',
  },
  {
    id: 'alarm-snooze', nameKey: 'meme.alarmsnooze.name', descKey: 'meme.alarmsnooze.desc',
    category: 'daily', preview: prevAlarmSnooze,
    promptTemplate: STYLE +
      'left panel: {character} in bed at night, fist raised with determination, speech bubble "WAKING UP AT 6AM TOMORROW!", heroic aura, ' +
      'right panel: same {character} at 6AM violently smashing alarm clock to pieces with sledgehammer, "5 MORE MINUTES" speech bubble, rage face',
  },
  {
    id: 'diet', nameKey: 'meme.diet.name', descKey: 'meme.diet.desc',
    category: 'daily', preview: prevDiet,
    promptTemplate: STYLE +
      'left panel: {character} in workout gear holding sad tiny salad, halo above head, text "DIET DAY 1", virtuous glow, ' +
      'right panel: same night, {character} surrounded by pizza boxes, ice cream, chips, chocolate, guilty face smeared with sauce, text "DIET DAY 1 NIGHT"',
  },
  {
    id: 'bed-phone', nameKey: 'meme.bedphone.name', descKey: 'meme.bedphone.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel: {character} tucked in bed, yawning, clock shows 11 PM, speech bubble "goodnight!", lights dimming, cozy, ' +
      'right panel: same {character} wide awake, phone glow illuminating face in pitch dark room, clock shows 3:47 AM, zombie eyes, scroll scroll scroll',
  },
  {
    id: 'cooking-fail', nameKey: 'meme.cookingfail.name', descKey: 'meme.cookingfail.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel: {character} in chef hat watching cooking tutorial on phone, ingredients neatly prepared, confident thumbs up, "easy!", ' +
      'right panel: kitchen completely destroyed, smoke alarm going off, {character} covered in flour, pan on fire, burnt black mess, 911 dialing',
  },
  {
    id: 'online-vs-reality', nameKey: 'meme.onlinevsreal.name', descKey: 'meme.onlinevsreal.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel labeled ONLINE ORDER: beautiful perfect gourmet burger, studio lighting, magazine worthy, dripping with goodness, ' +
      'right panel labeled WHAT ARRIVED: {character} holding sad flat squished pathetic burger, completely different, disappointed face, side-by-side comparison',
  },
  {
    id: 'fridge-stare', nameKey: 'meme.fridgestare.name', descKey: 'meme.fridgestare.desc', category: 'daily',
    promptTemplate: STYLE +
      'left panel: {character} opening fridge door with hope and excitement, stomach growling, speech bubble "what do we have!", ' +
      'right panel: inside fridge is completely empty except one old condiment bottle, tumbleweed rolls past, {character} existential void stare',
  },

  // ── SOCIAL ────────────────────────────────
  {
    id: 'read-no-reply', nameKey: 'meme.readnoreply.name', descKey: 'meme.readnoreply.desc',
    category: 'social', preview: prevReadNoReply,
    promptTemplate: STYLE +
      'left panel: {character} staring at phone anxiously, refreshing conversation, biting nails, speech bubble "please reply please reply", ' +
      'right panel: message shows "Read 3:42 PM" with no reply, {character} soul literally floating out of body upward, devastation, betrayal',
  },
  {
    id: 'introvert-party', nameKey: 'meme.introvertparty.name', descKey: 'meme.introvertparty.desc',
    category: 'social', preview: prevIntrovertParty,
    promptTemplate: STYLE +
      'left panel: {character} at crowded loud party, forced awkward smile, surrounded by strangers, thought bubble "help me", sweating, ' +
      'right panel: {character} at home in blanket burrito with snacks and phone, pure euphoria face, heavenly light, text "HOME SWEET HOME"',
  },
  {
    id: 'group-photo', nameKey: 'meme.groupphoto.name', descKey: 'meme.groupphoto.desc',
    category: 'social', preview: prevGroupPhoto,
    promptTemplate: STYLE +
      'left panel: {character} striking confident cool pose for group photo, thought bubble "I look amazing", duck face, peace sign, ' +
      'right panel: the actual photo result, {character} looking absolutely terrible, eyes half closed, mouth weird, everyone else looks great',
  },
  {
    id: 'typing-delete', nameKey: 'meme.typingdelete.name', descKey: 'meme.typingdelete.desc', category: 'social',
    promptTemplate: STYLE +
      'left panel: {character} typing passionate 500-word love confession message, intense focused face, phone screen full of text, heart pounding, ' +
      'right panel: {character} deleting everything and just sending "ok", coward face, trash can overflowing with drafted messages, sigh',
  },
  {
    id: 'plans-cancelled', nameKey: 'meme.planscancelled.name', descKey: 'meme.planscancelled.desc', category: 'social',
    promptTemplate: STYLE +
      'left panel: {character} receiving "sorry can\'t make it" text, fake sad face, hand on heart, speech bubble "oh noooo what a shame", acting, ' +
      'right panel: {character} instantly in pajamas doing victory dance, pizza ordered, Netflix on, pure evil joy, text "FREEDOM"',
  },

  // ── TECH ──────────────────────────────────
  {
    id: 'one-more-bug', nameKey: 'meme.onemorebug.name', descKey: 'meme.onemorebug.desc',
    category: 'tech', preview: prevOneMoreBug,
    promptTemplate: STYLE +
      'left panel: {character} victory pose at computer, confetti, text "BUG FIXED!", champagne, celebration, fist pump, one bug crossed out, ' +
      'right panel: computer screen showing 99 NEW BUGS in red, {character} face melting in horror, code on fire, everything is on fire',
  },
  {
    id: 'stackoverflow', nameKey: 'meme.stackoverflow.name', descKey: 'meme.stackoverflow.desc',
    category: 'tech', preview: prevStackoverflow,
    promptTemplate: STYLE +
      'left panel: {character} typing with blazing speed, cool hacker sunglasses, green code reflected in glasses, speech bubble "10x developer", elite aura, ' +
      'right panel: {character} nervously copy-pasting from StackOverflow with CTRL+C, looking over shoulder, guilty sweating, tab shows stackoverflow.com',
  },
  {
    id: 'git-force-push', nameKey: 'meme.gitforcepush.name', descKey: 'meme.gitforcepush.desc', category: 'tech',
    promptTemplate: STYLE +
      'left panel: {character} casually pressing enter on "git push --force", relaxed, no big deal, coffee in hand, speech bubble "it\'s fine", ' +
      'right panel: entire team running around office in panic, servers exploding, code on fire, {character} slowly backing toward exit door',
  },
  {
    id: 'works-on-my-machine', nameKey: 'meme.worksonmymachine.name', descKey: 'meme.worksonmymachine.desc', category: 'tech',
    promptTemplate: STYLE +
      'left panel: {character} shrugging at laptop showing green checkmarks, smug face, speech bubble "WORKS ON MY MACHINE", confident, ' +
      'right panel: production server room literally on fire, explosions, ERROR 500 everywhere, {character} in background tiptoeing away whistling',
  },
  {
    id: 'dark-mode', nameKey: 'meme.darkmode.name', descKey: 'meme.darkmode.desc', category: 'tech',
    promptTemplate: STYLE +
      'left panel: {character} coding in dark room, dark mode terminal, green text, cool hacker aesthetic, comfortable, night owl vibes, ' +
      'right panel: accidentally opening white background website, blinding white nuclear explosion of light from screen, {character} eyes burning melting, dramatic',
  },
  {
    id: 'no-comments', nameKey: 'meme.nocomments.name', descKey: 'meme.nocomments.desc', category: 'tech',
    promptTemplate: STYLE +
      'left panel: {character} proudly refusing to write code comments, speech bubble "my code is self-documenting", nose in air, superior, ' +
      'right panel: 3 MONTHS LATER same {character} staring at own code with zero comprehension, confused, head scratching, speech bubble "who wrote this garbage"',
  },
];
