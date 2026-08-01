# MONO Architekten

> Konzeptprojekt — Berliner Architekturstudio, editorial-minimalistisch.
> **Concept project** — the studio and all buildings are fictional.

Live (dev): `http://localhost:5612/de` · Port **5612**

## Case Study

**Vấn đề.** Một studio kiến trúc cần website thể hiện đẳng cấp qua sự tối giản —
không hiệu ứng phô diễn, không màu mè. Web phải giống chính kiến trúc của họ:
kỷ luật, vật liệu thật, ánh sáng đúng chỗ.

**Giải pháp.** Trang "typography-first" trên lưới 12 cột lộ rõ, song ngữ Đức–Anh,
animation chỉ xuất hiện nơi nó phục vụ nội dung.

**Quyết định thiết kế.**
- **Chỉ 2 màu + 1 xám ấm** (`#FAFAF7` / `#111` / `#8A8A83`): tác phẩm kiến trúc
  là nhân vật chính; UI là khung kính phòng trưng bày. Đây là "Lab Noir đảo cực" —
  cùng DNA với các dự án khác (corner ticks, telemetry, mono metadata, progress
  line) nhưng trên nền gallery ban ngày.
- **Typography lớn** (Instrument Serif 8–17vw): tên studio và tên dự án là
  "mặt tiền" của trang, như chữ khắc trên đá.
- **Animation tiết chế**: mỗi kỹ thuật đúng một chỗ — clip-path reveal cho ảnh,
  parallax ≤6%, page transition overlay mực, text reveal chỉ ở hero.
  Ease thống nhất `power2`. `prefers-reduced-motion` tắt toàn bộ.

## Stack

- **Next.js 16** (App Router, SSG 26 trang) + TypeScript
- **Tailwind CSS v4** (design tokens qua `@theme`)
- **GSAP + ScrollTrigger** (`useGSAP` hook) — reveal, parallax, transitions
- **Lenis** smooth scroll (đồng bộ ScrollTrigger qua `gsap.ticker`)
- **i18n tự viết**: route segment `/de` `/en`, dictionary typed toàn phần

## Signature (Lab Noir)

- Corner ticks 4 góc viewport
- Telemetry thật: giờ Berlin, scroll Y, viewport size
- Progress line 2px (scroll)
- **Signature riêng của MONO: bấm phím `G` để lộ lưới 12 cột** — layer bản vẽ
  của kiến trúc sư

## Struktur

```
app/[locale]/            # de | en — root layout, SSG
  page.tsx               # Home: hero typographic + 3 featured
  projects/              # Index + filter (Wohnen/Kultur/Gewerbe)
  projects/[slug]/       # 7 Projektseiten
  studio/  contact/
components/
  chrome/                # CornerTicks, Telemetry, ProgressLine, GridOverlay
  reveal/                # Reveal (clip-path), Parallax, RevealText
  TransitionProvider     # ink overlay page transitions
lib/
  i18n.ts  projects.ts  gsap.ts
```

## Commands

```bash
npm run dev     # http://localhost:5612
npm run build   # SSG production build
```
