import { AfterViewInit, Component, DestroyRef, ElementRef, inject } from '@angular/core';

/** One regular (pointy-top) hexagon of the honeycomb. */
interface Cell { cx: number; cy: number; p: string; c: string; }

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements AfterViewInit {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  /** Served from Angular's `public/` folder (Angular 18+). */
  protected readonly imageUrl = '/ice-cubes-sphere-splashing-water.jpg';

  protected heroLeft: Cell[] = [];     // outline cluster, top-left
  protected heroBg: Cell[] = [];       // outline cells, bottom/right
  protected heroCluster: Cell[] = [];  // filled hexagon cluster (photo / navy / orange / white)

  constructor() {
    const S = 100, w = Math.sqrt(3) * S, rh = 1.5 * S;
    const hero = this.grid(1900, 575, S);
    const mid = this.nearest(hero, 1500, 300);
    const ax = (q: number, r: number) =>
      this.nearest(hero, mid.cx + w * (q + r / 2), mid.cy + rh * r);

    const filled: [Cell, string][] = [];

    // 7 photo hexagons (centre + ring of 6)
    for (let q = -1; q <= 1; q++)
      for (let r = -1; r <= 1; r++)
        if (Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r)) <= 1)
          filled.push([ax(q, r), 'hex-photo']);

    // 2 navy hexagons on the left of the cluster
    [[-2, 0], [-2, 1]].forEach(([q, r]) => filled.push([ax(q, r), 'hex-navy']));
    // 2 orange hexagons on the right (cropped by the viewport edge)
    [[2, -1], [2, 0]].forEach(([q, r]) => filled.push([ax(q, r), 'hex-grey']));
    // 1 white hexagon with an orange outline, bottom-right
    filled.push([ax(1, 1), 'hex-pinkfill']);

    this.heroCluster = filled.map(([c, k]) => ({ ...c, c: k }));

    // faint outline cells: top-left cluster (+ one orange accent) and bottom/right
    this.heroLeft = hero.filter(
      (c) => c.cy >= 0 && ((c.cy <= 150 && c.cx <= 450) || (c.cy === 300 && c.cx <= 200)),
    );
    this.nearest(this.heroLeft, 225, 200).c = 'hex-pink';
    this.heroBg = hero.filter((c) => (c.cy >= 420 && c.cx >= 1050) || c.cx >= 1700);
  }

  /** Regular pointy-top hexagons (side s) tiled edge-to-edge. */
  private grid(width: number, height: number, s: number): Cell[] {
    const w = Math.sqrt(3) * s, rh = 1.5 * s;
    const out: Cell[] = [];
    for (let r = -1; r * rh < height + s; r++) {
      for (let c = -1; c * w < width + w; c++) {
        const cx = w * (c + (r & 1 ? 0.5 : 0));
        const cy = rh * r;
        const p = [0, 1, 2, 3, 4, 5]
          .map((i) => {
            const a = (Math.PI / 180) * (60 * i - 30);
            return `${(cx + s * Math.cos(a)).toFixed(2)},${(cy + s * Math.sin(a)).toFixed(2)}`;
          })
          .join(' ');
        out.push({ cx, cy, p, c: 'hex-line' });
      }
    }
    return out;
  }

  private nearest(cells: Cell[], x: number, y: number): Cell {
    let best = cells[0], d = Infinity;
    for (const c of cells) {
      const dd = (c.cx - x) ** 2 + (c.cy - y) ** 2;
      if (dd < d) { d = dd; best = c; }
    }
    return best;
  }

  /** Scroll-reveal: every `.anim` element animates in when it enters the viewport. */
  ngAfterViewInit() {
    const els = this.host.nativeElement.querySelectorAll<HTMLElement>('.anim');
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((e) => e.classList.add('anim-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((e) => io.observe(e));
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}