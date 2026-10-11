#!/usr/bin/env python3
"""Build seamless looping hero clip + portrait + OG image from the intro video.

usage: python3 scripts/build-hero-assets.py INPUT.mp4 [--crop W:H:X:Y] [--portrait-frame 5] [--photo photo.jpg]
Requires ffmpeg, numpy, Pillow. Source ideal: 16:9, person centred, ~10 s.
Default crop is for a 1280x720 source (person centred at x~627). For 1920x1080 try 800:1000:<x>:80.
"""
import argparse, subprocess, tempfile, os, wave
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("--crop", default="560:700:347:10")   # w:h:x:y, aspect must be 4:5
ap.add_argument("--portrait-frame", type=float, default=5.0)
ap.add_argument("--portrait-box", default="220:275:517:22")  # head-to-shirt, in source px (w:h:x:y)
ap.add_argument("--photo", default=None)
ap.add_argument("--dur", type=float, default=10.0)
ap.add_argument("--xf", type=float, default=0.5)
a = ap.parse_args()
OUT = os.path.join(os.path.dirname(__file__), "..", "public")
HERO = os.path.join(OUT, "hero"); os.makedirs(HERO, exist_ok=True)
SR, XF, D = 48000, a.xf, a.dur
run = lambda *c: subprocess.run(c, check=True)
tmp = tempfile.mkdtemp()

# 1+2. crop, scale, whiten backdrop
prep = f"crop={a.crop},scale=768:960:flags=lanczos,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,format=yuv420p,fps=24"

# 3a. seamless video: first = X[xf..D], second = X[0..xf]; blend X[D-xf..D] -> X[0..xf]
vid = os.path.join(tmp, "v.mp4")
fc = (f"[0:v]{prep},split[a][b];"
      f"[a]trim=start={XF}:end={D},setpts=PTS-STARTPTS[f];"
      f"[b]trim=start=0:end={XF},setpts=PTS-STARTPTS[s];"
      f"[f][s]xfade=transition=fade:duration={XF}:offset={D-2*XF},format=yuv420p[v]")
run("ffmpeg","-v","error","-y","-i",a.src,"-filter_complex",fc,"-map","[v]","-an","-c:v","libx264","-crf","12",vid)

# 3b. seamless audio in numpy (equal-power crossfade, sample accurate)
wav = os.path.join(tmp, "a.wav")
run("ffmpeg","-v","error","-y","-i",a.src,"-t",str(D),"-ac","1","-ar",str(SR),"-c:a","pcm_s16le",wav)
with wave.open(wav) as w:
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64)/32768
x = np.pad(x, (0, max(0, int(D*SR)-len(x))))[:int(D*SR)]
n, xf = len(x), int(XF*SR)
A, B = x[xf:], x[:xf]                      # A = X[xf..D], B = X[0..xf]
t = np.linspace(0, np.pi/2, xf, endpoint=False)
tail = A[-xf:]*np.cos(t) + B*np.sin(t)
y = np.concatenate([A[:-xf], tail])
wav2 = os.path.join(tmp, "a2.wav")
with wave.open(wav2, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(y,-1,1)*32767).astype(np.int16).tobytes())
dur = len(y)/SR

# 4. export
common = ["-i",vid,"-i",wav2,"-map","0:v","-map","1:a","-t",f"{dur:.3f}"]
run("ffmpeg","-v","error","-y",*common,"-c:v","libx264","-pix_fmt","yuv420p","-crf","24","-preset","slow",
    "-c:a","aac","-b:a","96k","-movflags","+faststart",os.path.join(HERO,"hero.mp4"))
run("ffmpeg","-v","error","-y",*common,"-c:v","libvpx-vp9","-crf","36","-b:v","0","-row-mt","1",
    "-c:a","libopus","-b:a","80k",os.path.join(HERO,"hero.webm"))

# 5. portrait + og
if a.photo: img = Image.open(a.photo).convert("RGB"); img = img.resize((480,600), Image.LANCZOS)
else:
    fr = os.path.join(tmp,"f.png")
    run("ffmpeg","-v","error","-y","-ss",str(a.portrait_frame),"-i",a.src,"-frames:v","1",fr)
    w_,h_,x_,y_ = map(int,a.portrait_box.split(":"))
    img = Image.open(fr).convert("RGB").crop((x_,y_,x_+w_,y_+h_)).resize((480,600), Image.LANCZOS)
arr = np.asarray(img).astype(np.float32)
arr = np.minimum(255, arr/0.98) # whiten backdrop like the video
img = Image.fromarray(arr.astype("uint8"))
img.save(os.path.join(OUT,"portrait-bust.webp"), quality=88)
og = Image.new("RGB",(1200,630),(244,242,238))
p = img.resize((504,630), Image.LANCZOS)
og.paste(p,(348,0)); og.save(os.path.join(OUT,"og.jpg"), quality=90)
img.resize((64,80)).save(os.path.join(OUT,"favicon.png"))
print("done, loop length %.3fs" % dur)
