varying vec3 vColor;

void main() {
  float d        = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / d - 0.1;

  if (strength < 0.0) discard;

  gl_FragColor = vec4(vColor * strength, strength);
}
