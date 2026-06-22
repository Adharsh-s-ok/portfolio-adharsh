uniform float uTime;
uniform float uSize;
uniform vec2 uMouse;

attribute float aScale;
attribute vec3 aRandomness;
attribute float aPhase;

varying vec3 vColor;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Spiral galaxy rotation
  float angle           = atan(modelPosition.x, modelPosition.z);
  float distToCenter    = length(modelPosition.xz);
  float angleOffset     = (1.0 / max(distToCenter, 0.001)) * uTime * 0.15;
  angle                += angleOffset;

  modelPosition.x = cos(angle) * distToCenter;
  modelPosition.z = sin(angle) * distToCenter;

  // Vertical wave
  modelPosition.y += sin(uTime * 0.5 + aPhase) * 0.08;

  // Random scatter
  modelPosition.xyz += aRandomness;

  // Mouse parallax (subtle)
  modelPosition.x += uMouse.x * (1.0 - distToCenter * 0.08) * 0.4;
  modelPosition.y -= uMouse.y * (1.0 - distToCenter * 0.08) * 0.4;

  vec4 viewPosition      = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // Size attenuation
  gl_PointSize  = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);

  vColor = color;
}
