export default class ParticleEngine {
  constructor() {
    this.particles = [];
  }
  emit() {}
  update(input) {
    super.update(input);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      if (particle.life >= particle.lifespan) {
        this.particles.splice(i, 1);
      } else {
        particle.update(input);
      }
    }
  }
  draw(context) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(context);
    }
  }
}
