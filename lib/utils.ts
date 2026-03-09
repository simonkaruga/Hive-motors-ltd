export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`;
}

export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString()} km`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
