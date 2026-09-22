# FemCare AI project explainer video

`femcare-ai-project-explainer.mp4` is a captioned 92-second project overview. It answers:

- What is FemCare AI?
- Why is it privacy-first?
- How does its core workflow operate?
- When should users use its tools?

To regenerate it after changing the visual content:

```powershell
npm install --no-save ffmpeg-static
node video/build-explainer.mjs
```

`narration-script.md` provides a ready-to-record voice-over. The renderer uses the project’s existing presentation assets and writes temporary render files to `video/.render/`, which is safe to delete.
