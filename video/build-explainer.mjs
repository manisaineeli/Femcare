import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const renderDir = join(here, '.render');
const output = join(here, 'femcare-ai-project-explainer.mp4');
const ffmpeg = process.env.FFMPEG_PATH || join(root, 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const font = 'C\\:/Windows/Fonts/segoeuib.ttf';
const selectedScene = Number(process.argv[2]) || null;

const scenes = [
  {
    kicker: 'FEMCARE AI  •  PROJECT EXPLAINER',
    title: 'Care that stays private.',
    lines: ['A menstrual-health companion designed for', 'everyday support, safety, and dignity.'],
    narration: 'Welcome to FemCare AI, a private menstrual health companion. It brings cycle care, supportive guidance, and safety tools together in one calm, easy-to-use space.',
    image: 'cover-flowers.jpg', duration: 10, color: '24182e'
  },
  {
    kicker: 'WHAT IS FEMCARE AI?',
    title: 'One app for cycle care.',
    lines: ['Track cycles and symptoms', 'Get phase-aware food and fitness guidance', 'Reflect in a private journal — on your device'],
    narration: 'What is FemCare AI? It is an offline-first web app that helps people track cycles and symptoms, explore phase-aware nutrition and fitness, and build a private wellness journal.',
    image: 'woman-smile.jpg', duration: 13, color: '5a2949'
  },
  {
    kicker: 'WHY DOES IT MATTER?',
    title: 'Because personal health data deserves respect.',
    lines: ['No cloud account required', 'Sensitive data stays in local browser storage', 'Warm guidance for real everyday questions'],
    narration: 'Why FemCare AI? Menstrual health can be personal, confusing, and sometimes urgent. The project puts privacy first: information stays in local browser storage, without a cloud account or a server sending it away.',
    image: 'privacy-sec.jpg', duration: 15, color: '3c274d'
  },
  {
    kicker: 'HOW IT WORKS',
    title: 'A simple care workflow.',
    lines: ['1  Set up your profile and cycle details', '2  Log flow, pain, mood, or symptoms', '3  See cycle insights, meals, and movement ideas', '4  Use Femi AI triage or SOS when extra support is needed'],
    narration: 'How does it work? First, the user completes a simple setup. Next, they log their flow, pain, mood, or symptoms. FemCare then shows cycle insights and tailored wellness ideas. If something feels concerning, Femi AI offers triage guidance, and the safety tools can help reach a trusted circle.',
    image: 'fitness-yoga.jpg', duration: 22, color: '512651'
  },
  {
    kicker: 'WHEN SHOULD I USE IT?',
    title: 'Whenever care would help.',
    lines: ['Daily: understand the current cycle phase', 'During periods: log symptoms and find comfort tips', 'Before a concern grows: check triage and safety options'],
    narration: 'When should FemCare AI be used? Daily, to understand the current cycle phase. During a period, to log symptoms and find comfort ideas. And before a concern grows, to check the triage and safety options. It supports informed next steps, but it never replaces a clinician.',
    image: 'nutrition-bowl.jpg', duration: 17, color: '743a58'
  },
  {
    kicker: 'THE FEMCARE PROMISE',
    title: 'Private. Supportive. Ready when needed.',
    lines: ['English, Hindi, Tamil, and Telugu', 'Cycle tracking • wellness • safety', 'For urgent symptoms, seek professional medical care'],
    narration: 'FemCare AI makes menstrual health support feel more private, more approachable, and more available. For urgent symptoms or an emergency, users should always contact a qualified medical professional or local emergency service.',
    image: 'community-women.jpg', duration: 15, color: '3b2547'
  }
];

function run(command, args) {
  console.log(`> ${command} ${args.map(String).join(' ')}`);
  execFileSync(command, args, { stdio: 'inherit' });
}

function ffPath(value) {
  return resolve(value).replaceAll('\\', '/').replace(':', '\\:').replaceAll(' ', '\\ ');
}

if (!existsSync(ffmpeg)) throw new Error('FFmpeg is not installed. Run: npm install --no-save ffmpeg-static');
if (!selectedScene) rmSync(renderDir, { recursive: true, force: true });
mkdirSync(renderDir, { recursive: true });

scenes.forEach((scene, index) => {
  const n = index + 1;
  if (selectedScene && selectedScene !== n) return;
  const titleFile = join(renderDir, `title-${n}.txt`);
  const bodyFile = join(renderDir, `body-${n}.txt`);
  const videoFile = join(renderDir, `scene-${n}.mp4`);
  writeFileSync(titleFile, scene.title, 'utf8');
  writeFileSync(bodyFile, scene.lines.join('\n'), 'utf8');
  const image = join(here, '..', 'ppt', 'assets', scene.image);
  const filter = [
    `[0:v]drawbox=x=0:y=0:w=1280:h=720:color=0x${scene.color}:t=fill,drawbox=x=0:y=0:w=17:h=720:color=0xf4a6b9:t=fill[base]`,
    `[1:v]scale=470:620:force_original_aspect_ratio=decrease,format=rgba,colorchannelmixer=aa=0.88[photo]`,
    `[base][photo]overlay=x=745:y=(H-h)/2,drawbox=x=715:y=50:w=510:h=620:color=0xffffff@0.13:t=2,drawbox=x=74:y=83:w=98:h=5:color=0xf4a6b9:t=fill,drawtext=fontfile='${font}':text='${scene.kicker}':x=74:y=110:fontsize=18:fontcolor=0xf4a6b9,drawtext=fontfile='${font}':textfile='${ffPath(titleFile)}':x=74:y=160:fontsize=52:fontcolor=white:line_spacing=8,drawtext=fontfile='${font}':textfile='${ffPath(bodyFile)}':x=78:y=320:fontsize=25:fontcolor=0xfdf5fa:line_spacing=22,drawtext=fontfile='${font}':text='FEMCARE AI  |  PRIVACY-FIRST MENSTRUAL HEALTH':x=74:y=670:fontsize=15:fontcolor=0xffffff@0.72,fade=t=in:st=0:d=0.7,fade=t=out:st=${scene.duration - 0.7}:d=0.7[outv]`
  ].join(';');
  run(ffmpeg, ['-y', '-loglevel', 'error', '-f', 'lavfi', '-i', `color=c=#${scene.color}:s=1280x720:d=${scene.duration}`, '-loop', '1', '-i', image, '-f', 'lavfi', '-i', `anullsrc=channel_layout=stereo:sample_rate=48000`, '-filter_complex', filter, '-map', '[outv]', '-map', '2:a', '-t', String(scene.duration), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '128k', '-shortest', videoFile]);
});

if (!selectedScene) {
  const concatFile = join(renderDir, 'concat.txt');
  writeFileSync(concatFile, scenes.map((_, i) => `file '${ffPath(join(renderDir, `scene-${i + 1}.mp4`))}'`).join('\n'), 'utf8');
  run(ffmpeg, ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', concatFile, '-c', 'copy', output]);
  console.log(`Created ${output}`);
}
