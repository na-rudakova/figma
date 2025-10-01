import './timeline.scss';
import Swiper from 'swiper';
import 'swiper/css';
import gsap from 'gsap';
import { Navigation } from 'swiper/modules';

export function initTimeline(): void {
  const container = document.createElement('div');
  container.className = 'timeline';
  container.innerHTML = `
    <div class="timeline__grid">
      <div class="timeline__header">
        <span class="timeline__line"></span>
        <h2>Исторические даты</h2>
      </div>
      <div class="timeline__circle">
        <div class="timeline__years">
          <span class="year year--left">2015</span>
          <span class="year year--right">2022</span>
        </div>
        <div class="circle__points">
          ${Array.from({ length: 6 }).map((_, i) => `
            <div class="circle__point" data-index="${i+1}">
              <span>${i+1}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="timeline__bottom">
        <div class="timeline__pagination">
          <span class="counter">06/06</span>
          <div class="timeline__dots"></div>
          <div class="pagination_button">
            <button class="prev">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" stroke-width="2"/>
              </svg>
            </button>
            <button class="next">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="#42567A" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="timeline__slider swiper">
          <div class="swiper-wrapper">
            ${Array.from({ length: 6 }).map((_, i) => `
            <div class="swiper-slide">
              <div class="date">${2015 + i}</div>
              <p></p>
            </div>`).join('')}
          </div>
          <div class="timeline-slider-prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M7 1 L2 6 L7 11" stroke="#3877EE" stroke-width="2"/>
            </svg>
          </div>
          <div class="timeline-slider-next">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;

  const mount = document.getElementById('app');
  if (!mount) return;
  mount.appendChild(container);

  const swiper = new Swiper(container.querySelector('.timeline__slider') as HTMLElement, {
    slidesPerView: 3,
    spaceBetween: 40,
    watchOverflow: true,
    modules: [Navigation],
    navigation: {
      nextEl: container.querySelector('.timeline-slider-next') as HTMLElement,
      prevEl: container.querySelector('.timeline-slider-prev') as HTMLElement
    }
  });

  const points = Array.from(container.querySelectorAll<HTMLElement>('.circle__point'));
  const counterEl = container.querySelector<HTMLElement>('.timeline__pagination .counter');
  const prevBtn = container.querySelector<HTMLButtonElement>('.pagination_button .prev');
  const nextBtn = container.querySelector<HTMLButtonElement>('.pagination_button .next');
  const totalPoints = points.length;

  const yearPairs: [string, string][] = [
    ['2015', '2022'],
    ['1987', '1991'],
    ['1992', '1997'],
    ['1999', '2004'],
    ['2005', '2010'],
    ['2011', '2015'],
  ];

  const slidesContent: { date: string; text: string }[][] = [
    [ {date:'2015', text:'13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'},
      {date:'2016', text:'Телескоп «Хаббл» обнаружил самую удалённую галактику GN-z11'},
      {date:'2017', text:'Компания Tesla представила первый электрический грузовик Tesla Semi'},
      {date:'2018', text:'Старт космического аппарата Solar Prebe Plus, предназначенного для изучения Солнца'},
      {date:'2019', text:'Google объявил о создании 53-кубитного компьютера.'},
      {date:'2020', text:'Корабль Crew Dragon вернулся на Землю из первого пилотируемого полета'}
    ],

    [ {date:'1987', text:'13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'},
      {date:'1988', text:'Телескоп «Хаббл» обнаружил самую удалённую галактику GN-z11'},
      {date:'1989', text:'Компания Tesla представила первый электрический грузовик Tesla Semi'},
      {date:'1990', text:'Старт космического аппарата Solar Prebe Plus, предназначенного для изучения Солнца'},
      {date:'1991', text:'Google объявил о создании 53-кубитного компьютера.'}
    ],

    [ {date:'1992', text:'13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'},
      {date:'1993', text:'Телескоп «Хаббл» обнаружил самую удалённую галактику GN-z11'},
      {date:'1994', text:'Компания Tesla представила первый электрический грузовик Tesla Semi'},
      {date:'1995', text:'Старт космического аппарата Solar Prebe Plus, предназначенного для изучения Солнца'},
      {date:'1996', text:'Google объявил о создании 53-кубитного компьютера.'},
      {date:'1997', text:'Корабль Crew Dragon вернулся на Землю из первого пилотируемого полета'}
    ],

    [ {date:'1999', text:'13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'},
      {date:'2000', text:'Телескоп «Хаббл» обнаружил самую удалённую галактику GN-z11'},
      {date:'2001', text:'Компания Tesla представила первый электрический грузовик Tesla Semi'},
      {date:'2002', text:'Старт космического аппарата Solar Prebe Plus, предназначенного для изучения Солнца'},
      {date:'2003', text:'Google объявил о создании 53-кубитного компьютера.'},
      {date:'2004', text:'Корабль Crew Dragon вернулся на Землю из первого пилотируемого полета'}
    ],

    [ {date:'2005', text:'13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'},
      {date:'2006', text:'Телескоп «Хаббл» обнаружил самую удалённую галактику GN-z11'},
      {date:'2007', text:'Компания Tesla представила первый электрический грузовик Tesla Semi'},
      {date:'2008', text:'Старт космического аппарата Solar Prebe Plus, предназначенного для изучения Солнца'},
      {date:'2009', text:'Google объявил о создании 53-кубитного компьютера.'},
      {date:'2010', text:'Корабль Crew Dragon вернулся на Землю из первого пилотируемого полета'}
    ],

    [ {date:'2015', text:'13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды'},
      {date:'2016', text:'Телескоп «Хаббл» обнаружил самую удалённую галактику GN-z11'},
      {date:'2017', text:'Компания Tesla представила первый электрический грузовик Tesla Semi'},
      {date:'2018', text:'Старт космического аппарата Solar Prebe Plus, предназначенного для изучения Солнца'},
      {date:'2019', text:'Google объявил о создании 53-кубитного компьютера.'},
      {date:'2020', text:'Корабль Crew Dragon вернулся на Землю из первого пилотируемого полета'}
    ]
  ];

  const yearLeftEl = container.querySelector<HTMLElement>('.timeline__years .year--left');
  const yearRightEl = container.querySelector<HTMLElement>('.timeline__years .year--right');
  const dotsContainer = container.querySelector('.timeline__dots') as HTMLElement;

  let activeIndex = 6;
  let currentIndex = 6;
  let rotationOffset = 0;

  if (dotsContainer) {
    for (let i = 1; i <= totalPoints; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(index: number) {
    const dots = dotsContainer?.querySelectorAll('.dot');
    if (!dots) return;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i + 1 === index);
    });
  }

  function updateNavButtons() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = currentIndex === 1;
    nextBtn.disabled = currentIndex === totalPoints;
    prevBtn.classList.toggle('disabled', prevBtn.disabled);
    nextBtn.classList.toggle('disabled', nextBtn.disabled);
  }

  function updateActivePoint(index: number) {
    points.forEach(p => {
      const span = p.querySelector<HTMLElement>('span');
      p.classList.remove('active');
      if (span) gsap.to(span, { scale: 0, opacity: 0, duration: 0.15 });
    });
    const active = container.querySelector<HTMLElement>(`.circle__point[data-index="${index}"]`);
    if (active) {
      active.classList.add('active');
      const span = active.querySelector<HTMLElement>('span');
      if (span) gsap.to(span, { scale: 1, opacity: 1, duration: 0.15 });
    }
    currentIndex = index;
    if (counterEl) counterEl.textContent = `${String(index).padStart(2,'0')}/${String(points.length).padStart(2,'0')}`;
    updateNavButtons();
    updateDots(index);
    updateSlidesForActivePoint(index); 
  }

  function updateSlidesForActivePoint(index: number) {
    const slides = container.querySelectorAll<HTMLDivElement>('.swiper-slide');
    slides.forEach((slide, i) => {
      const content = slidesContent[index - 1]?.[i];
      if (content) {
        slide.querySelector<HTMLElement>('.date')!.textContent = content.date;
        slide.querySelector<HTMLElement>('p')!.textContent = content.text;
      } else {
        slide.querySelector<HTMLElement>('.date')!.textContent = '';
        slide.querySelector<HTMLElement>('p')!.textContent = '';
      }
    });
  }

  function rotateToPoint(targetIndex: number) {
    const pair = yearPairs[targetIndex - 1];
    const targetLeft = parseInt(pair[0], 10);
    const targetRight = parseInt(pair[1], 10);
    const currentLeft = parseInt(yearLeftEl?.textContent || '0', 10);
    const currentRight = parseInt(yearRightEl?.textContent || '0', 10);

    gsap.to({ val: currentLeft }, {
      val: targetLeft,
      duration: 0.6,
      roundProps: 'val',
      ease: 'power1.inOut',
      onUpdate: function() { if (yearLeftEl) yearLeftEl.textContent = String(Math.round(this.targets()[0].val)); }
    });

    gsap.to({ val: currentRight }, {
      val: targetRight,
      duration: 0.6,
      roundProps: 'val',
      ease: 'power1.inOut',
      onUpdate: function() { if (yearRightEl) yearRightEl.textContent = String(Math.round(this.targets()[0].val)); },
      onComplete: () => { updateActivePoint(targetIndex); }
    });
  }

  points.forEach(p => {
    const span = p.querySelector<HTMLElement>('span');
    p.addEventListener('mouseenter', () => { if (span) gsap.to(span, { scale: 1, opacity: 1, duration: 0.12 }); });
    p.addEventListener('mouseleave', () => { if (!p.classList.contains('active') && span) gsap.to(span, { scale: 0, opacity: 0, duration: 0.12 }); });
    p.addEventListener('click', () => { const idx = Number(p.dataset.index || '1'); rotateToPoint(idx); });
  });

  prevBtn?.addEventListener('click', () => { if (currentIndex > 1) rotateToPoint(currentIndex - 1); });
  nextBtn?.addEventListener('click', () => { if (currentIndex < totalPoints) rotateToPoint(currentIndex + 1); });

  requestAnimationFrame(() => {
    updateActivePoint(currentIndex);
  });
}
