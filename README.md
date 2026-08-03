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
- **Typography lớn** (Marcellus 8–17vw): tên studio và tên dự án là "mặt tiền" của
  trang, như chữ khắc trên đá — và từ 03.08.2026 thì đúng nghĩa đen: Marcellus là mặt
  chữ glyphic dựng theo chữ khắc La Mã, chân vát hình nêm như vết đục.
  Body **Schibsted Grotesk** (grotesque biên tập, variable 400–900, đủ thứ bậc cho
  trang song ngữ). Số đo **DM Mono** — chữ số đều nét để telemetry không nhảy.

  **Marcellus không có italic, và đó là chủ ý.** Truyền thống chữ khắc phân biệt bằng
  small caps chứ không phải nghiêng, nên nhấn mạnh ở display dùng `.display-emph`
  (Marcellus SC). `font-synthesis-style: none` chặn trình duyệt tự bịa ra bản nghiêng.

  **Tracking dương, không âm.** Chữ khắc cần khoảng thở giữa các con chữ; `tracking-tight`
  đã bị gỡ khỏi mọi phần tử display. Lưu ý kỹ thuật: `letter-spacing` theo `em` được tính
  tại phần tử khai nó rồi **thừa kế xuống dưới dạng độ dài tuyệt đối** — nên chỗ nào đặt
  cỡ chữ ở phần tử con (`RevealText` đặt ở `[data-line]`) thì phải lặp lại
  `tracking-[0.012em]` ngay tại đó, nếu không con chữ 217px sẽ nhận tracking tính theo 16px
  và coi như không giãn.
- **Animation tiết chế**: mỗi kỹ thuật đúng một chỗ — clip-path reveal cho ảnh,
  parallax ≤6%, page transition overlay mực, text reveal chỉ ở hero.
  Ease thống nhất `power2`. `prefers-reduced-motion` tắt toàn bộ.

## Biến điều khiển: ánh sáng ban ngày Berlin

Tiêu chí ban đầu của dự án là *"ánh sáng đúng chỗ"* — nhưng suốt bản đầu, ánh sáng
không có mặt trong bản dựng. Từ 03.08.2026 nó là **biến điều khiển duy nhất**, và
hero, chrome, telemetry đều đọc từ đó thay vì mỗi chỗ tự quyết.

`lib/sun.ts` tính vị trí mặt trời (NOAA rút gọn, sai số < 0,5°) từ đúng hai dữ liệu
đã hiển thị sẵn trên màn hình: **đồng hồ Berlin** và **toạ độ `52.529°N 13.401°E`**.
Không API, không mạng, không tốn ngân sách tải — và vẫn là số đo thật theo DNA #2.

`components/chrome/Daylight.tsx` không render gì; nó ghi kết quả thành CSS custom
property ở thẻ gốc (`--sun-el`, `--sun-az`, `--facade-shadow-*`, `--rake-deg`).

**Hero là một mặt tiền dưới ánh sáng của khoảnh khắc này.** Streiflicht và bóng đổ
của chữ đến từ vị trí mặt trời thật: 9 giờ sáng ánh sáng rọi xiên từ đông, 19 giờ từ
tây, ban đêm mặt tiền không được chiếu sáng — thà vậy còn hơn bịa ra một cái bóng.

Ba điều học được khi dựng, ghi lại vì sẽ gặp lại:

1. **Trang là SSG, nên phải có giá trị mặc định *được thiết kế*.** `globals.css` đặt
   sẵn ánh sáng ban mai từ đông nam. Không có JavaScript thì mặt tiền vẫn sáng, chỉ là
   không đúng giờ. Đó là "khung tĩnh được dàn dựng" theo luật M1, không phải ô trống.
2. **Transition dài phải bật *sau* lần chỉnh đầu tiên.** Ban đầu tôi để
   `transition: text-shadow 90s` ngay từ đầu — kết quả là bóng đổ bò từ giá trị mặc
   định sang giá trị thật suốt 90 giây, tức sai đúng lúc người ta nhìn trang lần đầu.
   Giờ transition mặc định `0s`, `Daylight` nâng lên `90s` sau khi đã chỉnh xong.
3. **Không dùng `requestAnimationFrame` cho việc đó.** rAF đứng im khi tab ở nền, nên
   transition sẽ vĩnh viễn không được bật cho ai mở trang trong tab nền. Dùng
   `setTimeout` — timer vẫn chạy. (Cùng lý do khiến không đo được animation trong
   Browser pane: pane báo `document.hidden`.)

## Chrome: Schattenfuge thay vì Sucherwinkel

Corner ticks cũ là mô-típ **máy ảnh** — chúng thuộc LAB NOIR, không thuộc một phòng
trưng bày. `components/chrome/Schattenfuge.tsx` thay bằng ngôn ngữ của vitrine:
**ray treo** phía trên, **hai cạnh bên chỉ gợi** (tủ mở về phía trước), và dưới cùng
là **Schattenfuge** — khe hở lùi vào nơi tường không chạm sàn — rồi tới **bệ**. Vật
trong tủ kính đứng trên bệ và hở khỏi mặt đất đúng một milimét.

Telemetry cũng đổi nội dung: `Y 00000` (scroll px) và `VP` là sự thật của *trình
duyệt*. Thay bằng `SONNE 10.5° W` — sự thật của *kiến trúc*, đặt ngay cạnh hai dữ
liệu sinh ra nó.

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
