import { useAnimations } from 'src/composables/useAnimations';

export function exampleAnimation(example: HTMLElement | null): void {
  if (!example) return;

  const { animate } = useAnimations();

  animate(example, null, {
    repeat: -1,
    yoyo: true, 
    steps: [
      {
        duration: 1,
        ease: 'power2.inOut',
        scale: 1.2,
        rotate: 15,
        opacity: 0.8,
        y: -50
      },
      {
        duration: 0.8,
        ease: 'back.out(1.7)',
        scale: 0.8,
        rotate: -15,
        opacity: 1,
        x: 80
      },
      {
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
        scale: 1.5,
        rotate: 360,
        x: 0,
        y: 0,
        backgroundColor: '#00E676', // GSAP consegue animar cores também
        boxShadow: '0px 0px 30px rgba(0, 230, 118, 0.8)'
      },
      {
        duration: 0.6,
        ease: 'bounce.out',
        scale: 1,
        rotate: 0,
        opacity: 1,
        backgroundColor: '#2196F3',
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
      }
    ]
  });
}
