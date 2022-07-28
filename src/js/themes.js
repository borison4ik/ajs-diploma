export default function themes(level) {
  switch (level) {
    case 2:
      return 'desert';
    case 3:
      return 'arctic';
    case 4:
      return 'mountain';
    default:
      return 'prairie';
  }
}
